import { RateRequest, RateQuote } from "./types";

export interface Carrier {
  getRates(request: RateRequest): Promise<RateQuote[]>;
}