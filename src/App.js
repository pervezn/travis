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
import { Chart } from "react-google-charts";

const week = 1;

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
          <Card.Title><h3>Upcoming NIDA</h3></Card.Title>
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
          <Card.Title><h3>Recommendation</h3></Card.Title>
          <Card.Text>{cardText}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
};

const Graph = ({state}) => {
  const options = {
    title: "This Week's Assignments",
    legend: {position: 'none'},
    vAxis: {
      title: "Median Hours",
      titleTextStyle: {
        italic: false
      }
    }
  };
  let data = [
    ['Assignment', 'Median Hours Spent', { role: 'style' }],
  ];
  let dueSoon = "";
  let maxHours = 0;
  for (let i = 0; i < state.classes.length; i += 1) {
    const assignments = state.classes[i].assignments;
    for (let j = 0; j < assignments.length; j += 1) {
      const assignment = assignments[j];
      if (assignment.week == week){
        if (assignment.average_time_spent > maxHours){
          maxHours = assignment.average_time_spent;
          dueSoon = state.classes[i].title + " " + assignment.title;
        }
        data.push([state.classes[i].title + " " + assignment.title, assignment.average_time_spent, ''])
      }
    }
  }
  for (let i = 0; i < data.length; i += 1){
    if (data[i][0] == dueSoon){
      data[i][2] = 'red';
    }
  }
  return (
    <Col>
      <Card border="light">
        <Card.Body>
          <Card.Title><h3>Upcoming Week</h3></Card.Title>
          <div className={"my-pretty-chart-container"}>
            <Chart
              chartType="ColumnChart"
              data={data}
              options={options}
              width="100%"
              height="300px"
              legendToggle
            />
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
};

function App() {
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

  return (
    <React.Fragment>
      <Nav/>
      <Container>
        <Row>
          <CurrClasses key={classes.title} state={{classes, setClasses}}/>
          <Graph key={classes.title} state={{classes, setClasses}}/>
        </Row>
        <Row>
          <Recommendations state={{classes, setClasses}}/>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default App;
