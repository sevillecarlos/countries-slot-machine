import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import UniqueCountryForm from "../components/UniqueCountryForm";
import ListCountryForm from "../components/ListCountryForm";
import ListAllCountryForm from "../components/ListAllCountryForm";
import { useHistory } from "react-router";

import "./style/Countries.css";

const Countries = () => {
  const history = useHistory();

  return (
    <div className="countries">
      <Container>
        {/* <Button onClick={() => history.goBack()}>Go Back</Button> */}
        <Row>
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
