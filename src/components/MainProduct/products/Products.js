import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import ReactPaginate from "react-paginate";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import styles from "./Products.module.css";
import { getAllProducts, deleteProduct } from "../../../api/Api";
import { Helmet } from "react-helmet";

import { useSelector, useDispatch } from "react-redux";
import {
  getAllProductsStore,
  deleteProductStore,
} from "../../../store/productsSlice";

function Products() {
  const products = useSelector((state) => state.products.currentProducts); // recupera il prodotto dallo store
  const dispatch = useDispatch(); // crea una funzione dispatch per inviare azioni al reducer

  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    getAllProducts()
      .then((response) => {
        dispatch(getAllProductsStore(response)); // Imposta i prodotti nello store
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  const goToProductDetails = (id) => {
    localStorage.setItem("id", id);
    navigate("/product/" + id);
  };
  const goToProductEdit = (id) => {
    localStorage.setItem("id", id);
    navigate("/edit-product/" + id);
  };
  //METODO CORRETTO CHE SI ADATTA A UN'API REALE.
  // Questa api manda solo un messaggio di successo ma non elimina davvero il prodotto dal DB
  // const deleteCurrentProduct = (id) =>{
  //     deleteProduct(id)
  //     .then(() => getAllProducts()
  //      .then((data) => dispatch(deleteProductStore(data))))
  // }

  //Metodo con filter per eliminare i dati dal db in maniera fittizia
  const deleteCurrentProduct = (id) => {
    deleteProduct(id).then(() => {
      dispatch(
        deleteProductStore(products.filter((product) => product.id !== id))
      );
    });
  };

  //Ricerca
  const [searchText, setSearchText] = useState("");

  const FilteredProducts = Array.isArray(products)
  ? products.filter((product) => {
      return product.title.toLowerCase().includes(searchText.toLowerCase());
    })
  : [];


  //Paginazione
  const [pageNumber, setPageNumber] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const pagesVisited = pageNumber * productsPerPage;
  const pageCount = Math.ceil(FilteredProducts.length / productsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const prodottiPerPagina = (e) => {
    setProductsPerPage(parseInt(e.target.value));
  };
  const visibleProducts = FilteredProducts.slice(
    pagesVisited,
    pagesVisited + productsPerPage
  );


  return (
    <>
    <Helmet>
      <title>FakeStore - Products</title>
      <meta
          name="description"
          content="Page for manage products"
        />
    </Helmet>
    <div className="mt-5">
      <h2 className="mt-4">Manage Products</h2>
      <div className="search-container d-flex justify-content-center ">
        <div className="col-md-6 col-lg-4">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </InputGroup>
        </div>
      </div>

      <div className={styles["products"]}>
        {Array.isArray(visibleProducts) ? (
          visibleProducts.map((data) => {
            return (
              <div key={data.id}>
                <Card className={styles["single-product"]} style={{ width: "18rem" }}>
                  <div className={styles["img-container"]}>
                    <Card.Img
                      className={styles["single-product-img"]}
                      variant="top"
                      src={data.image}
                    />
                  </div>
                  <Card.Body className={styles["card-body"]}>
                    <Card.Title className={styles["card-title"]}>{data.title}</Card.Title>
                    <div className={styles["btn-container"]}>
                      <Button
                        variant="danger"
                        onClick={() => deleteCurrentProduct(data.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="warning"
                        onClick={() => goToProductEdit(data.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="primary"
                        className="mx-2"
                        onClick={() => goToProductDetails(data.id)}
                      >
                        Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            );
          })
        ) : (
          <p>Caricamento in corso...</p>
        )}
      </div>
      <div className={styles["pagination-container"]}>
        <div className={styles["select-container"]}>
          <Form.Select
            aria-label="Default select example"
            className="select-pagination ordini-pagina"
            onChange={prodottiPerPagina}
          >
            <option value="5">5</option>
            <option value="10" selected>
              10
            </option>
            <option value="20">20</option>
          </Form.Select>
        </div>
        <div>
          <ReactPaginate
            nextLabel="Next"
            onPageChange={changePage}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="Previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    </div>
    </>
  );
}

export default Products;
