import React, {useEffect, useState} from 'react';
import CheckoutForm from "./CheckoutForm";

const CheckoutPage = ({ cartItems , completePurchase }) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };


    useEffect(() => {
        fetch(`/getCount`)
            .then(r => {
                if(!r.ok)
                    throw new Error("0")
                return r.json()
            })
            .then(data => setTotalPrice(data))
            .catch(() => setTotalPrice(0))
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const payment = totalPrice;
        try {
            const userData = {
                firstName,
                lastName,
                email,
                payment,
            };
            const response = await completePurchase(userData);
            if (response.ok) {
                setIsSubmitted(true);
                setFirstName('');
                setLastName('');
                setEmail('');
            } else {
                setError('Failed to submit the form. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }
    };

    const handleDismiss = () => {
        setIsSubmitted(false);
        setError('');
    };

    return (
        <div>
            <CheckoutForm
                cartItems={cartItems}
                handleDismiss={handleDismiss}
                isSubmitted={isSubmitted}
                handleSubmit={handleSubmit}
                firstName={firstName}
                handleFirstNameChange={handleFirstNameChange}
                handleLastNameChange={handleLastNameChange}
                lastName={lastName}
                email={email}
                handleEmailChange={handleEmailChange}
                error={error}
            />
        </div>
    );
};

export default CheckoutPage;
