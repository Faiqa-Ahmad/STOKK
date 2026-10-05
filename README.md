# DeFi Dashboard — Staking Rewards Calculator

The dashboard includes a responsive staking calculator powered by a dedicated Express API. It returns compound rewards, optional USD value, and a monthly series for the interactive chart.

## Run locally

Requires Node.js 18+ and npm 9+.

```bash
npm install
npm start
```

The dashboard is at `http://localhost:3000/dashboard`. Express listens on port `5025`; the development client proxies `/api` requests to it.

## Tests and build

```bash
npm test -- --watchAll=false
npm run lint
npm run build
```

## API

`POST /api/calculate-rewards`

```json
{
  "principal": 1000,
  "apy": 8,
  "durationYears": 1.5,
  "compoundingFrequency": "monthly",
  "tokenPrice": 2.5
}
```

The endpoint returns `finalBalance`, `totalRewards`, optional `finalValueUsd`, and `timeSeries`. Invalid input returns HTTP 400 with field-level details. Unexpected errors use a global HTTP 500 handler.

## Architecture

- `src/components/staking-calculator/` owns the widget, UI state, API call, and dependency-free SVG chart.
- `server/routes/api/rewards.js` defines the HTTP boundary.
- `server/middleware/validateRewards.js` validates and bounds untrusted inputs.
- `server/controllers/rewardsController.js` translates HTTP requests into service calls.
- `server/services/rewardsService.js` contains the deterministic mathematical core and no Express concerns.

This keeps rendering, transport, validation, and calculation independently testable. The server is authoritative so calculations remain consistent across clients.

## Formula and complexity

The service uses `A = P × (1 + r / n)^(n × t)`, where APY is converted from a percentage to a decimal and `n` represents the selected frequency.

A final-balance calculation is **O(1)** time and **O(1)** space. Generating `m` monthly chart points is **O(m)** time and **O(m)** space. Monthly points keep payloads bounded while ending at the exact requested fractional duration.

## Edge cases

- Zero APY returns the principal with zero rewards.
- Fractional years and durations entered in days are supported.
- Principal and duration must be positive; APY and token price may be zero.
- Numeric inputs must be finite and remain within documented server bounds.
