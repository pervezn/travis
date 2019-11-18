import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import CurrClasses from "./CurrClasses.js";
import Modal from 'react-bootstrap/Modal';

test('CurrClasses should render passed state to display modal', () => {
  //render set-up  
  let classes = {id: "nida", title: "Nida's Class", assignments: ["write a letter"]}
  let setClasses = jest.fn();
  let buttonPress = jest.fn();
  let modal = document.createElement('Modal');
  const openModal = act(() => {
    ReactDOM.render(<Modal />, modal);
  });
  let key = "nida";
  const {getByTestId} = render(<CurrClasses key={key} 
                                            state={classes, setClasses} 
                                            />);
  //assertion 1: Check if button renders
  expect(getByTestId('classes1').textContent).toBe("Nida's Class")

  //assertion 2: Check if modal loads on button press
  fireEvent.click(getByTestId('buttonPressed'))
  expect(buttonPress).toBeCalledWith(openModal) //HUH
  expect(openModal).toHaveBeenCalledTimes(1)
  
})