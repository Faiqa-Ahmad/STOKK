import React, { FormEvent, useState } from "react";
import { Alert, Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import GrowthChart from "./GrowthChart";
import { Frequency, RewardsResult } from "./types";

type Status = "idle" | "loading" | "success" | "error";
const formatNumber = (value: number) => value.toLocaleString(undefined, { maximumFractionDigits: 6 });

const StakingCalculator = () => {
  const [principal, setPrincipal] = useState("1000"), [apy, setApy] = useState("8"), [duration, setDuration] = useState("1");
  const [durationUnit, setDurationUnit] = useState<"years" | "days">("years"), [frequency, setFrequency] = useState<Frequency>("monthly");
  const [tokenPrice, setTokenPrice] = useState(""), [status, setStatus] = useState<Status>("idle"), [error, setError] = useState("");
  const [result, setResult] = useState<RewardsResult | null>(null);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setResult(null);
    const parsed = { principal: Number(principal), apy: Number(apy), durationYears: durationUnit === "days" ? Number(duration) / 365 : Number(duration), compoundingFrequency: frequency, ...(tokenPrice.trim() ? { tokenPrice: Number(tokenPrice) } : {}) };
    if (!principal || apy === "" || !duration || parsed.principal <= 0 || parsed.apy < 0 || parsed.durationYears <= 0) {
      setStatus("error"); setError("Enter a positive stake and duration, and an APY of zero or more."); return;
    }
    setStatus("loading");
    try {
      const response = await fetch("/api/calculate-rewards", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed) });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.details?.join(". ") || payload.error || "Calculation failed");
      setResult(payload); setStatus("success");
    } catch (requestError) {
      setStatus("error"); setError(requestError instanceof Error ? requestError.message : "Unable to calculate rewards. Please try again.");
    }
  };

  return <Paper elevation={0} sx={{ border: "1px solid #d9e4e6", borderRadius: 3, overflow: "hidden" }}>
    <Box sx={{ p: { xs: 2.5, md: 4 }, background: "linear-gradient(135deg, #173039 0%, #205b66 100%)", color: "white" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}><Box sx={{ bgcolor: "rgba(0,219,227,.16)", p: 1, borderRadius: 2, display: "flex" }}><TrendingUpRoundedIcon sx={{ color: "#00dbe3" }}/></Box><Box><Typography variant="h5" fontWeight={800}>Staking rewards calculator</Typography><Typography sx={{ color: "rgba(255,255,255,.72)", mt: .25 }}>Model compounded token growth before you stake.</Typography></Box></Box>
    </Box>
    <Box sx={{ p: { xs: 2.5, md: 4 }, display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(280px, .8fr) minmax(360px, 1.2fr)" }, gap: 4 }}>
      <Box component="form" onSubmit={submit} noValidate sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr" }, gap: 2 }}>
        <TextField label="Amount to stake" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} inputProps={{ min: 0, step: "any" }} required/>
        <TextField label="APY (%)" type="number" value={apy} onChange={(e) => setApy(e.target.value)} inputProps={{ min: 0, step: "any" }} required/>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 120px", gap: 1 }}><TextField label="Duration" type="number" value={duration} onChange={(e) => setDuration(e.target.value)} inputProps={{ min: 0, step: "any" }} required/><FormControl><InputLabel id="duration-unit">Unit</InputLabel><Select labelId="duration-unit" label="Unit" value={durationUnit} onChange={(e) => setDurationUnit(e.target.value as "years" | "days")}><MenuItem value="years">Years</MenuItem><MenuItem value="days">Days</MenuItem></Select></FormControl></Box>
        <FormControl><InputLabel id="frequency">Compounding</InputLabel><Select labelId="frequency" label="Compounding" value={frequency} onChange={(e) => setFrequency(e.target.value as Frequency)}>{(["daily", "weekly", "monthly", "annually"] as Frequency[]).map((item) => <MenuItem key={item} value={item}>{item[0].toUpperCase() + item.slice(1)}</MenuItem>)}</Select></FormControl>
        <TextField label="Token price (USD, optional)" type="number" value={tokenPrice} onChange={(e) => setTokenPrice(e.target.value)} inputProps={{ min: 0, step: "any" }}/>
        <Button type="submit" variant="contained" size="large" disabled={status === "loading"} sx={{ bgcolor: "#00b4c9", fontWeight: 800, minHeight: 48, "&:hover": { bgcolor: "#0099ab" } }}>{status === "loading" ? <><CircularProgress size={20} color="inherit" sx={{ mr: 1 }}/>Calculating…</> : "Calculate rewards"}</Button>
        {status === "error" && <Alert severity="error" sx={{ gridColumn: "1 / -1" }}>{error}</Alert>}
      </Box>
      <Box sx={{ bgcolor: "#f6f9f9", borderRadius: 2.5, p: { xs: 2, sm: 3 }, minHeight: 320, display: "flex", flexDirection: "column", justifyContent: result ? "flex-start" : "center" }} aria-live="polite">
        {!result && status !== "loading" && <Box sx={{ textAlign: "center", color: "text.secondary" }}><TrendingUpRoundedIcon sx={{ fontSize: 48, color: "#9cb4b8" }}/><Typography variant="h6" color="text.primary" fontWeight={700}>Your projection will appear here</Typography><Typography>Adjust the inputs and calculate to see growth over time.</Typography></Box>}
        {status === "loading" && <Box sx={{ textAlign: "center" }}><CircularProgress sx={{ color: "#00b4c9" }}/><Typography sx={{ mt: 2 }} color="text.secondary">Building your projection…</Typography></Box>}
        {result && status === "success" && <><Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 1.5, mb: 3 }}>{[{ label: "Final balance", value: `${formatNumber(result.finalBalance)} tokens` }, { label: "Rewards earned", value: `+${formatNumber(result.totalRewards)} tokens` }, { label: "Final USD value", value: result.finalValueUsd == null ? "Add token price" : `$${formatNumber(result.finalValueUsd)}` }].map((item) => <Box key={item.label} sx={{ bgcolor: "white", border: "1px solid #e2ebec", borderRadius: 2, p: 1.5 }}><Typography variant="caption" color="text.secondary">{item.label}</Typography><Typography fontWeight={800} sx={{ mt: .4 }}>{item.value}</Typography></Box>)}</Box><GrowthChart data={result.timeSeries}/></>}
      </Box>
    </Box>
  </Paper>;
};

export default StakingCalculator;
