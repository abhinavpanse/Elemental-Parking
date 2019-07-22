const express = require("express");
const router = express.Router();

const ParkingLot = require("../../models/Parkinglot");
const User = require("../../models/User");

var ParkingSpots = {
  A: {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
    8: true,
    9: true
  },
  B: {
    1: true,
    2: true,
    3: true,
    4: true,
    5: true
  },
  C: {
    1: true,
    2: true,
    3: true,
    4: true
  }
};

function findEmptyParkingSlotAndFill(ParkingSpots) {
  for (var parkinggroup in ParkingSpots) {
    for (var slot of Object.keys(ParkingSpots[parkinggroup])) {
      if (ParkingSpots[parkinggroup][slot] == true) {
        console.log(ParkingSpots[parkinggroup][slot]);
        ParkingSpots[parkinggroup][slot] = false;
        return parkinggroup + "" + slot;
      }
    }
  }
}

// @route POST api/parkinglot
// @desc  Create parking lot ticket
// @access Public
router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ carnumber: req.body.carnumber });

    var newTicket;

    if (!user) {
      // Guest
      newTicket = new ParkingLot({
        allotedlot: findEmptyParkingSlotAndFill(ParkingSpots),
        name: "Guest",
        carnumber: req.body.carnumber
      });
    } else {
      console.log("Entry of carnumber: ", req.body.carnumber);
      console.log("Teacher Entered: ", user.name);

      newTicket = new ParkingLot({
        user: user.id,
        allotedlot: findEmptyParkingSlotAndFill(ParkingSpots),
        name: user.name,
        teacherid: user.teacherid,
        carnumber: user.carnumber
      });
    }

    // @todo - Print coding
    const newTicketDB = await newTicket.save();
    res.json(newTicketDB);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
