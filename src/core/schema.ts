import { z } from "zod";

export const addressSchema = z.object({
  name: z.string().optional(),
  street1: z.string(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string(),
});

export const packageSchema = z.object({
  weight: z.number().positive(),
  length: z.number().positive(),
  width: z.number().positive(),
  height: z.number().positive(),
});

export const rateRequestSchema = z.object({
  origin: addressSchema,
  destination: addressSchema,
  packages: z.array(packageSchema).min(1),
  serviceCode: z.string().optional(),
});

export const rateQuoteSchema = z.object({
  carrier: z.string(),
  service: z.string(),
  amount: z.number(),
  currency: z.string(),
  estimatedDays: z.number().optional(),
});