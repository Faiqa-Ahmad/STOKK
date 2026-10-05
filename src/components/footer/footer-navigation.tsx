import React, { FC } from "react";
import Grid from "@mui/material/Grid";
import { FooterSectionTitle } from "../footer";

const FooterNavigation: FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        {/* <FooterSectionTitle title="Course" /> */}
        {/* {courseMenu.map(({ label, path }, index) => (
          <NavigationItem
            key={index + path}
            label={label}
            path={"#"}
          />
        ))} */}
      </Grid>
      <Grid item xs={12} md={6}>
        <FooterSectionTitle title="Menu" />
      </Grid>
    </Grid>
  );
};

export default FooterNavigation;
