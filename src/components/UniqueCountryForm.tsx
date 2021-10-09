import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAppDispatch } from "../app/hooks";
import { getUniqueCountry } from "../app/slices/countries";

import "./style/UniqueCountryForm.css";

const UniqueCountryForm = () => {
  const dispatch = useAppDispatch();
  const [countryQuery, setCountryQuery] = useState("");

  const submitUniqueCountryForm = (e: any) => {
    e.preventDefault();
    dispatch(getUniqueCountry(countryQuery));
  };

  return (
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
  );
};

export default UniqueCountryForm;
