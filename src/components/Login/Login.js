import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { login } from './LoginService';


function Login() {
    const [Data, setData] = useState({});

    const userLogin = (credentials) => {
        login(credentials)
            .then((response) => {
                if (response.token) {
                    setData(response);
                    window.location.href = '/products'; // questo al posto di navigate per far riaggiornare la nav con il logout
                }
            })
            .catch((error) => {
                document.getElementById('alert').style.display = 'block'
                console.error('errore di login: ', error);
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        const credentials = {
            email: email.value,
            password: password.value,
        };

        userLogin(credentials);
    };
    return (
        <Form onSubmit={handleSubmit}>
            <Alert variant="danger" id='alert' style={{ display: 'none', fontSize: '12px', maxWidth: '410px' }}>
                <Alert.Heading style={{ fontSize: '14px' }}>Ops! Qualcosa è andato storto...</Alert.Heading>
                <p>
                    Inserisci le credenziali corrette!
                </p>
            </Alert>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name='email' placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default Login