export const DEFAULT_RETURN_VALUE = "---";
export const OBJECT_WILD_CARD_KEY = ""; // returns the whole object

export const accessObjectProperty = (object, key) => {
  if (key === OBJECT_WILD_CARD_KEY) return object;

  let result;
  if (typeof key === "object") {
    const convertedSource = key.map((src) =>
      src.split(".").reduce((o, i) => o[i], object)
    );
    return convertedSource.join(" ");
  }
  try {
    result = key.split(".").reduce((o, i) => o[i], object);
  } catch (error) {}
  if (result !== 0 && !result) return DEFAULT_RETURN_VALUE;
  return result;
};

export const dndReorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
