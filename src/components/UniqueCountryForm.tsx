import React, { useState, useCallback } from "react";
//bootstrap import
import { Button, Form } from "react-bootstrap";
//redux import
import { RootStateOrAny } from "react-redux";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUniqueCountry } from "../app/slices/countries";
//icons components
import { MdSearch, MdError } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { GiModernCity } from "react-icons/gi";
import { FaMapMarkedAlt } from "react-icons/fa";
//style
import "./style/CountriesForm.css";

const UniqueCountryForm = () => {
  const dispatch = useAppDispatch();
  const country = useAppSelector((state: RootStateOrAny) => state.countries);

  const [countryQuery, setCountryQuery] = useState("");

  const submitUniqueCountryForm = useCallback(
    (e: any) => {
      e.preventDefault();
      //make request for the countries that match the query
      dispatch(getUniqueCountry(countryQuery));
    },
    [dispatch, countryQuery]
  );

  return (
    <div className="country-form">
      <Form onSubmit={submitUniqueCountryForm} autoComplete="off">
        <Form.Group className="mb-3" controlId="formCountryName">
          <Form.Label>Type Country Name</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter country name"
            onChange={(e) => setCountryQuery(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">
          Search country <MdSearch />
        </Button>
      </Form>
      <div>
        {/* check if the promise status is success to iterate the arrays of countries */}

        {country.statusGetCountry === "success" && (
          <ul>
            <li>
              <BiWorld />
              {country?.uniqueCountry?.countryName}{" "}
              {country?.uniqueCountry?.flag}
            </li>
            <li>
              <GiModernCity /> {country?.uniqueCountry?.capital?.join(", ")}
            </li>
            <li>
              <FaMapMarkedAlt /> {country?.uniqueCountry?.region}
            </li>
          </ul>
        )}
        {/* check if the promise status is loading for the request */}

        {country?.statusGetCountry === "loading" && <p>...Loading Country</p>}
        {/* check if the promise status is reject for the request, and show the exception message */}

        {country.statusGetCountry === "reject" && (
          <p>
            {country.errorGetCountry} <MdError />
          </p>
        )}
      </div>
    </div>
  );
};

export default React.memo(UniqueCountryForm);
