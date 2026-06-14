export const formatPrice = price =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
    price
  );

export const truncate = (str, n) =>
  str?.length > n ? str.slice(0, n) + '…' : str;

export const calcDiscount = (price, discountPct) =>
  +(price - (price * discountPct) / 100).toFixed(2);

export const ratingStars = rating => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return { full, half, empty };
};
