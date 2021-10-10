import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import UniqueCountryForm from "../components/UniqueCountryForm";
import ListCountryForm from "../components/ListCountryForm";
import ListAllCountryForm from "../components/ListAllCountryForm";

const Countries = () => {
  console.log('Render..')
  return (
    <div>
      <Container>
        <Row>
          <Col>
            {" "}
            <UniqueCountryForm />
            <br />
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
