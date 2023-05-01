import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { register } from "./RegisterService";
import { Helmet } from "react-helmet";

function Register() {
  const [Data, setData] = useState({});

  const userRegister = (credentials) => {
    register(credentials)
      .then((response) => {
        if (response.token) {
          document.getElementById("alertSuccess").style.display = "block";
          setTimeout(() => {
            setData(response);
            window.location.href = "/products"; // questo al posto di navigate per far riaggiornare la nav con il logout
          }, 3000);
        }
      })
      .catch((error) => {
        document.getElementById("alert").style.display = "block";
        console.error("errore di login: ", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    const credentials = {
      email: email.value,
      password: password.value,
    };

    userRegister(credentials);
  };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  const passwordsMatch = password === confirmPassword;
  return (
    <div className="mt-5">
      <Helmet>
        <title> FakeStore - Register </title>
        <meta name="description" content="Page for Register" />
      </Helmet>
      <Form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center align-items-center">
        <h3 className="mt-4">Sign up</h3>
        <Alert
          variant="danger"
          id="alert"
          style={{ display: "none", fontSize: "12px", maxWidth: "410px" }}
        >
          <Alert.Heading style={{ fontSize: "14px" }}>
            Ops! Qualcosa è andato storto...
          </Alert.Heading>
          <p>Completa entrambi i campi!</p>
        </Alert>

        <Alert
          variant="success"
          id="alertSuccess"
          style={{ display: "none", fontSize: "12px", maxWidth: "410px" }}
        >
          <Alert.Heading style={{ fontSize: "14px" }}>
            Registrazione effetuata con successo!
          </Alert.Heading>
          <p>A breve, verrai reindirizzato nella pagina prodotti.</p>
        </Alert>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            defaultValue={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Conferma password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            defaultValue={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!passwordsMatch}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Register;
