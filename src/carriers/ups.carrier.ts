import { Carrier } from "../core/carrier.interface";
import { RateRequest, RateQuote } from "../core/types";
import { getUPSToken } from "./ups.auth";
import { rateRequestSchema } from "./../core/schema";
import { AppError } from "./../utils/error";

export class UPSCarrier implements Carrier {
async getRates(request: RateRequest): Promise<RateQuote[]> {
  const parsed = rateRequestSchema.safeParse(request);

  if (!parsed.success) {
    throw new AppError("Invalid rate request", 400, parsed.error.flatten());
  }

  try {
    const token = await getUPSToken();

    const upsPayload = this.buildRequest(parsed.data);

    const upsResponse = await this.callUPSApi(upsPayload, token);

    return this.parseResponse(upsResponse);
  } catch (error: any) {
    throw new AppError("UPS rate fetch failed", 500, error);
  }
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
  const shipments = response?.RateResponse?.RatedShipment;

  if (!shipments || !Array.isArray(shipments)) {
    throw new AppError("Invalid UPS response format", 502, response);
  }

  return shipments.map((s: any) => ({
    carrier: "UPS",
    service: s?.Service?.Code || "UNKNOWN",
    amount: Number(s?.TotalCharges?.MonetaryValue || 0),
    currency: s?.TotalCharges?.CurrencyCode || "USD",
  }));
}
}