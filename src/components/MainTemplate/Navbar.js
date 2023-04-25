import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getAllCategories } from '../../api/Api';

import { useSelector, useDispatch } from 'react-redux';
import { getAllCategoriesStore } from '../../store/categoryNavSlice';

function Header() {
  const categoryNavStore = useSelector((state) => state.categoryNavStore.currentCategory); // recupera il prodotto dallo store
  const dispatch = useDispatch(); // crea una funzione dispatch per inviare azioni al reducer

  // verifica se il token esiste - i !! convertono il valore in un boolean
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('token')); 

  useEffect(() => {
    getAllCategories().then((data) => dispatch(getAllCategoriesStore(data)));
  }, [dispatch])

  const navigate = useNavigate();

  const goToCategory = (category) => {
    navigate(`/${category}`);
  }
  

  const handleLogout = () => {
    sessionStorage.removeItem('token'); // rimuovi il token dal sessionStorage
    setIsLoggedIn(false); // setta la variabile di stato a false
    navigate('/'); // reindirizza all pagina di login
  };

  return (
    <>
      {isLoggedIn ? ( // verifica se l'utente è loggato
        <Navbar bg="light" expand="lg">
          <Container>
          <Link className="nav-link" aria-current="page" to="products">
            <Navbar.Brand >FakeStore</Navbar.Brand>
          </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav className="me-auto">
                  <Link className="nav-link" aria-current="page" to="/products">Products</Link>
                  <Link className="nav-link" aria-current="page" to="/add-product">Add Product</Link>
                </Nav>
                <NavDropdown title="Category" id="basic-nav-dropdown">
                  {categoryNavStore.length ? (
                    categoryNavStore.map((data, index) => {
                      return (
                        <NavDropdown.Item key={index}>
                        <span onClick={() => goToCategory(data)}>{data}</span>
                      </NavDropdown.Item>                      
                      )
                    })
                  ) : (
                    <div>''</div>
                  )}
                </NavDropdown>
                <Link className="nav-link" aria-current="page" to="/" onClick={handleLogout}>Logout</Link> {/* mostra il pulsante "Logout" */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : null /* se l'utente non è loggato, non mostra nulla */}

      {!isLoggedIn ? ( // verifica se l'utente non è loggato
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>FakeStore</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link className="nav-link" aria-current="page" to="/">Login</Link> {/* mostra il pulsante "Login" */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : null /* se l'utente è loggato, non mostra nulla */}
    </>
  )
}

export default Header