import { units } from "../datas/unites";

export const getPluralUnit = (payload) => {
  const getUnit = units.find((unit) => unit.singular === payload);
  return getUnit.plural || null;
};
