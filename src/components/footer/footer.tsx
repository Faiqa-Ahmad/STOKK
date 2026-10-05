import React, { FC } from "react";
import { Box, Container, Link, Typography } from "@mui/material";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { FooterLogo } from "../logo/FooterLogo";

const links = {
  Platform: ["Explore pools", "Marketplace", "Yield calculator", "Portfolio"],
  Resources: ["Documentation", "Security", "Help center", "API status"],
};

const Footer: FC = () => <Box component="footer" sx={{ background: "#0b2025", color: "white", borderTop: "1px solid rgba(255,255,255,.07)" }}>
  <Container maxWidth={false} sx={{ maxWidth: "1240px !important", px: { xs: 2.5, md: 4 } }}>
    <Box sx={{ py: { xs: 6, md: 8 }, display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.4fr .6fr .6fr" }, gap: { xs: 4, md: 7 } }}>
      <Box sx={{ "& img": { maxWidth: 245, maxHeight: 78, objectFit: "contain" } }}><FooterLogo /><Typography sx={{ color: "rgba(255,255,255,.48)", maxWidth: 390, lineHeight: 1.7, mt: 1.5 }}>Open financial infrastructure for smarter token markets, transparent staking, and confident long-term decisions.</Typography><Box sx={{ mt: 3, display: "inline-flex", alignItems: "center", gap: 1, px: 1.5, py: .8, borderRadius: 4, bgcolor: "rgba(75,230,176,.08)", border: "1px solid rgba(75,230,176,.14)" }}><Box className="status-dot" sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "#4be6b0" }} /><Typography variant="caption" sx={{ color: "#7cf1c7", fontWeight: 700 }}>All systems operational</Typography></Box></Box>
      {Object.entries(links).map(([title, items]) => <Box key={title}><Typography sx={{ fontWeight: 800, mb: 2, letterSpacing: ".02em" }}>{title}</Typography>{items.map((item) => <Link key={item} href="#" underline="none" sx={{ color: "rgba(255,255,255,.48)", display: "block", py: .65, fontSize: 14, transition: "color .2s ease, transform .2s ease", "&:hover": { color: "#55edf1", transform: "translateX(4px)" } }}>{item}</Link>)}</Box>)}
    </Box>
    <Box sx={{ py: 2.5, borderTop: "1px solid rgba(255,255,255,.07)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2, flexWrap: "wrap" }}><Typography variant="caption" sx={{ color: "rgba(255,255,255,.35)" }}>© 2026 eSTOKKYAM. Built for the open economy.</Typography><Link href="#" underline="none" sx={{ display: "flex", alignItems: "center", gap: .5, color: "#55edf1", fontSize: 13, fontWeight: 700 }}>Contact support <ArrowOutwardRoundedIcon sx={{ fontSize: 15 }} /></Link></Box>
  </Container>
</Box>;

export default Footer;
