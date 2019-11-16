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

export default CurrClasses;