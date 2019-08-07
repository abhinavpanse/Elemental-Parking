import Link from "@material-ui/core/Link";

import React from "react";
import Typography from "@material-ui/core/Typography";

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Built with hard work by the "}
      <Link color="inherit" href="https://abhinavpanse.me/">
        Smart Parking Team - Abhinav, Dushyant, Anamika, Pranjal, Rajmani
      </Link>
    </Typography>
  );
}

export default MadeWithLove;
