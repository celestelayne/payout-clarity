import type {
  Booking,
  Merchandising,
  NightlyRate,
} from '../features/booking-detail/booking-detail.types';

/**
 * HYPOTHETICAL SCENARIO
 *
 * This fixture exists only to test how the nightly-rate experience
 * behaves for a 45-night stay.
 *
 * It does not represent Evolve's actual long-stay pricing,
 * tax, or payout policies.
 */

type Period = {
  start: string;
  nights: number;
  baseRate: number;
  promotion?: {
    id: string;
    name: string;
    description: string;
    percent: number;
  };
};

const addDays = (iso: string, days: number): string => {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

const round2 = (n: number) => Math.round(n * 100) / 100;

const datesForPeriod = (p: Period): string[] =>
  Array.from({ length: p.nights }, (_, i) => addDays(p.start, i));

const nightsForPeriod = (p: Period): NightlyRate[] =>
  datesForPeriod(p).map((date) => {
    if (!p.promotion) {
      return { date, baseRate: p.baseRate, adjustments: [], bookedRate: p.baseRate };
    }
    const amount = round2(p.baseRate * (p.promotion.percent / 100));
    return {
      date,
      baseRate: p.baseRate,
      adjustments: [
        {
          type: 'promotion',
          name: p.promotion.name,
          percent: p.promotion.percent,
          amount,
        },
      ],
      bookedRate: round2(p.baseRate + amount),
    };
  });

const fortyFiveNightPeriods: Period[] = [
  { start: '2026-06-15', nights: 16, baseRate: 120 },
  { start: '2026-07-01', nights: 6, baseRate: 155 },
  {
    start: '2026-07-07',
    nights: 14,
    baseRate: 130,
    promotion: {
      id: 'promo_midsummer_10',
      name: 'Mid-summer promotion',
      description: '10% off select nights',
      percent: -10,
    },
  },
  { start: '2026-07-21', nights: 9, baseRate: 118 },
];

const fortyFiveNightRates: NightlyRate[] =
  fortyFiveNightPeriods.flatMap(nightsForPeriod);

const fortyFiveNightMerchandising: Merchandising[] =
  fortyFiveNightPeriods.flatMap((p) =>
    p.promotion
      ? [
          {
            id: p.promotion.id,
            type: 'promotion',
            name: p.promotion.name,
            description: p.promotion.description,
            appliesTo: datesForPeriod(p),
          },
        ]
      : [],
  );

export const fortyFiveNightStay: Booking = {
  scenario: {
    source: "synthetic",
    purpose: "long-stay-boundary-test",
  },
  id: 'hyp-45n-001',
  status: 'booked',
  bookingSite: 'Airbnb',
  guest: {
    name: 'Priya Ramaswamy',
    email: null,
    phone: '+1 555-704-2210',
  },
  stay: {
    checkIn: '2026-06-15',
    checkOut: '2026-07-30',
    nights: 45,
    adults: 2,
    children: 0,
    infants: 0,
    pets: false,
  },
  dateBooked: '2026-04-02',
  lineItems: [
    { description: 'Rate for 45 Nights', amount: 5550, type: 'base' },
    { description: 'Cleaning Fee', amount: 140, type: 'fee' },
    { description: 'Texas State Hotel Occupancy Tax', amount: 341.4, type: 'tax' },
    { description: 'City of Austin Hotel Occupancy Tax', amount: 512.1, type: 'tax' },
    { description: 'Travis County Venue Project Tax', amount: 113.8, type: 'tax' },
  ],
  nightlyRates: fortyFiveNightRates,
  merchandising: fortyFiveNightMerchandising,
  payout: {
    amount: 4857.5,
    managementFee: 832.5,
    status: 'scheduled',
    expectedDepositDate: '2026-06-22',
    depositedDate: null,
  },
  returningGuest: false,
};
