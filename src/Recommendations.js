import React, { useState , useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

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

export default Recommendations;