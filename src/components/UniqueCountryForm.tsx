import React, { useState, useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import { RootStateOrAny } from "react-redux";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUniqueCountry } from "../app/slices/countries";
import { MdSearch, MdError } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { GiModernCity } from "react-icons/gi";
import { FaMapMarkedAlt } from "react-icons/fa";

import "./style/CountriesForm.css";

const UniqueCountryForm = () => {
  const dispatch = useAppDispatch();
  const country = useAppSelector((state: RootStateOrAny) => state.countries);

  const [countryQuery, setCountryQuery] = useState("");

  const submitUniqueCountryForm = useCallback(
    (e: any) => {
      e.preventDefault();
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
            placeholder="Enter country name"
            onChange={(e) => setCountryQuery(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">
          Search country <MdSearch />
        </Button>
      </Form>
      <div>
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
