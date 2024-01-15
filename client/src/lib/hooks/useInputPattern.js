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

  const handleAmount = async (e) => {
    const input = e.target.value.replace(/[^0-9,]/g, "");
    const numericValue =
      input.trim() === ""
        ? ""
        : input.includes(",")
        ? parseFloat(input.replace(/,/g, ""))
        : parseInt(input, 10);
    e.target.value = numericValue
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ", ");
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
