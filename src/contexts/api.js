export const getLevelData = async (endpointToGetData) => {
  try {
    const response = await fetch(endpointToGetData);
    if (!response.ok || response.status !== 200) {
      throw new Error("Failed to fetch data!");
    }
    return await response.json();
  } catch (err) {
    console.log(err.message);
  }
};
