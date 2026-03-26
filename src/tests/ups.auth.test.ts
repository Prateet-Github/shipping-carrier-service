import { describe, it, expect } from "vitest";
import { getUPSToken } from "../carriers/ups.auth";

describe("UPS Auth", () => {
  it("should reuse token if not expired", async () => {
    const token1 = await getUPSToken();
    const token2 = await getUPSToken();

    expect(token1).toBe(token2);
  });
});