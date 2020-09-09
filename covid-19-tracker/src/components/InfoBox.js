import React from 'react';
import {Card, CardContent, Typography} from "@material-ui/core";
import "./InfoBox.css";

const InfoBox = ({ title, cases, total, ...props }) => {
  return (
    <Card
      onClick={props.onClick}
      className={"infobox"}>
        <CardContent>
      {/* Title */}
          <Typography className="infobox_title" color="textSecondary">
            {title}
          </Typography>
      {/* Cases */}
          <h2 className="infobox_cases">{cases}</h2>

      {/* Total */}
      <Typography className="infobox_total" color="textSecondary ">
        {total} Total
      </Typography>
        </CardContent>
    </Card>
  );
};

export default InfoBox;
