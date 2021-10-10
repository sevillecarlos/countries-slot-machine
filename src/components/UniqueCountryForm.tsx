import React, { useState, useCallback } from "react";
import { Button, Form } from "react-bootstrap";
import { RootStateOrAny } from "react-redux";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUniqueCountry } from "../app/slices/countries";

import "./style/UniqueCountryForm.css";

const UniqueCountryForm = () => {
  const dispatch = useAppDispatch();
  const country = useAppSelector((state: RootStateOrAny) => state.countries);

  const [countryQuery, setCountryQuery] = useState("");

  const submitUniqueCountryForm = (e: any) => {
    e.preventDefault();
    dispatch(getUniqueCountry(countryQuery.toLowerCase()));
  };


  return (
    <div>
      <Form className="unique-contry-form" onSubmit={submitUniqueCountryForm}>
        <Form.Group className="mb-3" controlId="formCountryName">
          <Form.Label>Type Country Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country name"
            onChange={(e) => setCountryQuery(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
      <div>
        {country?.status === "success" &&
        country?.uniqueCountry !== null &&
        !country?.uniqueCountry?.notFoundMsg ? (
          <ul>
            <li>
              Country: {country?.uniqueCountry?.countryName}{" "}
              {country?.uniqueCountry?.flag}
            </li>
            <li>Capital: {country?.uniqueCountry?.capital?.join(", ")}</li>
            <li>Region: {country?.uniqueCountry?.region}</li>
          </ul>
        ) : (
          <p>{country?.uniqueCountry?.notFoundMsg}</p>
        )}
      </div>
    </div>
  );
};

export default React.memo(UniqueCountryForm);
