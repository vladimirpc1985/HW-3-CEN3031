/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var listingSchema = new Schema({
    code: {type: String, required: true, unique: true},
    name: {type: String, required: true, unique: false},
    coordinates: {
        latitude: {type: Number, required: false, unique: false},
        longitude: {type: Number, required: false, unique: false}
    },
    address: {type: String, required: false, unique: false}
});


/*
    Create a 'pre' function that adds the updated_at (and created_at if not already there) property.

    The Schema pre method is to have operations happen before an object is saved.
    Then, this function save an updating DB.
*/
listingSchema.pre('save', function(next) {
  var currentDate = new Date();

  // Change the updated_at filed to current date.
  this.update_at = currentDate;

  // If created_at doesn't exist, add to that field.
  if (!this.created_at) {
      this.created_at = currentDate;
  }

  next();
});

/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;
