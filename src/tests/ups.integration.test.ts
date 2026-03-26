import { describe, it, expect } from "vitest";
import { UPSCarrier } from "../carriers/ups.carrier";

describe("UPS Carrier Integration", () => { 
  it("should return normalized rate quotes", async () => {
    const carrier = new UPSCarrier();

    const rates = await carrier.getRates({
      origin: {
        city: "Delhi",
        state: "DL",
        postalCode: "110001",
        country: "IN",
        street1: "Connaught Place",
      },
      destination: {
        city: "Mumbai",
        state: "MH",
        postalCode: "400001",
        country: "IN",
        street1: "Bandra",
      },
      packages: [
        { weight: 1, length: 10, width: 10, height: 10 },
      ],
    });

    expect(rates.length).toBeGreaterThan(0);
  });

  it("should throw error for invalid input", async () => {
    const carrier = new UPSCarrier();

    await expect(
      carrier.getRates({
        origin: {} as any,
        destination: {} as any,
        packages: [],
      })
    ).rejects.toThrow("Invalid rate request");
  });

  it("should handle invalid UPS response", async () => {
    const carrier = new UPSCarrier();

    // @ts-ignore
    carrier.callUPSApi = async () => ({});

    await expect(
      carrier.getRates({
        origin: {
          city: "Delhi",
          state: "DL",
          postalCode: "110001",
          country: "IN",
          street1: "Connaught Place",
        },
        destination: {
          city: "Mumbai",
          state: "MH",
          postalCode: "400001",
          country: "IN",
          street1: "Bandra",
        },
        packages: [
          { weight: 1, length: 10, width: 10, height: 10 },
        ],
      })
    ).rejects.toThrow("Invalid UPS response format");
  });

});