import React, { useCallback, useState } from "react";
//bootstrap import
import { Form, Button } from "react-bootstrap";
//redux import
import { RootStateOrAny } from "react-redux";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getListCountries } from "../app/slices/countries";
//icons components
import { MdSearch, MdError } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { GiModernCity } from "react-icons/gi";
import { FaMapMarkedAlt } from "react-icons/fa";
//style
import "./style/CountriesForm.css";

const ListCountryForm = () => {
  const dispatch = useAppDispatch();
  const country = useAppSelector((state: RootStateOrAny) => state.countries);

  const [countryQuery, setCountryQuery] = useState("");

  const submitListCountryForm = useCallback(
    (e: any) => {
      e.preventDefault();
      //make request for the countries that match the query
      dispatch(getListCountries(countryQuery));
    },
    [dispatch, countryQuery]
  );
  return (
    <div className="country-form">
      <Form onSubmit={submitListCountryForm} autoComplete="off">
        <Form.Group className="mb-3" controlId="formCountryName">
          <Form.Label>Type Country Name</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter country name"
            onChange={(e) => setCountryQuery(e.target.value)}
          />
        </Form.Group>{" "}
        <Button type="submit">
          Search list of countries <MdSearch />
        </Button>
      </Form>
      {/* check if the promise status is success to iterate the arrays of countries */}

      {country.statusGetListCountries === "success" &&
        country.listCountries !== null && (
          <div className="countries-list-container">
            {country.listCountries?.map((country: any, i: number) => (
              <ul key={i}>
                <li>
                  <BiWorld /> {country.countryName} {country.flag}
                </li>
                <li>
                  {" "}
                  <GiModernCity />
                  {country.capital?.join(", ")}
                </li>
                <li>
                  <FaMapMarkedAlt /> {country.region}
                </li>
              </ul>
            ))}
          </div>
        )}
      {/* check if the promise status is loading for the request */}

      {country?.statusGetListCountries === "loading" && (
        <p>...Loading Countries</p>
      )}
      {/* check if the promise status is reject for the request, and show the exception message */}

      {country.statusGetListCountries === "reject" && (
        <p>
          {country.errorGetListCountries}
          <MdError />
        </p>
      )}
    </div>
  );
};

export default React.memo(ListCountryForm);
