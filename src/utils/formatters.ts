export const formatPrice = (
  amount: number,
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY' = 'USD'
): string => {
  const rates: Record<string, { rate: number; symbol: string }> = {
    USD: { rate: 1, symbol: '$' },
    EUR: { rate: 0.92, symbol: '€' },
    GBP: { rate: 0.78, symbol: '£' },
    JPY: { rate: 154, symbol: '¥' },
  };

  const curr = rates[currency] || rates.USD;
  const converted = amount * curr.rate;

  if (currency === 'JPY') {
    return `${curr.symbol}${Math.round(converted).toLocaleString()}`;
  }

  return `${curr.symbol}${converted.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

export const generateOrderNumber = (): string => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let rand = '';
  for (let i = 0; i < 6; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `VA-${new Date().getFullYear()}-${rand}`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

