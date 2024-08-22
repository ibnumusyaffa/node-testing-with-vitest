// discountCalculator.js
const DISCOUNT_PERCENTAGE = 20;
const DISCOUNT_START_HOUR = 21; // 9 PM UTC
const DISCOUNT_END_HOUR = 23;   // 11 PM UTC

export function calculateDiscount(price) {
  const currentTime = new Date();
  const currentHourUTC = currentTime.getUTCHours();
  
  if (currentHourUTC >= DISCOUNT_START_HOUR && currentHourUTC < DISCOUNT_END_HOUR) {
    return price - (price * DISCOUNT_PERCENTAGE / 100);
  }
  return price;
}
