import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from './Category.module.css'
import {
  getCategoriyByType,
  deleteProduct,
  getAllProducts,
} from "../../../api/Api";

import { useSelector, useDispatch } from "react-redux";
import {
  getAllCategoriesStore,
  deleteProductByCategoryStore,
} from "../../../store/categoryCompSlice";
import { Helmet } from "react-helmet";

function Category() {
  const categoryCompStore = useSelector(
    (state) => state.categoryCompStore.currentCategory
  ); // recupera il prodotto dallo store
  const dispatch = useDispatch(); // crea una funzione dispatch per inviare azioni al reducer
  const navigate = useNavigate();
  const { category } = useParams();

  useEffect(() => {
    if (category) {
      getCategoriyByType(category).then((response) =>
        dispatch(getAllCategoriesStore(response))
      );
    }
  }, [dispatch, category]); //ha [category] come dipendenza perché vogliamo che venga richiamato ogni volta che il parametro category cambia.

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
  //     .then(() => getAllProducts().then((data) => dispatch(data)))
  // }

  //Metodo con filter per eliminare i dati dal db in maniera fittizia
  const deleteCurrentProduct = (id) => {
    deleteProduct(id).then(() => {
      dispatch(
        deleteProductByCategoryStore(
          categoryCompStore.filter((product) => product.id !== id)
        )
      );
    });
  };

  const titlepage = category.charAt(0).toUpperCase() + category.slice(1)

  return (
    <div className="mt-5">
    <Helmet>
      <title>FakeStore - {titlepage}</title>
      <meta
          name="description"
          content="Page for manage category"
        />
    </Helmet>
    <h3 className="mt-4">{titlepage}</h3>
    <div className={`${styles.products} mt-5`}>
      {categoryCompStore && categoryCompStore.length > 0 ? (
        categoryCompStore.map((data) => {
          return (
            <div key={data.id}>
              <Card className={styles["single-product"]} style={{ width: "18rem" }} >
                <div className={styles["img-container"]}>
                  <Card.Img
                    className={styles["single-product-img"]}
                    variant="top"
                    src={data.image}
                  />
                </div>
                <Card.Body className={styles["card-body"]}>
                  <Card.Title className={styles["card-title"]}>{data.title}</Card.Title>
                  <div className="btn-container">
                    <Button
                      variant="danger"
                      onClick={() => deleteCurrentProduct(data.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="warning"
                      className="mx-2"
                      onClick={() => goToProductEdit(data.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="primary"
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
    </div>
  );
}

export default Category;
