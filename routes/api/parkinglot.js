const express = require("express");
const router = express.Router();

const ParkingLot = require("../../models/Parkinglot");
const User = require("../../models/User");

var ParkingSpots = {
  A: {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: ""
  },
  B: {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: ""
  },
  C: {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: ""
  }
};

var findEmptyParkingSlotAndFill = (ParkingSpots, id, name, tid, carnumber) => {
  for (var parkinggroup in ParkingSpots) {
    for (var slot of Object.keys(ParkingSpots[parkinggroup])) {
      if (ParkingSpots[parkinggroup][slot] == "") {
        console.log(ParkingSpots[parkinggroup][slot]);
        ParkingSpots[parkinggroup][slot] = {
          id,
          name,
          tid,
          carnumber
        };
        return parkinggroup + "" + slot;
      }
    }
  }
};

var findParkingSlotOfThisAndEmpty = (ParkingSpots, carnumber) => {
  for (var parkinggroup in ParkingSpots) {
    for (var slot of Object.keys(ParkingSpots[parkinggroup])) {
      console.log("searching=> " + ParkingSpots[parkinggroup][slot].carnumber);
      if (ParkingSpots[parkinggroup][slot][carnumber] == carnumber) {
        console.log("Found parking slot of this car and emptied.");
        ParkingSpots[parkinggroup][slot] = "";
      }
    }
  }
};

// @route POST api/parkinglot/sensor
// @desc  get data from sensors
// @access Public
router.post("/sensor", async (req, res) => {
  console.log(req.query);
  res.status(200).send("Got data");
});

// @route POST api/parkinglot/exit
// @desc  Exit car server
// @access Public
router.post("/exit", async (req, res) => {
  try {
    const { carnumber } = req.body;
    findParkingSlotOfThisAndEmpty(ParkingSpots, carnumber);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

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
        allotedlot: findEmptyParkingSlotAndFill(
          ParkingSpots,
          "Guest",
          "Guest",
          "null",
          req.body.carnumber
        ),
        name: "Guest",
        carnumber: req.body.carnumber
      });
      // Don't open boom barrier
      console.log("Boom barrier not opened");
    } else {
      console.log("Entry of carnumber: ", req.body.carnumber);
      console.log("Teacher Entered: ", user.name);

      newTicket = new ParkingLot({
        user: user.id,
        allotedlot: findEmptyParkingSlotAndFill(
          ParkingSpots,
          user.id,
          user.name,
          user.teacherid,
          user.carnumber
        ),
        name: user.name,
        teacherid: user.teacherid,
        carnumber: user.carnumber
      });
      console.log("Boom barrier opened");
    }

    // @todo - Print coding

    // Priinting mechanism
    // Boombarrier
    //////
    const newTicketDB = await newTicket.save();
    res.json(newTicketDB);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/parkinglot/status
// @desc  Get status of all parking slots
router.get("/status", (req, res) => {
  res.json(ParkingSpots);
});

module.exports = router;
