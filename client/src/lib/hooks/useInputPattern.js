const useInputPattern = () => {
  const handleNumber = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };

  const handleNumberAndComma = (e) => {
    e.target.value = e.target.value.replace(/[^0-9,]/g, "");
  };

  const handleAlphabeticInput = (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z]/g, "");
  };

  const handlePhoneNumberInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9+\-]/g, "");
  };
  // e.target.value
  const handleAmount = async (e) => {
    const input = e.target.value.replace(/[^0-9,]/g, "");
    const numericValue =
      input.trim() === ""
        ? ""
        : input.includes(",")
        ? parseFloat(input.replace(/,/g, ""))
        : parseInt(input, 10);
    const spaceAmount = numericValue
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    let result = "";
    let digitCount = 0;

    for (let i = 0; i < spaceAmount.length; i++) {
      const char = spaceAmount[i];

      if (char.match(/\d/)) {
        digitCount++;
        result += char;
      } else if ((char.match(/\s/) && digitCount === 1) || digitCount === 2) {
        result += ",";
      } else {
        digitCount = 0;
        result += char;
      }
    }
    e.target.value = result;
  };

  return {
    handleNumber,
    handleNumberAndComma,
    handleAlphabeticInput,
    handlePhoneNumberInput,
    handleAmount,
  };
};

export default useInputPattern;
