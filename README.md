# Payout Clarity Prototype

A booking-detail screen for short-term-rental owners. It answers one question — *what am I being paid, and why is it less than what the guest paid?* — and holds its shape across the five states a payout can be in.

**[Live prototype →](https://evolve-take-home.vercel.app/)**

## Key Decisions

1. Make the payout the dominant financial answer.
2. Make the relationship between the guest total and owner payout explicit.
3. Separate confirmation from investigation by placing nightly rate details lower in the hierarchy.
4. Only explain what the data actually supports

## Dataset Assumptions

#### Provided data:
```typescript
{
  "description": "Rate for 6 Nights",
  "amount": 732.14,
  "type": "base"
}
```
The provided dataset includes an aggregate base rate for each stay, but does not include individual nightly rates or merchandising/discount details. Because the exercise asks owners to understand what rates were booked and why, I extended the selected booking with synthetic `nightlyRates` and `merchandising` data to support that experience. 

**Note:** These additions are just examples. The original booking and payout numbers haven't changed, and the nightly rates still add up to the original total.

#### Proposed data:
```typescript
    {
      "nightlyRates": [
        {
            "date": "2026-05-16",
            "listedRate": 165.00,
            "adjustments": [
                {
                    "type": "promotion",
                    "name": "Spring promotion",
                    "amount": -16.50
                }
            ],
            "bookedRate": 148.50
        },
        ...
      ],
      "merchandising": [
        {
            "id": "promo_spring_10",
            "type": "promotion",
            "name": "Spring promotion",
            "description": "10% off select nights",
            "appliesTo": [
                "2026-05-16",
                "2026-05-17"
            ]
        }
      ],
    },
```
The full augmented booking is available in `src/data/payouts-dataset.json`.


## The money model

Four pots of money, one of them the owner's. The screen's job is to keep them distinguishable.

| | |
|---|---|
| Guest total | `$1,020.40` |
| Occupancy taxes | `−148.26` — collected from the guest, remitted to tax authorities |
| **Owner earnings** | `872.14` — accommodation `$732.14` + cleaning `$140.00` |
| Management fee | `−109.82` — 15% of accommodation |
| **Payout** | `$762.32` |

Both subtractions reduce the number and they are not the same kind of fact. Tax was never the owner's money; the fee was. The UI separates *guest charges*, *owner earnings* and *platform deductions* in words rather than leaving it to a minus sign.

## Payout states

`payout.status` is the source of truth. State is never derived from whether the amount is falsy, and never from comparing dates.

## Data

Fixtures only — no API, no backend.

The source dataset carried an aggregate stay rate (`$732.14` for six nights) and no per-night breakdown. Per-night rates and promotions are **synthetic**, generated to reconcile exactly to that aggregate. They are marked as added data in `src/fixtures/` rather than mixed into the original shape.

One invariant holds across every fixture:

```
sum(nightlyRates.bookedRate) === accommodationTotal
```

## Constraint

The prototype renders only what the data supports. It shows *which* promotions moved a listed rate to a booked rate; it does not explain why the listed rate was set, because nothing in the dataset says. Plausible-sounding explanations on a financial screen reduce trust rather than building it.

## AI Workflow

<!-- Add after completing the workflow. -->
| Phase         | Human | AI    | Output|
| :------------ | :---  | :---  | :---  |
| 1. Understand | Read brief/data, identify core job, choose primary scenario | Audit brief + JSON in parallel for contradictions, gaps, assumptions, edge cases | Problem framing + assumptions/constraints 
| 2. Prioritize | Rank goals and establish hierarchy | Challenge IA + progressive disclosure | Goals + IA + visibility rules 
| 3. Explore | Evaluate alternatives and choose/synthesize | Generate approaches + scaffold 3–4 rough variants | Chosen product direction 
| 4. Build | Direct implementation, inspect, adjust | Generate React/TS structure, components, states, data augmentation | Working deployed prototype
| 5. Validate + Package | Smoke-test tasks, accessibility, responsive behavior; record decisions | Code review, edge-state audit, README/video-outline assistance | Repo + README + video walkthrough 

## Project Structure
This prototype uses a feature-oriented structure, keeping booking-detail UI and business logic together while shared components and utilities remain reusable.

```markdown
src/
├── components/ <!-- Shared components go here -->
├── data/
│   └── payouts-dataset.json
├── features/
│   └── booking-detail/
│       ├── components/ <!-- Feature components go here -->
│       ├── booking-detail.types.ts
│       ├── booking-detail.utils.ts
│       └── BookingDetail.tsx
├── lib/ <!-- Shared helpers go here -->
├── App.tsx
└── index.css
```

## Not built

- Multi-property or portfolio views — the data models one owner and one listing
- Cancellation accounting — the outcome is present, the policy behind it isn't
- The long-stay (45-night) view — designed, [written up here](#), not yet built

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Stack

React · TypeScript · Vite · Tailwind · deployed on Vercel