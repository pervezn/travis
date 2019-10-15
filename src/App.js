import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const Nav = ({}) => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Study Stats</Navbar.Brand>
  </Navbar>
);

const CurrClasses = ({}) => (
  <Col>
    <Card border="light">
      <Card.Body>
        <Card.Title><h1>Currently Enrolled Classes</h1></Card.Title>
        <Card.Text>
          <ListGroup variant="flush">
            <ListGroup.Item><Button>EECS 340 - Homework 1</Button></ListGroup.Item>
            <ListGroup.Item><Button>EECS 211 - Lab 1</Button></ListGroup.Item>
          </ListGroup>
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

const Reccomendations = ({}) => (
  <Col>
    <Card border="light">
      <Card.Title>Reccomendations: </Card.Title>
      <Card.Body>You should start 340 homework first.</Card.Body>
    </Card>
  </Col>
);

const Upcoming = ({}) => (
  <Row>
    <Col>
      <Card border="light">
        <Card.Title>Upcoming Week</Card.Title>
      </Card>
    </Col>
    <Col>
    </Col>
  </Row>
);


function App() {
  return (
    <React.Fragment>
      <Nav/>
      <Container>
        <Row>
          <CurrClasses/>
          <Reccomendations/>
        </Row>
        <Upcoming/>
      </Container>
    </React.Fragment>
  );
};

export default App;
