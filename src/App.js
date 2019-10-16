import React, { useState , useEffect} from 'react';
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
  const [logItem, setLogItem] = useState([{id: "", title: "", assignments: []}, {id: "", title: "", average_time_spent: "", completed: ""}]);

  const handleClose = () => setShowLog(false);

  const handleSubmit = (currInfo) => {
    console.log(state.classes);
    let newClasses = [];
    let i = 0;
    for (i; i < state.classes.length; i += 1) {
      if (!_.isEqual(state.classes[i], currInfo[0])) {
        newClasses.push(state.classes[i])
      }
      else {
        let newAssignments = [];
        let j = 0;
        for (j; j < state.classes[i].assignments.length; j += 1) {
          if (!_.isEqual(currInfo[1], state.classes[i].assignments[j])) {
            newAssignments.push(state.classes[i].assignments[j])
          }
        }
        newClasses.push({id: state.classes[i].id, title: state.classes[i].title, assignments: newAssignments});
      }
    }
    console.log(newClasses);
    state.setClasses(newClasses);
    setShowLog(false);
  }

  const handleShow = (currClass, currAssignment) => {
    setLogItem([currClass, currAssignment]);
    setShowLog(true);
  };

  return (
    <Col>
      <Card border="light">
        <Card.Body>
          <Card.Title><h3>Upcoming Assignments</h3></Card.Title>
          <Card.Text>
            <ButtonGroup variant="flush">
              {state.classes.map(currClass => 
                currClass.assignments.map(currAssignment => 
                  
                <React.Fragment key={currAssignment.title}>
                <Button onClick={() => handleShow(currClass, currAssignment)}>{currClass.title} - {currAssignment.title}</Button>
                <br /> 
                </React.Fragment>
              ))}
            </ButtonGroup> 
            
            <Modal show={showLog} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Enter hours spent to complete this assignment:</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control as="textarea" rows="2" />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => handleSubmit(logItem)} variant="success">
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
  let cardText = "";
  if (state.classes[0].assignments.length === 0) {
    cardText = "Congrats! You have no more assignments."
  }
  for (let i = 0; i < state.classes.length; i += 1) {
    for (let j = 0; j < state.classes[i].assignments.length; j += 1) {
      if (state.classes[i].assignments[j].average_time_spent > maxHours) {
        maxHours = state.classes[i].assignments[j].average_time_spent;
        cardText = "Past students have spent " + state.classes[i].assignments[j].average_time_spent + " hours on " + state.classes[i].title + " - " + state.classes[i].assignments[j].title + ". We recommend you start this one first!";
      }
    }
  }
  return (
    <Col>
      <Card border="light">
        <Card.Body>
          <Card.Title><h3>Recommendation:</h3></Card.Title>
          <Card.Text>{cardText}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
};

const Upcoming = () => (
    <Col>
      <Card border="light">
        <Card.Body>
          <Card.Title><h3>Upcoming Week</h3></Card.Title>
        </Card.Body>
      </Card>
    </Col>
);


function App() {
  //const [classes, setClasses] = useState({title: "", assignment: [], median: 0});
  const [classes, setClasses] = useState([{id: "", title: "", assignments: []}])
  const url = '/data/assignments.json';

  useEffect(() => {
    const fetchClasses= async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setClasses(json.courses);
    }
    fetchClasses();
  }, [])

 /* let classData = [
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
  ];*/

  //console.log(classes)
  
  return (
    <React.Fragment>
      <Nav/>
      <Container>
        <Row>
          <CurrClasses key={classes.title} state={{classes, setClasses}}/>
          <Upcoming />
        </Row>
        <Row>
          <Recommendations state={{classes, setClasses}}/>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default App;
