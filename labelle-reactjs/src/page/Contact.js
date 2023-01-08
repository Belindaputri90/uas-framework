import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import about from "../img/about/contact.jpg";
import "../css/styles.css";

const Contact = () => {
  return (
    <Container style={{ marginBottom: "100px", marginTop: "8%" }}>
      <Row>
        <Col lg={6}>
          <Card className="m-5 border-0">
            <Card.Body>
              <Card.Img
                className="img-contact w-75 d-block mx-auto"
                variant="top"
                src={about}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="my-auto">
          <Card className="m-5 border-0 mx-auto align-middle">
            <Card.Body>
              <Card.Title
                className="card-label text-center mt-3 fw-bold"
                style={{ fontSize: "30px" }}
              >
                Contact Me
              </Card.Title>
              <Card.Text
                className="card-text text-uppercase text-center mt-3"
                style={{ fontSize: "14px" }}
              >
                Belinda Dwi Sukma Putri
                <br />
                2110218
                <br />
                West Denpasar - Bali
              </Card.Text>
              <Card.Text
                className="card-text text-center"
                style={{ fontSize: "12px" }}
              >
                Feel free to contact me by email "belindaputri90@gmail.com" ♥
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
