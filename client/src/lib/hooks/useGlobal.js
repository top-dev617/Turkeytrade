const useGlobal = () => {
  const firstLatterUp = (input) => {
    return input.charAt(0).toUpperCase() + input.slice(1);
  };

  return {
    firstLatterUp,
  };
};

export default useGlobal;
