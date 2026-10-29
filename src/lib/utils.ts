// Class names ko merge karne ke liye helper
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ").trim();
}

// Numbers ko comma format mein convert karna (jaise 18,450)
export function formatNumber(val: number): string {
  return new Intl.NumberFormat().format(val);
}

// Date string format karna
export function formatDate(dateString: string): string {
  return dateString;
}
