// import node modules
const mongoose = require('mongoose');

// define a schema
const EventModelSchema = new mongoose.Schema ({
  creator_name  : String,
  creator_fbid  : String,
  description   : String,
  location      : String,
  coords        : [Number],
  start_time    : Number,
  end_time      : Number,
  going         : [String], // list of fbids of people going
  interested    : [String] // fbids of people interested
});

// compile model from schema
module.exports = mongoose.model('EventModel', EventModelSchema);
