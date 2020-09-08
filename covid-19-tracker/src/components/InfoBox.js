import React from 'react';
import {Card, CardContent, Typography} from "@material-ui/core";

const MyComponent = ({ title, cases, total }) => {
  return (
    <Card className={"infobox"}>
        <CardContent>
      {/* Title */}
          <Typography className="infobox__title" color="textSecondary">
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

export default MyComponent;
