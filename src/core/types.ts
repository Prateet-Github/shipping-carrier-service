export type Address = {
  name?: string;
  street1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type Package = {
  weight: number; // in kg
  length: number;
  width: number;
  height: number;
};

export type RateRequest = {
  origin: Address;
  destination: Address;
  packages: Package[];
  serviceCode?: string;
};

export type RateQuote = {
  carrier: string;
  service: string;
  amount: number;
  currency: string;
  estimatedDays?: number;
};