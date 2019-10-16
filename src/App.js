import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import _ from 'lodash';

const Nav = () => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Study Stats</Navbar.Brand>
  </Navbar>
);

const CurrClasses = ({state}) => {
   
  const [showLog, setShowLog] = useState(false);
  const [logItem, setLogItem] = useState({title:"", assignment: "", median: 0});

  const handleClose = () => setShowLog(false);

  const handleSubmit = (currClass) => {
    let newClasses = state.classes;
    let i = 0;
    for (i; i < state.classes.length; i += 1) {
      if (_.isEqual(state.classes[i], currClass)) {
        newClasses.splice(i, 1);
      }
    }
    state.setClasses(newClasses);
    setShowLog(false);
  }

  const handleShow = (currClass) => {
    setLogItem(currClass);
    setShowLog(true);
  };

  return (
    <Col>
      <Card border="light">
        <Card.Body>
          <Card.Title><h2>Upcoming Assignments</h2></Card.Title>
          <Card.Text>
            <ButtonGroup variant="flush">
              {state.classes.map(currClass => 
                <React.Fragment key={currClass.title}>
                <Button onClick={() => handleShow(currClass)}>{currClass.title} - {currClass.assignment}</Button>
                <br /> 
                </React.Fragment>
              )}
            </ButtonGroup>
            
            <Modal show={showLog} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Time Entry for {logItem.title} - {logItem.assignment}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>
                      Total hours spent to complete this assignment:
                    </Form.Label>
                    <Form.Control as="textarea" rows="2" />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => handleSubmit(logItem, state.classes)} variant="success">
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

const Recommendations = ({state}) => {
  let maxHours = 0;
  let firstHW = "";
  let firstClass = "";
  console.log(state);
  for (let i = 0; i < state.classes.length; i += 1) {
    if (state.classes[i].median > maxHours) {
      maxHours = state.classes[i].median
      firstHW = state.classes[i].assignment
      firstClass = state.classes[i].title
    }
  }
  return (
    <Col>
      <Card border="light">
        <Card.Body>
          <Card.Title><h2>Recommendations:</h2></Card.Title>
          <Card.Text>You should start {firstClass} - {firstHW} first.</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
};

const Upcoming = () => (
    <Col>
      <Card border="light">
        <Card.Body>
          <Card.Title><h2>Upcoming Week</h2></Card.Title>
        </Card.Body>
      </Card>
    </Col>
);


function App() {
  const [classes, setClasses] = useState([{title: "", assignment: "", median: 0}]);
  let classData = [
    {
      title: "CS 340",
      assignment: "Homework 1",
      median: 6
    },
    {
      title: "CS 211",
      assignment: "Lab 1",
      median: 2
    }
  ];
  if (classes[0]['title'] === "") {
    setClasses(classData);
  }
  
  return (
    <React.Fragment>
      <Nav/>
      <Container>
        <Row>
          <CurrClasses key={classes[0].title} state={{classes, setClasses}}/>
          <Recommendations state={{classes, setClasses}}/>
        </Row>
        <Row>
          <Upcoming />
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default App;
