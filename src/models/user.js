// import node modules
const mongoose = require('mongoose');

// define a schema
const UserModelSchema = new mongoose.Schema ({
  name        	: String,
  fbid          : String,
  tagline       : String,
  location     	: Object,
  going_events  : [String], // _ids of events going
  int_events    : [String], // _ids of events interested
});

// compile model from schema
module.exports = mongoose.model('UserModel', UserModelSchema);
