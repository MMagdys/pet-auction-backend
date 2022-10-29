# Pet Auction Backend

This project allows user to place bids on pets. The Project consists of two endpoints

- The first one: allows users to bid on certain pet certain amount of money.
- The second one: allow pet owner to list all bids if available.


## Tech Stack

The project is developed using 
- NodeJS
- Typescript
- MongoDB.


## Files Structure

The project consists of 3 main directory `src`, `dist`, `tests`

- **src:** the one containing the typeScript source code.
- **dist:** the compiled version from which we run our code.
- **tests:** contains the test case.


## Getting Started

### System Requirments


your system should have nodeJs, typescript and mongoDB up and running to run this app.

- [Node Js installation Guide](`https://docs.npmjs.com/downloading-and-installing-node-js-and-npm`)
- TypeScript installation Guide
```sh
# after installing node and NPM you can easily install typescript using the following command
npm install -g typescript
```
- [MongoDB installation Guide](`https://www.mongodb.com/docs/manual/installation/`)



### Install

Aftre cloining the repo

1. Install the required dependencies 

```sh
npm install
```


2. In case you made any changes to the code, you should recompile the source to get the new dist (optional)

```sh
npm build
```

3. run the tests

```sh
npm test
```

4. run the server

```sh
npm start
```

## License
[MIT](https://choosealicense.com/licenses/mit/)



