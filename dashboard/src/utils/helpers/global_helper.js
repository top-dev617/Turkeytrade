export const findMinMaxEuro = async (pricesArray) => {
  console.log(pricesArray);
  if (!Array.isArray(pricesArray) || pricesArray.length === 0) {
    return "";
  }
  let minEuro = parseInt(pricesArray[0].euro);
  let maxEuro = parseInt(pricesArray[0].euro);
  for (let i = 1; i < pricesArray.length; i++) {
    const currentEuro = parseInt(pricesArray[i].euro);
    if (currentEuro < minEuro) {
      minEuro = currentEuro;
    }
    if (currentEuro > maxEuro) {
      maxEuro = currentEuro;
    }
  }
  return `${minEuro} - ${maxEuro}` || "";
};
