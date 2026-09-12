## Understand the problem

> At what point does a longer stay change the owner’s job from confirming a payout to investigating/reconciling it—and what information do they need when that happens?

As I mentioned, I don't want the Accomodation Details section to read like a ledger, "because a lot of people are turned off by seeing lots of numbers coming at them." However, its come to my attention that *a midterm rental offering…over 28 days but less than a year* is a possibility.

## Key Decisions

Let the length pick the default — the owner can switch density at any stay length, and the choice persists.

| Stay length | Density | Behavior | Task |
|---|---|---|---|
| 1–7 nights | Glance | Collapsed summary; expand to a flat list of nights. Today's behavior, unchanged | Confirm |
| 8–27 nights | Scan | Group by calendar week. A month or less still maps to how someone pictures a month | Locate |
| 28+ nights · midterm | Reconcile | Group by rate period. Calendar weeks stop meaning anything; what changed does | Audit |

One option is to *chunk by what is the promotion* while another option is to *group nights into contiguous runs that share the same base rate and the same set of adjustments;* breaking the nightly run wherever either case changes.

## The Escape Hatch

Owners who require audit level detail often "create their own accounting version of what the Accomodation Details section is showing them." Allow these owners to verify the details by providing them with a _View as ledger_ toggle that flattens to every night, plus CSV and print. 

## What can break at 45-nights

1. If the 45-night stay pays out in installments rather than one deposit after checkout, then `PayoutSummary` component needs a redesign.
2. Some jurisdictions exempt stays past 30 days from transient occupancy tax.
3. Long-stays get extended, shortened and re-rated, so nightly rates need provenance — e.g. booked, modified, cancelled.
4. For long-stays, the owner may want elapsed against remaining time on the booking vs _Currently checked-in_ and earned-so-far against projected.

## Dataset Assumptions

### Fixture: Booking (synthetic, hypothetical)

 - Status: booked · Site: Airbnb · Guest: Priya Ramaswamy · Party: 2 adults
 - Stay: 2026-06-15 → 2026-07-30 · 45 nights
 - Date booked: 2026-04-02
 - Listing unchanged (South Congress Loft; 15% mgmt fee; $140 cleaning; taxes 6% / 9% / 2% on base+cleaning)

### Merchandising
  - `promo_midsummer_10` — "Mid-summer promotion", 10% off select nights. appliesTo: the 14 dates in Period C (Jul 7 – Jul 20). Same shape as the existing "Spring promotion" merchandising on the hero booking — no new promotion mechanics invented.

## AI Workflow

<!-- Add after completing the workflow. -->
| Phase         | Human | AI    | Output|
| :------------ | :---  | :---  | :---  |
| 1. Re-Understand | Define what the 45-night question is actually testing | Audit the existing solution + dataset; identify what breaks as stay length/pricing complexity increases | Boundary hypothesis 
| 2. Create scenarios | Decide which hypotheticals are useful and credible | Generate controlled 6-, ~21-, and 45-night fixtures while preserving financial invariants | Scenario set 
| 3. Explore representations | Judge which representation best supports the owner’s task | Generate rough variants: flat nights, calendar grouping, rate periods, progressive disclosure | Competing prototypes 
| 4. Pick up the pen | Make the first product decision and direct the prototype | Scaffold only the chosen experiment in Statement.tsx; reuse existing components and create bounded additions | Working boundary prototype
| 5. Break it | Inspect where the interaction stops helping | Generate pathological cases and test reconciliation/math/accessibility | Evidence + revisions
| 6. Package the learning | Decide what you now believe and what remains unknown | Help summarize findings, assumptions, rejected ideas, and unresolved business questions | Update case study 