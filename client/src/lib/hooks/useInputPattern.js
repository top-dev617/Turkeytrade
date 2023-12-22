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

  return {
    handleNumber,
    handleNumberAndComma,
    handleAlphabeticInput,
    handlePhoneNumberInput,
  };
};

export default useInputPattern;
