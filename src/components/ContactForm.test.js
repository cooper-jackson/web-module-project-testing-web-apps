import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>)

    const header = screen.queryByText(/contact form/i)
    expect(header).toBeInTheDocument()
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>)

    const firstNameInput = screen.getByLabelText(/First Name/i)    
    userEvent.type(firstNameInput, "yes")
    const errorMessages = screen.queryAllByText(/error/i)
    expect(errorMessages).toHaveLength(1)

});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>)

    const button = screen.getByRole("button")
    userEvent.click(button)
    const errorMessages = screen.queryAllByText(/error/i)
    expect(errorMessages).toHaveLength(3)
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>)

    const button = screen.getByRole("button")
    const firstNameInput = screen.getByLabelText(/First Name/i)    
    userEvent.type(firstNameInput, "cooper")
    const lastNameInput = screen.getByLabelText(/Last Name/i)    
    userEvent.type(lastNameInput, "jackson")
    userEvent.click(button)
    const errorMessages = screen.queryAllByText(/error/i)
    expect(errorMessages).toHaveLength(1)
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)

    const emailInput = screen.getByLabelText(/email*/i) 
    userEvent.type(emailInput, "cooper")
    const emailError = screen.getByText(/email must be a valid email address/i)
    expect(emailError).toBeInTheDocument()

    userEvent.type(emailInput, "jackson@gmail.com")
    expect(emailError).not.toBeInTheDocument()
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>)

    const button = screen.getByRole("button")
    userEvent.click(button)
    const lastNameError = screen.getByText(/lastName is a required field/i)
    expect(lastNameError).toBeInTheDocument()

    const lastNameInput = screen.getByLabelText(/last name*/i) 
    userEvent.type(lastNameInput, "jackson")
    userEvent.click(button)
    expect(lastNameError).not.toBeInTheDocument()
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>)

    const button = screen.getByRole("button")
    const firstNameInput = screen.getByLabelText(/First Name*/i)    
    const lastNameInput = screen.getByLabelText(/Last Name*/i)    
    const emailInput = screen.getByLabelText(/email*/i) 
    userEvent.click(button)
    let displayContainer = screen.queryByText(/You Submitted/i)
    expect(displayContainer).toBeFalsy()

    userEvent.type(firstNameInput, "cooper")
    userEvent.type(lastNameInput, "jackson")
    userEvent.type(emailInput, "jackson@gmail.com")
    userEvent.click(button)
    displayContainer = screen.queryByText(/You Submitted/i)
    expect(displayContainer).toBeTruthy()

});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>)

    const button = screen.getByRole("button")
    const firstNameInput = screen.getByLabelText(/First Name*/i)    
    const lastNameInput = screen.getByLabelText(/Last Name*/i)    
    const emailInput = screen.getByLabelText(/email*/i) 
    userEvent.type(firstNameInput, "cooper")
    userEvent.type(lastNameInput, "jackson")
    userEvent.type(emailInput, "jackson@gmail.com")
    userEvent.click(button)

    const displayContainer = screen.queryByText(/You Submitted/i)
    const firstNameTestId = screen.getByTestId(/firstnameDisplay/i)
    const lastNameTestId = screen.getByTestId(/lastnameDisplay/i)
    const emailTestId = screen.getByTestId(/emailDisplay/i)    
    expect(displayContainer).toBeTruthy()
    expect(firstNameTestId).toBeTruthy()
    expect(lastNameTestId).toBeTruthy()
    expect(emailTestId).toBeTruthy()
});