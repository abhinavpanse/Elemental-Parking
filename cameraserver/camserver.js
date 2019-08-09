const fetch = require("node-fetch");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

// let image_url = "http://192.168.43.1:8080/shot.jpg";
let image_url = "http://192.168.137.187:8080/shot.jpg";

let image_dest = "D:/car.jpg";

let prevcar = 0;

const download_image = (url, image_path) =>
  axios({
    url,
    responseType: "stream"
  }).then(
    response =>
      new Promise((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(image_path))
          .on("finish", () => resolve())
          .on("error", e => reject(e));
      })
  );

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  while (true) {
    await sleep(5000);

    await download_image(image_url, image_dest);

    let body = new FormData();
    body.append("upload", fs.createReadStream(image_dest));

    fetch("https://api.platerecognizer.com/v1/plate-reader/", {
      method: "POST",
      headers: {
        Authorization: "Token 12ed0f3821fefa4263e07cafecd491f60696815f"
      },
      body: body
    })
      .then(res => res.json())
      .then(json => {
        // console.log(json.results);
        try {
          // Where magic happens
          const { score, plate } = json.results[0];
          var currcar = score > 0.2 ? plate : 0;
          if (currcar != prevcar) {
            // Do a post request//////////////////////////////////////
            console.log(currcar);
            prevcar = currcar;
            const our_main_server = "http://localhost:5000/api/parkinglot";
            var data = { carnumber: currcar };

            fetch(our_main_server, {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json"
              }
            })
              .then(res => res.json())
              .then(response =>
                console.log("Success: ", JSON.stringify(response))
              )
              .catch(err => console.err("ERror: ", err));
            ///////////////////////////////////////////////////////////////////////////
          }
        } catch {
          console.log("---");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}

console.log("Camera server started...");
demo();
