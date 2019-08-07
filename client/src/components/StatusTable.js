import React, { Component } from "react";
import ReactTabllist from "react-tabllist";

import axios from "axios";

class StatusTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        ["", "A", "B", "C"],
        ["1", "", "", ""],
        ["2", "", "", ""],
        ["3", "", "", ""],
        ["4", "", "", ""],
        ["5", "", "", ""],
        ["6", "", "", ""],
        ["7", "", "", ""],
        ["8", "", "", ""],
        ["9", "", "", ""]
      ]
    };
  }

  async getStatusData() {
    try {
      const res = await axios.get("/api/parkinglot/status");
      const resj = res.data;

      let idata = [
        ["", "A", "B", "C"],
        ["1", "", "", ""],
        ["2", "", "", ""],
        ["3", "", "", ""],
        ["4", "", "", ""],
        ["5", "", "", ""],
        ["6", "", "", ""],
        ["7", "", "", ""],
        ["8", "", "", ""],
        ["9", "", "", ""]
      ];

      //   console.log(resj);
      //   console.log(idata);

      for (var i = 1; i < idata.length; i++) {
        for (var j = 1; j < 4; j++) {
          var lot = "";
          if (j == 1) {
            lot = "A";
          } else if (j == 2) {
            lot = "B";
          } else if (j == 3) {
            lot = "C";
          }
          var slot = i;

          idata[i][j] = JSON.stringify(resj[lot][slot]);
        }
      }
      //   console.log(idata);
      //   console.log(this.state);
      this.setState(data => {
        this.state.data = idata;
        return idata;
      });
    } catch (err) {
      console.error(err);
    }
  }

  componentDidMount() {
    this.getStatusData();

    this.interval = setInterval(() => this.getStatusData(), 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  property = {
    style: {
      width: "100%",
      margin: "0 auto",
      height: 300
    },
    border: {
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#f4f4f4"
    },
    scroll: {
      enable: true,
      speed: 50,
      distance: 1
    },
    header: {
      show: true,
      style: {
        height: 30
      },
      cellStyle: {
        color: "#000000",
        border: ""
      }
    },
    body: {
      row: {
        transition: true,
        serialNumber: {
          show: false,
          formatter: "{index}.",
          style: {
            backgroundColor: "",
            backgroundImage: "",
            color: "#ffffff"
          },
          specialStyle: []
        },
        spacing: 0,
        rowCheckBox: false,
        style: {
          height: 30
        },
        specialStyle: [],
        visual: {
          show: false,
          interval: 1,
          style: {
            backgroundColor: "#E8F4FC",
            backgroundImage: ""
          }
        },
        silent: {
          show: false,
          style: {
            opacity: 0.8
          }
        }
      },
      cellOfColumn: {
        style: []
      },
      cell: {
        style: {
          fontSize: 16,
          minWidth: 50,
          color: "#000000",
          textAlign: "center",
          border: "",
          width: "auto"
        },
        iconStyle: {
          width: 24,
          height: "auto"
        }
      }
    }
  };

  render() {
    console.log("Render");
    console.log(this.state.data);
    return (
      <ReactTabllist
        className="demo"
        data={this.state.data}
        property={this.property}
      />
    );
  }
}

export default StatusTable;
