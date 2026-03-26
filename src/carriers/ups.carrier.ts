import { Carrier } from "../core/carrier.interface";
import { RateRequest, RateQuote } from "../core/types";

export class UPSCarrier implements Carrier {
  async getRates(request: RateRequest): Promise<RateQuote[]> {
    // build UPS request payload
    const upsPayload = this.buildRequest(request);

    // call UPS API (mocked)
    const upsResponse = await this.mockApiCall(upsPayload);

    // normalize response
    return this.parseResponse(upsResponse);
  }

  private buildRequest(request: RateRequest) {
    // TODO: map internal request to UPS format
    return {
      // mapping logic here
      request,
    };
  }

  private async mockApiCall(payload: any) {
    // simulate API response 
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
          {
            Service: { Code: "02" },
            TotalCharges: {
              CurrencyCode: "USD",
              MonetaryValue: "25.00",
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