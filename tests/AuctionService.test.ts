import 'reflect-metadata';
import 'module-alias/register';
import mongoose from "mongoose";
import container from '../src/container';
import TYPES from '../src/container/types';
import { IAuctionService } from "../src/services/AuctionService";
import { DBHelper } from "./helpers/DbHelper";
import Factory from 'fake-factory';

require('../src/models/pet/Pet');
require('../src/models/category/Category');
require('../src/models/tag/Tag');


beforeAll(DBHelper.setupDatabase);


test('Only Pet owner can list bids',async () => {

    const auctionService = container.get<IAuctionService>(TYPES.IAuctionService);

    const userFactory = new Factory('User');

    const ownerUser = await userFactory.createInstance();
    const ownerUserId = ownerUser._id.toString();

    const anotherUser = await userFactory.createInstance();
    const anotherUserId = anotherUser._id.toString();

    const auction = await createAuction({
        owner: ownerUser
    })
    const auctionId = auction._id.toString();

    const bidsByOwner = await auctionService.getBidsList(ownerUserId, auctionId);
    const bidsByanother = await auctionService.getBidsList(anotherUserId, auctionId);

    expect(bidsByOwner).toStrictEqual([]);
    expect(bidsByanother).toBeNull();
});


test('Bids can be placed only on current Auction',async () => {

    const auctionService = container.get<IAuctionService>(TYPES.IAuctionService);

    const userFactory = new Factory('User');
    const auctionFactory = new Factory('Auction');

    const user = await userFactory.createInstance();
    const userId = user._id.toString();

    const currentDate = new Date();
    const numberOfDays = 6;

    const nearFutureDate = new Date();
    nearFutureDate.setDate(currentDate.getDate() + numberOfDays);
    const farFutureDate = new Date();
    farFutureDate.setDate(nearFutureDate.getDate() + numberOfDays);

    const nearPastDate = new Date();
    nearPastDate.setDate(currentDate.getDate() - numberOfDays);
    const farPastDate = new Date();
    farPastDate.setDate(nearPastDate.getDate() - numberOfDays);

    const currentAuction = await auctionFactory.createInstance({
        startDate: nearPastDate,
        endDate: nearFutureDate
    });
    const currentuctionId = currentAuction._id.toString();

    const oldAuction = await auctionFactory.createInstance({
        startDate: farPastDate,
        endDate: nearPastDate
    });
    const oldAuctionId = oldAuction._id.toString();

    const upcomingAuction = await auctionFactory.createInstance({
        startDate: nearFutureDate,
        endDate: farFutureDate
    });
    const upcomingAuctionId = upcomingAuction._id.toString();

    const bidOnCurrentAuction = await auctionService.addBid(userId, currentuctionId, 1200);
    const bidOnOldAuction = await auctionService.addBid(userId, oldAuctionId, 1200);
    const bidOnUpcomingAuction = await auctionService.addBid(userId, upcomingAuctionId, 1200);

    expect(bidOnCurrentAuction).not.toBeNull();
    expect(bidOnOldAuction).toBeNull();
    expect(bidOnUpcomingAuction).toBeNull();
});


test('Anyone can place a bid except the owner',async () => {

    const auctionService = container.get<IAuctionService>(TYPES.IAuctionService);

    const userFactory = new Factory('User');

    const ownerUser = await userFactory.createInstance();
    const ownerUserId = ownerUser._id.toString();

    const anotherUser = await userFactory.createInstance();
    const anotherUserId = anotherUser._id.toString();

    const auction = await createAuction({
        owner: ownerUser
    })
    const auctionId = auction._id.toString();

    const bidByOwner = await auctionService.addBid(ownerUserId, auctionId, 1200);
    const bidByanother = await auctionService.addBid(anotherUserId, auctionId, 1200);

    expect(bidByOwner).toBeNull();
    expect(bidByanother).not.toBeNull();
});


test('Bids must be a positive integer greather than zero',async () => {

    const auctionService = container.get<IAuctionService>(TYPES.IAuctionService);

    const userFactory = new Factory('User');

    const user = await userFactory.createInstance();
    const userId = user._id.toString();

    const auction = await createAuction({});
    const auctionId = auction._id.toString();

    const negativeBid = await auctionService.addBid(userId, auctionId, -2);
    const zeroBid = await auctionService.addBid(userId, auctionId, 0);
    const positiveBid = await auctionService.addBid(userId, auctionId, 100);

    expect(negativeBid).toBeNull();
    expect(zeroBid).toBeNull();
    expect(positiveBid).not.toBeNull();
});


async function createAuction(props: any) {

    const auctionFactory = new Factory('Auction');
    const currentDate = new Date();
    const numberOfDays = 6;

    const startDate = new Date();
    startDate.setDate(currentDate.getDate() - numberOfDays);

    const endDate = new Date();
    endDate.setDate(currentDate.getDate() + numberOfDays);

    const auctionProps = {
        ...props,
        startDate,
        endDate
    }

    const auction = await auctionFactory.createInstance(auctionProps);

    return auction;
}
// afterAll(DBHelper.tearDownDatabase);
