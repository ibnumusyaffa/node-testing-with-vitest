import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { calculateDiscount } from "./discount.js"

describe("calculateDiscount", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("applies 20% discount at 9:00 PM UTC", () => {
    vi.setSystemTime(new Date("2023-01-01T21:00:00Z"))
    expect(calculateDiscount(100)).toBe(80)
  })

  it("applies 20% discount at 10:30 PM UTC", () => {
    vi.setSystemTime(new Date("2023-01-01T22:30:00Z"))
    expect(calculateDiscount(100)).toBe(80)
  })

  it("applies 20% discount at 10:59:59 PM UTC", () => {
    vi.setSystemTime(new Date("2023-01-01T22:59:59Z"))

    expect(calculateDiscount(100)).toBe(80)
  })

  it("does not apply discount at 8:59:59 PM UTC", () => {
    vi.setSystemTime(new Date("2023-01-01T20:59:59Z"))

    expect(calculateDiscount(100)).toBe(100)
  })

  it("does not apply discount at 11:00:00 PM UTC", () => {
    vi.setSystemTime(new Date("2023-01-01T23:00:00Z"))

    expect(calculateDiscount(100)).toBe(100)
  })
})
