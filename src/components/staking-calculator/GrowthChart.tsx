import React, { useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import { GrowthPoint } from "./types";

const WIDTH = 680, HEIGHT = 230, PADDING = 28;

const GrowthChart = ({ data }: { data: GrowthPoint[] }) => {
  const [activeIndex, setActiveIndex] = useState(data.length - 1);
  const { points, area } = useMemo(() => {
    const balances = data.map((point) => point.balance);
    const min = Math.min(...balances), max = Math.max(...balances), range = max - min || 1;
    const coordinates = data.map((point, index) => ({
      x: PADDING + (index / Math.max(data.length - 1, 1)) * (WIDTH - PADDING * 2),
      y: HEIGHT - PADDING - ((point.balance - min) / range) * (HEIGHT - PADDING * 2),
    }));
    return { points: coordinates, area: `${PADDING},${HEIGHT - PADDING} ${coordinates.map(({ x, y }) => `${x},${y}`).join(" ")} ${WIDTH - PADDING},${HEIGHT - PADDING}` };
  }, [data]);
  const active = data[activeIndex] || data[data.length - 1], marker = points[activeIndex] || points[points.length - 1];

  return <Box aria-label="Projected staking balance chart" role="img">
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1, gap: 2 }}>
      <Typography variant="subtitle2" fontWeight={700}>Projected growth</Typography>
      <Typography variant="body2" color="text.secondary">Year {active.years.toFixed(2)} · {active.balance.toLocaleString(undefined, { maximumFractionDigits: 4 })} tokens</Typography>
    </Box>
    <Box sx={{ width: "100%", overflow: "hidden" }}><svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width="100%" onMouseLeave={() => setActiveIndex(data.length - 1)}>
      <defs><linearGradient id="staking-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00b4c9" stopOpacity=".4"/><stop offset="100%" stopColor="#00b4c9" stopOpacity=".03"/></linearGradient></defs>
      <line x1={PADDING} x2={WIDTH - PADDING} y1={HEIGHT - PADDING} y2={HEIGHT - PADDING} stroke="#d9e4e6"/>
      <polygon points={area} fill="url(#staking-area)"/>
      <polyline points={points.map(({ x, y }) => `${x},${y}`).join(" ")} fill="none" stroke="#00a8bd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      {marker && <circle cx={marker.x} cy={marker.y} r="6" fill="#173039" stroke="#fff" strokeWidth="3"/>}
      {points.map(({ x }, index) => <rect key={index} x={x - (WIDTH / data.length) / 2} y="0" width={WIDTH / data.length} height={HEIGHT} fill="transparent" onMouseEnter={() => setActiveIndex(index)}/>)}
    </svg></Box>
  </Box>;
};

export default GrowthChart;
