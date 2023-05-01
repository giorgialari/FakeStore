import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import {
  editProduct,
  getAllCategories,
  getProductById,
} from "../../../api/Api";
import styles from './UpdateProduct.module.css'
import { useSelector, useDispatch } from "react-redux";
import {
  getProductByIdStore,
  updateProductStore,
} from "../../../store/productsSlice";
import { getAllCategoriesStore } from "../../../store/categoryNavSlice";
import { Helmet } from "react-helmet";
import ProductForm from "../../../common/ProductForm";

function UpdateProduct() {
  const product = useSelector((state) => state.products.currentProducts); // recupera il prodotto dallo store
  const categoryNavStore = useSelector(
    (state) => state.categoryNavStore.currentCategory
  ); // recupera il prodotto dallo store
  const dispatch = useDispatch(); // crea una funzione dispatch per inviare azioni al reducer

  useEffect(() => {
    getAllCategories().then((data) => dispatch(getAllCategoriesStore(data)));
    getProductById().then((product) => dispatch(getProductByIdStore(product)));
  }, [dispatch]);

  const handleSubmit = (updatedProduct, idCurrent) => {
    editProduct(idCurrent, updatedProduct).then((response) => {
      dispatch(updateProductStore(response));
      document.getElementById("alert").style.display = "block";
    });
  };
  

  return (
    <>
      <Helmet>
        <title>FakeStore - Edit Product</title>
        <meta name="description" content="Page for update product" />
      </Helmet>
      <div className={`${styles.formContainer}`}>
        {product && product.id ? (
          <div>
            <h3>Edit product</h3>
            <Alert variant="success" id="alert" style={{ display: "none" }} className={styles.alert}>
              <Alert.Heading className={styles.alertHeading}>Prodotto aggiornato con successo</Alert.Heading>
              <div>
                I suoi valori aggioranti:
                <Table striped bordered hover size="sm" className={styles.table}>
                  <tbody>
                    <tr>
                      <th className={styles.th}>Title</th>
                      <td className={styles.td}>{product.title}</td>
                    </tr>
                    <tr>
                      <th className={styles.th}>Price</th>
                      <td className={styles.td}>{product.price}</td>
                    </tr>
                    <tr>
                      <th className={styles.th}>Image</th>
                      <td className={styles.td}>{product.image}</td>
                    </tr>
                    <tr>
                      <th className={styles.th}>Category</th>
                      <td className={styles.td}>{product.category}</td>
                    </tr>
                    <tr>
                      <th className={styles.th}>Description</th>
                      <td className={styles.td}>{product.description}</td>
                    </tr>
                  </tbody>
                </Table>
                N.B.: Il server ha risposto con successo, ma il prodotto non
                verrà aggiunto al Database, quindi non sarà visibile.
              </div>
            </Alert>
            <ProductForm
              product={product}
              onSubmit={(updatedProduct) =>
                handleSubmit(updatedProduct, product.id)
              }
              buttonText="Update"
              categoryNavStore={categoryNavStore}
            />
          </div>
        ) : (
          <option>Loading...</option>
        )}
      </div>
    </>
  );
}

export default UpdateProduct;
