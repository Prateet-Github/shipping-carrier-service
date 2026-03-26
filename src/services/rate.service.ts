import { Carrier } from "../core/carrier.interface";
import { RateRequest, RateQuote } from "../core/types";

export class RateService {
  constructor(private carrier: Carrier) {}

  async getRates(request: RateRequest): Promise<RateQuote[]> {
    return this.carrier.getRates(request);
  }
}