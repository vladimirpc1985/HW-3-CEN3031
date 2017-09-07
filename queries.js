var mongoose = require('mongoose'),
    Listing = require('./ListingSchema.js'),
    config = require('./config');

/* Connect to your database */
mongoose.connect(config.db.uri);

var mongooseConnection = mongoose.connection;
mongooseConnection.on("connected", function () {
    console.log("Connected!");
    findLibraryWest();
    removeCable();
    updatePhelpsLab();
    retrieveAllListings();
});
mongooseConnection.on("disconnected", function () {
    console.log("Disconnected!");
});





/* Fill out these functions using Mongoose queries*/

var findLibraryWest = function() {
  /*
    Find the document that contains data corresponding to Library West,
    then log it to the console.
   */
    // Get the Library West document.
    Listing.find({ name: 'Library West' }, function(err, documentObject) {
        if (err) throw err;
        console.log("In findLibraryWest");
        console.log(documentObject);
    });
};


var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console.
   */
    Listing.findOneAndRemove({ code: 'CABL' }, function(err, documentObject) {
        if (err) throw err;
        console.log(documentObject);
        console.log('CABL successfully deleted!');
    });
};
var updatePhelpsLab = function() {
  /*
    Phelps Laboratory's address is incorrect. Find the listing, update it, and then
    log the updated document to the console.
   */
    Listing.findOneAndUpdate({ name: 'Phelps Laboratory' }, { address: 'new address' }, function(err, oldDocumentObject) {
        if (err) throw err;

        // we have the updated user returned to us
        Listing.find({ name: 'Phelps Laboratory' }, function(err, documentObject) {
            if (err) throw err;
            console.log(documentObject);
        });
    });
};
var retrieveAllListings = function() {
  /*
    Retrieve all listings in the database, and log them to the console.
   */
  Listing.find({}, function (err, documentObjects) {
      if (err) throw err;

      console.log(documentObjects);
  });
};

// findLibraryWest();
// removeCable();
// updatePhelpsLab();
// retrieveAllListings();
