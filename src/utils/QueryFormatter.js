function formatQuery(filter = {}) {
  const parsedFilter =
    typeof filter === "string"
      ? filter
        ? JSON.parse(filter)
        : {}
      : filter;

  if (
    parsedFilter === null ||
    typeof parsedFilter !== "object" ||
    Array.isArray(parsedFilter)
  ) {
    throw new TypeError("Product filters must be an object or JSON object string.");
  }

  return Object.fromEntries(
    Object.entries(parsedFilter).filter(
      ([, value]) =>
        value !== undefined &&
        value !== null &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0),
    ),
  );
}

export default formatQuery;