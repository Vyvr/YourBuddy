/** @format */
import getCookieValue from "../../scripts/getCookieValue";

const searchByOwner = async (ownerName) => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/visit/get-vet-visits-by-owner/" +
        getCookieValue("user_id") +
        "/" +
        ownerName
    );
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }

    if (responseData.visits.length !== 0) {
      const searchedVisits = responseData.visits;
      return searchedVisits;
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export default searchByOwner;
