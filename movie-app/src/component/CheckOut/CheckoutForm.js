import React from 'react';
import {Alert, Button, Form} from "react-bootstrap";
import TotalPrice from "../Cart/TotalPrice";
import {Link} from "react-router-dom";

const CheckoutForm = ({cartItems , handleDismiss , isSubmitted  ,
                          handleSubmit , firstName , handleFirstNameChange ,
                          handleLastNameChange , lastName , email  , handleEmailChange , error}) => {

    return (

        <div>
            <h2>Checkout</h2>
            {cartItems.length === 0 && <Alert variant="info">Go To Shopping.</Alert>}
            {cartItems.length > 0 && (
                <>
                    {isSubmitted ? (
                        <Alert variant="success" onClose={handleDismiss} dismissible>
                            Form submitted successfully!
                        </Alert>
                    ) : (
                        <>
                            {error && (
                                <Alert variant="danger" onClose={handleDismiss} dismissible>
                                    {error}
                                </Alert>
                            )}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="firstName">
                                    <Form.Label>First Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={firstName}
                                        onChange={handleFirstNameChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="lastName">
                                    <Form.Label>Last Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={lastName}
                                        onChange={handleLastNameChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        required
                                    />
                                </Form.Group>

                                <TotalPrice />
                                <br />
                                <Button variant="primary" type="submit">
                                    Complete Purchase
                                </Button>
                            </Form>
                        </>
                    )}
                    {isSubmitted && (
                        <Button variant="primary" as={Link} to="/" className="ml-2">
                            Home Page
                        </Button>
                    )}
                </>
            )}
        </div>


    );
};

export default CheckoutForm;
