/** @format */
import getCookieValue from "../../scripts/getCookieValue";

const searchByPatient = async (patientName) => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/visit/get-vet-visits-by-patient/" +
        getCookieValue("user_id") +
        "/" +
        patientName
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

export default searchByPatient;
