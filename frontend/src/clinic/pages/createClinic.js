/** @format */

import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import VetContent from "./../../shared/components/content/VetContent";
import CreateForm from "../../shared/components/forms/createForm";

import getCookieValue from "../../scripts/getCookieValue";

const ClinicDashboard = () => {
  const { register, handleSubmit } = useForm();

  const createClinicSubmitHandler = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/clinic/create-clinic",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            owner: getCookieValue("user_id"),
            country: data.country,
            city: data.city,
            street: data.street,
            block: data.block,
            apartment: data.apartment,
            zipCode: data.zipCode,
            fromHour: data.fromHour,
            fromMinutes: data.fromMinutes,
            toHour: data.toHour,
            toMinutes: data.toMinutes,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      history.push("/vet/clinic-dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const history = useHistory();

  return (
    <VetContent>
      <CreateForm>
        <div>
          <div>
            <label>Name:</label>
          </div>
          <div>
            <input className="name-input" {...register("name")} />
          </div>
        </div>

        <div>
          <div>
            <label>Country:</label>
          </div>
          <div>
            <input className="country-input" {...register("country")} />
          </div>
        </div>

        <div>
          <div>
            <label>City:</label>
          </div>
          <div>
            <input className="city-input" {...register("city")} />
          </div>
        </div>

        <div>
          <div>
            <label>Street:</label>
          </div>
          <div>
            <input className="street-input" {...register("street")} />
          </div>
        </div>

        <div>
          <div>
            <label>Block:</label>
          </div>
          <div>
            <input className="Block-input" {...register("block")} />
          </div>
        </div>

        <div>
          <div>
            <label>Apartment:</label>
          </div>
          <div>
            <input className="apartment-input" {...register("apartment")} />
          </div>
        </div>

        <div>
          <div>
            <label>ZipCode:</label>
          </div>
          <div>
            <input className="zip-code-input" {...register("zipCode")} />
          </div>
        </div>

        <div className="hours-wrapper">
          <div className="from-hours-div">
            <div>
              <div>
                <label>Open from:</label>
              </div>
              <div>
                <div>
                  <label>Hour:</label>
                </div>
                <div>
                  <input
                    className="from-hour-input"
                    {...register("fromHour")}
                  />
                </div>
              </div>
              <div>
                <div>
                  <label>Minutes:</label>
                </div>
                <div>
                  <input
                    className="from-minutes-input"
                    {...register("fromMinutes")}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="to-hours-div">
            <div>
              <div>
                <label>Open to:</label>
              </div>
              <div>
                <div>
                  <label>Hour:</label>
                </div>
                <div>
                  <input className="to-hour-input" {...register("toHour")} />
                </div>
              </div>
              <div>
                <div>
                  <label>Minutes:</label>
                </div>
                <div>
                  <input
                    className="to-minutes-input"
                    {...register("toMinutes")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="button-div">
          <button
            type="submit"
            onClick={handleSubmit(createClinicSubmitHandler)}
          >
            Create clinic
          </button>
        </div>
      </CreateForm>
    </VetContent>
  );
};

export default ClinicDashboard;
