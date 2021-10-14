import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import UniqueCountryForm from "../components/UniqueCountryForm";
import ListCountryForm from "../components/ListCountryForm";
import ListAllCountryForm from "../components/ListAllCountryForm";

import "./style/Countries.css";

const Countries = () => {
  return (
    <div className="countries">
      <Container fluid="xxl">
        <Row md={12}>
          <Col>
            {" "}
            <UniqueCountryForm />
            <ListCountryForm />
          </Col>
          <Col>
            <ListAllCountryForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default React.memo(Countries);
