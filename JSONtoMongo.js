'use strict';
/*
  Import modules/files you may need to correctly run the script.
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Listing = require('./ListingSchema.js'),
    config = require('./config');

/* Connects to your database */
mongoose.connect(config.db.uri);

/* Get DB connection */
var mongooseConnection = mongoose.connection;
mongooseConnection.on("connected", function () {
    console.log("Connected!");
    fsFunction();
});
mongooseConnection.on("disconnected", function () {
    console.log("Disconnected!");
});


/*
    Uses the File System module to load `listings.json` into memory.
*/

var listingData = undefined;
var fsFunction = function () {   // Upload data.
    fs.readFile('listings.json', 'utf8', function (err, data) {
        /*
          This callback function should save the data in the listingData variable,
          then adds data to the DB.
         */
        if (err) {
            console.log(err);
        } else {
            listingData = JSON.parse(data);
            addListingData();
        }
    });
};

// Removes all the DB elements, and then, it adds all elements again.
var addListingData = function () {
    Listing.remove({}, function (err) { //Query that removes all elements, and then calls a call back function.
        if (err) {
            console.log(err);
        } else {
            console.log("Removed DB.");
            pushDataToDB();
        }
    });
};

/*
  Instantiate a mongoose model for each listing object in the JSON file,
  and then save it to your Mongo database
 */
var pushDataToDB = function () {
    for (var item in listingData["entries"]) {
        var entry = new Listing(listingData["entries"][item]);

        // Save to DB.
        entry.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Listing save successfully!");
            }
        });
    };
};
/*
  Once you've written + run the script, check out your MongoLab database to ensure that
  it saved everything correctly.
 */