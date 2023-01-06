import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import about from "../img/about/raberu.png";
import "../css/styles.css";

function About() {
  return (
    <Container className="mt-5" style={{marginBottom : "100px"}}>
      <Row>
        <Col lg={12}>
          <Card className="m-5 border-0">
            <Card.Body>
              <Card.Img
                className="rounded-0 w-50 d-block mx-auto"
                variant="top"
                src={about}
              />
              <Card.Title className="card-label text-center mt-3">
                La Belle Blanc
              </Card.Title>
              <Card.Text className="card-text text-uppercase text-center mt-3">
                We create clothes that stay with us in every single moment.{" "}
                <br />
                Clothes that make you feel special and allow you to bloom in
                every moment.
              </Card.Text>
              <Card.Text className="card-text text-center">
                La Belle Blanc creates clothing with reinterpretation of classic
                beauty in a modern way.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
