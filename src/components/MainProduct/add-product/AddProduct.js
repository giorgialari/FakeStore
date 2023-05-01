import React, { useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import { addProduct, getAllCategories } from "../../../api/Api";
import { Helmet } from "react-helmet";
import styles from './AddProduct.module.css'
import { useSelector, useDispatch } from "react-redux";
import { addProductStore } from "../../../store/productsSlice";
import { getAllCategoriesStore } from "../../../store/categoryNavSlice";
import ProductForm from "../../../common/ProductForm";

function AddProduct() {
  const product = useSelector((state) => state.products.currentProducts); // recupera il prodotto dallo store
  const categoryNavStore = useSelector(
    (state) => state.categoryNavStore.currentCategory
  ); // recupera il prodotto dallo store
  const dispatch = useDispatch(); // crea una funzione dispatch per inviare azioni al reducer

  const addNewProduct = (newProduct) => {
    addProduct(newProduct).then((response) => {
      dispatch(addProductStore(response));
      document.getElementById("alert").style.display = "block";
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { title, image, price, category, description } =
      event.target.elements;
    const newProduct = {
      title: title.value,
      image: image.value,
      price: price.value,
      category: category.value,
      description: description.value,
    };

    addNewProduct(newProduct);
  };

  useEffect(() => {
    getAllCategories().then((data) => dispatch(getAllCategoriesStore(data)));
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title> FakeStore - Add Product </title>
        <meta name="description" content="Page for add a new product" />
      </Helmet>
      <div className={`{styles["form-container"]} mt-5`}>
        <h3 className="mt-4">Add new product</h3>
        <Alert
          variant="success"
          id="alert"
          style={{ display: "none", fontSize: "12px", maxWidth: "410px" }}
        >
          <Alert.Heading style={{ fontSize: "14px" }}>
            Prodotto inserito con successo
          </Alert.Heading>
          {product && product.id ? (
            <p>
              Il prodotto è stato inserito con successo, il suo id è{" "}
              {product.id}. N.B.: Il prodotto non verrà aggiunto al DB e quindi
              non è visibile.
            </p>
          ) : (
            <option>Loading...</option>
          )}
        </Alert>
        <ProductForm
          product={{}}
          onSubmit={addNewProduct}
          buttonText="Add"
          categoryNavStore={categoryNavStore}
        />
      </div>
    </>
  );
}

export default AddProduct;
