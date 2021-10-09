import React from "react";
import { Button, Form } from "react-bootstrap";
import './style/UniqueCountryForm.css'
const UniqueCountryForm = () => {
  return (
    <Form className="unique-contry-form">
      <Form.Group className="mb-3" controlId="formCountryName">
        <Form.Label>Type Country Name</Form.Label>
        <Form.Control type="text" placeholder="Enter country name" />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default UniqueCountryForm;
