const db = require("./connection");

const getState = async (state) => {
  if (state.includes(" ")) state = state.replace(/ /g, "");
  try {
    const [state_info] = await db("US_STATES")
      .whereLike("state_code", state)
      .orWhereRaw("replace(state_name, ' ', '') LIKE ?", state)
      .select("id", "state_name");

    return state_info || false;
  } catch (err) {
    console.log(err);
    return { ERROR: "Error retrieving STATE location from database" };
  }
};

const getCity = async (city, stateID) => {
  if (city.includes(" ")) city = city.replace(/ /g, "");

  try {
    const [city_info] = await db("US_CITIES")
      .whereRaw("replace(city, ' ', '') LIKE ?", city)
      .andWhere({ id_state: stateID })
      .select("LONGITUDE", "LATITUDE", "CITY", "COUNTY");

    return city_info || false;
  } catch (err) {
    console.log(err);
    return { ERROR: "Error retrieving CITY location from database" };
  }
};

const getCoords = async (city, state) => {
  const coords = {};
  coords.state = await getState(state);
  if (!coords.state) return { ERROR: "State not found!" };
  coords.city = await getCity(city, coords.state.ID);
  if (!coords.city) return { ERROR: "City not found!" };
  return { STATE_NAME: coords.state.STATE_NAME, ...coords.city };
};

module.exports = { getCoords };
