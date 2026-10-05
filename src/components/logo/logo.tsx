import React from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const StyledLogo = styled("img")({
  height: "72px",
  maxWidth: "100%",
  objectFit: "contain"
});

export const Logo = () => {
  const navigate = useNavigate();
  return (
    <StyledLogo
      src="/images/lock-logo.png"
      alt="logo"
      onClick={() => navigate("/")}
      sx={{ cursor: "pointer", height: { xs: "58px", sm: "68px" } }}
    />
  );
};
