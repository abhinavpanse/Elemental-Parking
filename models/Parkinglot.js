const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParkinglotSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  gateentrydate: {
    type: Date,
    default: Date.now
  },
  allotedlot: {
    type: String
  },
  name: String,
  teacherid: String,
  carnumber: String
});

module.exports = ParkingLot = mongoose.model("parkinglot", ParkinglotSchema);
