import React, { FC, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Navigation } from "../navigation";
import { useTheme } from "@mui/material/styles";
import { Menu, Close } from "@mui/icons-material";
import { Logo } from "../logo/logo";

const Header: FC = () => {
  const [visibleMenu, setVisibleMenu] = useState<boolean>(false);
  const { breakpoints } = useTheme();
  const matchMobileView = useMediaQuery(breakpoints.down("lg"));
  return (
    <Box sx={{ backgroundColor: "rgba(16,41,47,.97)", borderBottom: "1px solid rgba(255,255,255,.08)", position: "sticky", top: 0, zIndex: 1200, backdropFilter: "blur(16px)" }}>
      <Container
        sx={{
          [breakpoints.up("sm")]: {
            maxWidth: "1400px"
          },
          py: { xs: 1.2, md: 1.5 },
          px: { xs: 2, md: 4 }
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            minHeight: 66
          }}
        >
          <Logo />
          <Box sx={{ ml: "auto", display: { md: "inline-flex", lg: "none" } }}>
            <IconButton onClick={() => setVisibleMenu(!visibleMenu)} sx={{ color: "white", bgcolor: "rgba(255,255,255,.06)" }}>
              <Menu />
            </IconButton>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: { xs: "column", lg: "row" },
              transition: theme => theme.transitions.create(["top"]),
              ...matchMobileView && {
                py: 6,
                backgroundColor: "#10292f",
                zIndex: "appBar",
                position: "fixed",
                height: { xs: "100vh", lg: "auto" },
                top: visibleMenu ? 0 : "-120vh",
                left: 0
              }
            }}
          >
            <Box />
            <Navigation />
            {visibleMenu &&
              matchMobileView &&
              <IconButton
                sx={{
                  position: "fixed",
                  top: 10,
                  right: 10
                }}
                onClick={() => setVisibleMenu(!visibleMenu)}
              >
                <Close />
              </IconButton>}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
