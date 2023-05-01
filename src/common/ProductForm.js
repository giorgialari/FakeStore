import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from './ProductForm.module.css'
function ProductForm({ product, onSubmit, buttonText, categoryNavStore }) {
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

    onSubmit(newProduct, product.id);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className={styles["title-price-container"]}>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            className="title-input"
            type="text"
            name="title"
            defaultValue={product.title}
            placeholder="Title"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            className="price-input"
            type="number"
            min="1"
            step="any"
            name="price"
            defaultValue={product.price}
            placeholder="Price"
          />
        </Form.Group>
      </div>
      <div className={styles["image-category-container"]}>
        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Image</Form.Label>
          <Form.Control
            className="url-input"
            type="url"
            name="image"
            defaultValue={product.image}
            placeholder="url image"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCategory">
          <Form.Label>Category</Form.Label>
          <Form.Select
            className="category-select"
            name="category"
            defaultValue={product.category}
          >
            {categoryNavStore && categoryNavStore.length > 0 ? (
              categoryNavStore.map((data) => {
                return <option key={data}>{data}</option>;
              })
            ) : (
              <option>Loading...</option>
            )}
          </Form.Select>
        </Form.Group>
      </div>
      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          type="text"
          className="desc-select"
          name="description"
          defaultValue={product.description}
          placeholder="Description"
        />
      </Form.Group>
      <Button variant="success" type="submit">
        {buttonText}
      </Button>
    </Form>
  );
}

export default ProductForm;
