import React, { useState } from "react";
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

  console.log(country?.uniqueCountry);
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
        {country?.uniqueCountry !== null &&
          country?.uniqueCountry?.map((country: any) => (
            <ul key={country?.name}>
              <li>Country: {country?.name}</li>
              <li>Capital: {country?.capital}</li>
              <li>Region: {country?.region}</li>
            </ul>
          ))}
      </div>
    </div>
  );
};

export default UniqueCountryForm;
