export type ReservationStatus =
  | 'blocked'
  | 'booked'
  | 'checked_in'
  | 'checked_out'
  | 'canceled';

export type PayoutStatus = 'paid' | 'pending' | 'scheduled' | 'canceled';

export type LineItem = {
  description: string;
  amount: number;
  type: 'base' | 'fee' | 'tax';
};

export type Adjustment = {
  type: string;
  name: string;
  percent: number;
  amount: number;
};

export type NightlyRate = {
  date: string;
  baseRate: number;
  adjustments: Adjustment[];
  bookedRate: number;
};

export type Merchandising = {
  id: string;
  type: string;
  name: string;
  description: string;
  appliesTo: string[];
};

export type Guest = {
  name: string;
  email: string | null;
  phone: string | null;
};

export type Stay = {
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number | null;
  children: number | null;
  infants: number | null;
  pets: boolean | null;
};

export type Payout = {
  amount: number;
  managementFee: number;
  status: PayoutStatus;
  expectedDepositDate: string;
  depositedDate: string | null;
};

export type Booking = {
  id: string;
  scenario?: {
    source: string;
    purpose?: string;
  };
  status: ReservationStatus;
  bookingSite: string | null;
  guest: Guest | null;
  stay: Stay;
  dateBooked: string;
  lineItems: LineItem[];
  nightlyRates?: NightlyRate[];
  merchandising?: Merchandising[];
  payout: Payout | null;
  returningGuest: boolean;
};
