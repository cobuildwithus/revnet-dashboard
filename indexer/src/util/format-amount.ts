export function formatAmount(amount: bigint, decimals: number): string {
  const value = Number(amount) / 10 ** decimals;

  return Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: getDecimalPlaces(value),
  }).format(value);
}

function getDecimalPlaces(value: number): number {
  if (value >= 1000) return 2;
  if (value >= 100) return 3;
  if (value >= 10) return 4;
  if (value >= 1) return 4;
  if (value >= 0.1) return 5;
  if (value >= 0.01) return 6;
  return 8;
}
