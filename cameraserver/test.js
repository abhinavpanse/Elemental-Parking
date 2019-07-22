// var fetch = require("node-fetch");
// var url = "http://localhost:5000/api/parkinglot";
// var data = { carnumber: "asdf" };

// fetch(url, {
//   method: "POST",
//   body: JSON.stringify(data),
//   headers: {
//     "Content-Type": "application/json"
//   }
// })
//   .then(res => res.json())
//   .then(response => console.log("Success: ", JSON.stringify(response)))
//   .catch(err => console.err("ERror: ", err));

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
      ParkingSpots[parkinggroup][slot] = false;
      console.log(parkinggroup + "" + slot);
    }
  }
}
findEmptyParkingSlotAndFill(ParkingSpots);
