import 'reflect-metadata';

import 'module-alias/register';

import * as bodyParser from 'body-parser';
import express, { Application, NextFunction, Request, Response } from 'express';
import {  InversifyExpressServer } from 'inversify-express-utils';
import mongoose from 'mongoose';
import path from 'path';
import './api/v1/controllers';
import config from './config';
import ResponseUtils from './utils/ResponseUtils';
import User from './models/user/User';
import container from './container';
import { interfaces } from 'inversify';
import Container from 'inversify/lib/interfaces/interfaces'


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

class App {

    public app: Application;
    private mongoUrl = config.mongoUrl;

    constructor() {

        const server = new InversifyExpressServer(container);
        server.setConfig((app: Application) => {

            app.set('view engine', 'ejs');
            app.set('views', 'views');
            app.use(express.static(path.join(__dirname, '../public')));
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: true }));

            app.use(passport.initialize()); 
            this.configurePassportLocalStrategy();
            this.mongoSetup();
            this.isUnparsable(app);
        });

        server.setErrorConfig((app) => {
            this.handleError(app);
        });
        
        this.app = server.build();
        this.useWildcard(this.app);
    }

    private configurePassportLocalStrategy() {
        passport.use(new LocalStrategy({usernameField: 'user[email]', passwordField: 'user[password]', session: false}, User.authenticate()));
        passport.serializeUser(User.serializeUser());
        passport.deserializeUser(User.deserializeUser());
    }

    private mongoSetup(): void {
        mongoose.connect(this.mongoUrl).catch((err: Error) => console.error(err.message));
    }

    private handleError(app: Application) {
        app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
            console.error(error);
            return ResponseUtils.send(res, 500, error.message);
        });
    }

    private isUnparsable(app: Application) {
        app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            if (err instanceof SyntaxError) {
                return ResponseUtils.send(res, 400, 'Unparsable JSON');
            } else {
                next();
            }
        });
    }

    private useWildcard(app: Application) {
        app.use((req: Request, res: Response) => {
            return ResponseUtils.send(res, 404, 'Invalid Route');
        });
    }
}

(async () => {
})();

export default new App().app;
