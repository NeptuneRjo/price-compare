## Find Fish: Price Comparison Website

Find Fish

A MERN-stack web application used to view different product prices from different online-retailers.

Visit the site [here](https://neptunerjo.github.io/price-compare)

![Site Demo](gif.gif)

## Installation and Setup

- Clone or download this reprository
- Run `npm install` in both of the directories
- Run `npm start` to start the React App, or `node dist/server.js` to start the Node App

- The Node app runs on `localhost:4000` by default

## Testing

Backend:

- The backend can be tested by running `npm test` (make sure you're compiling the typscript to js if you're writing new tests)

Frontend:

- The frontend is also tested by running `npm test`

## Reflection

This is a personal project built to use technologies learned up until this point and to increase my knowledge of less-familiar tools such as `PuppeteerJs`.

Originally I wanted to build an application that sorted products by categories, however there was so much variation in data that it would be near impossible to not have duplicate or missing categories. I decided to compromise by removing the categories and trying to match the item names as closely as possible. There are still some duplicates because of this, but they have been minimized.

One of the main challenes of this project was determining the best way to automate the scraping of items. I ultimately came up with storing all of the categories in documents on Mongo for each website, so that the scrapers can just iterate through each category link.
Cleaning up the names so that they matched while also retaining all of the information necessary was also tricky, as each site has different naming structures / spellings.

At the end of the day, the technologies implemented in the project are `React`, `Node`, `MongoDb`, `Expressjs`, `Typescript`, `Bootstrap / Bootswatch`, `PuppeteerJs`, and `Jest` for testing.
I used `create-react-app --template typescript` to minimize frontend setup and to allow for more time spent on the backend.
