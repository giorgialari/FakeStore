import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductById } from "../../../api/Api";
import Button from "react-bootstrap/Button";
import styles from "./Product.module.css";
import { getProductByIdStore } from "../../../store/productsSlice"; // importa l'azione che imposta il prodotto
import { Helmet } from "react-helmet";

function Product() {
  const product = useSelector((state) => state.products.currentProducts); // recupera il prodotto dallo store
  const dispatch = useDispatch(); // crea una funzione dispatch per inviare azioni al reducer

  useEffect(() => {
    getProductById().then((response) => {
      dispatch(getProductByIdStore(response)); // invia un'azione per impostare il prodotto nello store
    });
  }, [dispatch]);

  return (
    <>
     <Helmet>
      <title>FakeStore - Product</title>
      <meta
          name="description"
          content="Page for manage product"
        />
    </Helmet>
    <div className="mt-5">
      {product ? (
        <div key={product.id} className="mt-0">
          <div className={styles["container"]}>
            <div className={styles["left-column"]}>
              <img
                data-image="black"
                className={`${styles.active} ${styles.image}`}
                src={product.image}
                alt=""
              />
            </div>

            <div className={styles["right-column"]}>
              <div className={styles["product-description"]}>
                <span>{product.category}</span>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
              </div>

              <div className={styles["product-price"]}>
                <div>{product.price}$</div>
                {/* <Button variant="primary">Add to cart</Button> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Caricamento in corso...</p>
      )}
    </div>
    </>
  );
}

export default Product;
