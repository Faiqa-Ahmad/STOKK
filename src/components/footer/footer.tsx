import React, { FC } from "react";
import { Box, useTheme } from "@mui/material";
import Container from "@mui/material/Container";
import { FooterLogo } from "../logo/FooterLogo";

const Footer: FC = () => {
  const { breakpoints } = useTheme();
  return (
    <Box
      component="footer"
      sx={{ background: "#10292f", borderTop: "1px solid rgba(255,255,255,.08)" }}
    >
      <Container sx={{ [breakpoints.up("sm")]: { maxWidth: "1400px" } }}>
        <Box
          sx={{
            textAlign: "left",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            py: { xs: 3, sm: 2 },
            "& img": { maxWidth: "240px", maxHeight: "72px", height: "auto", objectFit: "contain" }
          }}
        >
          <FooterLogo />
          <Box
            sx={{
              width: { xs: "100%", sm: "324px" },
              flexShrink: 0,
              height: "42px",
              borderRadius: "10px",
              backgroundColor: "rgba(255,255,255,.06)",
              border: "1px solid rgba(255,255,255,.1)",
              color: "#55edf1",
              fontSize: "14px",
              lineHeight: "6px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            HELP
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
