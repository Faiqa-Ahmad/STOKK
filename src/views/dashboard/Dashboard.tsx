import React, { useState } from "react";
import { Box, Button, Checkbox, Chip, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import AutoGraphRoundedIcon from "@mui/icons-material/AutoGraphRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import { useNavigate } from "react-router-dom";
import StakingCalculator from "../../components/staking-calculator/StakingCalculator";

const offers = [
  { id: "#371", token: "ESTK", pair: "USDC", returnRate: "10.0%", yieldRate: "12.0%", market: "$51.35", ask: "$60.00", difference: "+16.85%", stock: "12.288" },
  { id: "#408", token: "YAM", pair: "USDT", returnRate: "8.5%", yieldRate: "10.4%", market: "$42.80", ask: "$46.25", difference: "+8.06%", stock: "24.610" },
  { id: "#512", token: "NEX", pair: "USDC", returnRate: "11.2%", yieldRate: "13.8%", market: "$78.10", ask: "$82.40", difference: "+5.51%", stock: "8.902" },
];

const stats = [
  { label: "Total value locked", value: "$24.8M", detail: "+12.4% this month", icon: SecurityRoundedIcon },
  { label: "Average staking APY", value: "10.7%", detail: "Across verified pools", icon: AutoGraphRoundedIcon },
  { label: "Active market offers", value: "1,284", detail: "38 added today", icon: BoltRoundedIcon },
];

const Dashboard = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return <Box sx={{ bgcolor: "#f4f8f8", minHeight: "100vh" }}>
    <Box sx={{ position: "relative", overflow: "hidden", color: "white", background: "radial-gradient(circle at 82% 8%, rgba(0,219,227,.24), transparent 28%), linear-gradient(135deg, #10292f 0%, #173f48 52%, #087f8d 100%)", "&::after": { content: '""', position: "absolute", width: 420, height: 420, border: "1px solid rgba(255,255,255,.08)", borderRadius: "50%", right: -170, bottom: -250, animation: "floatOrb 8s ease-in-out infinite" } }}>
      <Box sx={{ maxWidth: 1240, mx: "auto", px: { xs: 2.5, md: 4 }, pt: { xs: 6, md: 9 }, pb: { xs: 14, md: 16 }, position: "relative", zIndex: 1 }}>
        <Chip className="motion-fade-up" icon={<VerifiedRoundedIcon />} label="Professional-grade DeFi analytics" sx={{ bgcolor: "rgba(0,219,227,.12)", color: "#8af8fb", border: "1px solid rgba(138,248,251,.2)", fontWeight: 700, mb: 3, animationDelay: ".05s", "& .MuiChip-icon": { color: "#52e9ee" } }} />
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.2fr .8fr" }, gap: 5, alignItems: "end" }}>
          <Box className="motion-fade-up" sx={{ animationDelay: ".14s" }}><Typography component="h1" sx={{ fontSize: { xs: 38, sm: 54, md: 64 }, lineHeight: 1.04, letterSpacing: "-0.045em", fontWeight: 800, maxWidth: 760 }}>Make every token work <Box component="span" sx={{ color: "#55edf1" }}>smarter.</Box></Typography><Typography sx={{ mt: 2.5, maxWidth: 620, color: "rgba(255,255,255,.68)", fontSize: { xs: 16, md: 18 }, lineHeight: 1.7 }}>Explore verified opportunities, model compound growth, and make confident staking decisions from one focused workspace.</Typography></Box>
          <Box className="motion-fade-up" sx={{ display: "flex", gap: 1.5, justifyContent: { xs: "flex-start", md: "flex-end" }, flexWrap: "wrap", animationDelay: ".24s" }}><Button variant="contained" endIcon={<ArrowOutwardRoundedIcon />} sx={{ bgcolor: "#00dbe3", color: "#10292f", px: 3, py: 1.4, fontWeight: 800, borderRadius: 2.5, boxShadow: "0 12px 30px rgba(0,219,227,.22)", transition: "transform .2s ease, box-shadow .2s ease", "&:hover": { bgcolor: "#5af2f5", transform: "translateY(-3px)", boxShadow: "0 18px 36px rgba(0,219,227,.3)" } }}>Explore pools</Button><Button variant="outlined" startIcon={<SwapHorizRoundedIcon />} sx={{ borderColor: "rgba(255,255,255,.24)", color: "white", px: 3, py: 1.4, fontWeight: 700, borderRadius: 2.5, transition: "transform .2s ease, background-color .2s ease", "&:hover": { borderColor: "#55edf1", bgcolor: "rgba(255,255,255,.04)", transform: "translateY(-3px)" } }}>Exchange</Button></Box>
        </Box>
      </Box>
    </Box>

    <Box sx={{ maxWidth: 1240, mx: "auto", px: { xs: 2, md: 4 }, mt: { xs: -9, md: -8 }, position: "relative", zIndex: 2 }}>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 2 }}>
        {stats.map(({ label, value, detail, icon: Icon }, index) => <Paper className="motion-fade-up" key={label} elevation={0} sx={{ p: { xs: 2.5, md: 3 }, borderRadius: 3.5, border: "1px solid rgba(18,67,75,.09)", boxShadow: "0 18px 50px rgba(18,48,55,.09)", display: "flex", gap: 2, alignItems: "center", animationDelay: `${.28 + index * .09}s`, transition: "transform .3s ease, box-shadow .3s ease", "&:hover": { transform: "translateY(-7px)", boxShadow: "0 26px 60px rgba(18,48,55,.14)" }, "&:hover .metric-icon": { transform: "rotate(-6deg) scale(1.08)" } }}><Box className="metric-icon" sx={{ width: 48, height: 48, borderRadius: 2.5, display: "grid", placeItems: "center", bgcolor: "#e8fbfb", color: "#008f9e", flexShrink: 0, transition: "transform .3s ease" }}><Icon /></Box><Box><Typography variant="caption" sx={{ color: "#71868a", fontWeight: 700 }}>{label}</Typography><Typography sx={{ fontSize: { xs: 24, md: 28 }, fontWeight: 800, color: "#173039", lineHeight: 1.2 }}>{value}</Typography><Typography variant="caption" sx={{ color: "#14a36f" }}>{detail}</Typography></Box></Paper>)}
      </Box>

      <Box sx={{ mt: { xs: 5, md: 8 } }}><Box className="motion-fade-up" sx={{ mb: 2.5, animationDelay: ".15s" }}><Typography sx={eyebrowSx}>Projection workspace</Typography><Typography component="h2" sx={headingSx}>Plan your next staking position</Typography></Box><StakingCalculator /></Box>

      <Box sx={{ py: { xs: 6, md: 9 } }}>
        <Box sx={{ display: "flex", alignItems: { xs: "flex-start", md: "end" }, justifyContent: "space-between", flexDirection: { xs: "column", md: "row" }, gap: 2.5, mb: 3 }}>
          <Box><Typography sx={eyebrowSx}>Live marketplace</Typography><Typography component="h2" sx={headingSx}>Curated token offers</Typography><Typography sx={{ color: "#71868a", mt: .8 }}>Compare verified opportunities across the network.</Typography></Box>
          <Box sx={{ display: "flex", gap: 1.5, width: { xs: "100%", md: "auto" }, flexDirection: { xs: "column", sm: "row" } }}><TextField value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search offers" size="small" InputProps={{ startAdornment: <InputAdornment position="start"><SearchRoundedIcon sx={{ color: "#7b9296" }} /></InputAdornment> }} sx={{ minWidth: { md: 260 }, "& .MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 2.5 } }} /><Box sx={{ display: "flex", alignItems: "center", bgcolor: "white", border: "1px solid #dce7e8", borderRadius: 2.5, px: 1.2 }}><Checkbox checked={isVerified} onChange={(event) => setIsVerified(event.target.checked)} size="small" sx={{ color: "#00a7b3", "&.Mui-checked": { color: "#00a7b3" } }} /><Typography variant="body2" sx={{ color: "#476166", fontWeight: 700, whiteSpace: "nowrap" }}>Verified only</Typography></Box></Box>
        </Box>
        <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #dfe9ea", borderRadius: 3.5, boxShadow: "0 16px 45px rgba(18,48,55,.06)" }}>
          <Table aria-label="Token marketplace offers" sx={{ minWidth: 900 }}>
            <TableHead><TableRow sx={{ bgcolor: "#edf5f5", "& th": { borderBottom: "1px solid #dce8e9", color: "#6c8387", fontSize: 11, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", py: 2 } }}><TableCell>Offer</TableCell><TableCell>Asset / Pair</TableCell><TableCell align="right">Return</TableCell><TableCell align="right">Yield</TableCell><TableCell align="right">Market price</TableCell><TableCell align="right">Ask price</TableCell><TableCell align="right">Premium</TableCell><TableCell align="right">Stock</TableCell><TableCell align="center">Actions</TableCell></TableRow></TableHead>
            <TableBody>{offers.filter((offer) => !search || `${offer.token} ${offer.pair} ${offer.id}`.toLowerCase().includes(search.toLowerCase())).map((offer) => <TableRow key={offer.id} hover sx={{ "& td": { borderColor: "#edf2f2", py: 2 }, "&:last-child td": { borderBottom: 0 } }}><TableCell><Typography sx={{ color: "#173039", fontWeight: 800 }}>{offer.id}</Typography></TableCell><TableCell><Box sx={{ display: "flex", alignItems: "center", gap: 1.3 }}><Box sx={{ width: 38, height: 38, borderRadius: "50%", display: "grid", placeItems: "center", color: "#087f8d", bgcolor: "#def8f8", fontWeight: 900 }}>{offer.token[0]}</Box><Box><Typography sx={{ color: "#173039", fontWeight: 800 }}>{offer.token}</Typography><Typography variant="caption" color="text.secondary">{offer.pair}</Typography></Box></Box></TableCell><TableCell align="right"><Typography fontWeight={700}>{offer.returnRate}</Typography></TableCell><TableCell align="right"><Chip label={offer.yieldRate} size="small" sx={{ bgcolor: "#e5f8f0", color: "#087f58", fontWeight: 800 }} /></TableCell><TableCell align="right">{offer.market}</TableCell><TableCell align="right"><Typography fontWeight={700}>{offer.ask}</Typography></TableCell><TableCell align="right"><Typography sx={{ color: "#c76828", fontWeight: 700 }}>{offer.difference}</Typography></TableCell><TableCell align="right">{offer.stock}</TableCell><TableCell align="center"><IconButton aria-label={`Add ${offer.token} to cart`} sx={actionButtonSx}><ShoppingCartOutlinedIcon fontSize="small" /></IconButton><IconButton aria-label={`View ${offer.token} offer`} onClick={() => navigate("/sell")} sx={{ ...actionButtonSx, color: "#173039", bgcolor: "#edf2f2", ml: 1 }}><RemoveRedEyeOutlinedIcon fontSize="small" /></IconButton></TableCell></TableRow>)}</TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  </Box>;
};

const eyebrowSx = { color: "#00a7b3", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".12em", fontSize: 12 };
const headingSx = { color: "#173039", fontWeight: 800, fontSize: { xs: 28, md: 38 }, letterSpacing: "-.035em" };
const actionButtonSx = { color: "#00a7b3", bgcolor: "#eafafa", "&:hover": { bgcolor: "#d3f5f6" } };

export default Dashboard;
