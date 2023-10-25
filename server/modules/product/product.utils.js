export function catchProductQuery(data, keys) {
  const result = {};
  for (const key of keys) {
    if (data.hasOwnProperty(key)) {
      result[key] = [key];
    }
  }
  return result;
}

export const findMinMaxPrice = async (pricesArray) => {
  if (!Array.isArray(pricesArray) || pricesArray.length === 0) {
    return "";
  }
  let minPrice = parseInt(pricesArray[0].euro);
  let maxPrice = parseInt(pricesArray[0].euro);
  for (let i = 1; i < pricesArray.length; i++) {
    const currentPrice = parseInt(pricesArray[i].euro);
    if (currentPrice < minPrice) {
      minPrice = currentPrice;
    }
    if (currentPrice > maxPrice) {
      maxPrice = currentPrice;
    }
  }
  return {
    minPrice: minPrice,
    maxPrice: maxPrice,
  };
};
