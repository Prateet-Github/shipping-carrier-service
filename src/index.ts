import { UPSCarrier } from "./carriers/ups.carrier";

async function main() {
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
      {
        weight: 1,
        length: 10,
        width: 10,
        height: 10,
      },
    ],
  });

  console.log(rates);
}

main();