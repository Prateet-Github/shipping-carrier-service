import { Carrier } from "../core/carrier.interface";
import { RateRequest, RateQuote } from "../core/types";
import { getUPSToken } from "./ups.auth";

export class UPSCarrier implements Carrier {
  async getRates(request: RateRequest): Promise<RateQuote[]> {
  const token = await getUPSToken();

  const upsPayload = this.buildRequest(request);

  const upsResponse = await this.callUPSApi(upsPayload, token);

  return this.parseResponse(upsResponse);
}

  private buildRequest(request: RateRequest) {
    // TODO: map internal request to UPS format
    return {
      // mapping logic here
      request,
    };
  }

 private async callUPSApi(payload: any, token: string) {

  return {
    RateResponse: {
      RatedShipment: [
        {
          Service: { Code: "03" },
          TotalCharges: {
            CurrencyCode: "USD",
            MonetaryValue: "12.50",
          },
        },
      ],
    },
  };
}

  private parseResponse(response: any): RateQuote[] {
    const shipments = response?.RateResponse?.RatedShipment || [];

    return shipments.map((s: any) => ({
      carrier: "UPS",
      service: s.Service.Code,
      amount: Number(s.TotalCharges.MonetaryValue),
      currency: s.TotalCharges.CurrencyCode,
    }));
  }
}