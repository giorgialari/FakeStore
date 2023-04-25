import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { editProduct, getAllCategories, getProductById } from '../../../api/Api';
import '../update-product/UpdateProduct.css'

import { useSelector, useDispatch } from 'react-redux';
import { getProductByIdStore, updateProductStore } from '../../../store/productsSlice';
import { getAllCategoriesStore } from '../../../store/categoryNavSlice';
function UpdateProduct() {
  const product = useSelector((state) => state.products.currentProducts); // recupera il prodotto dallo store
  const categoryNavStore = useSelector((state) => state.categoryNavStore.currentCategory); // recupera il prodotto dallo store
  const dispatch = useDispatch(); // crea una funzione dispatch per inviare azioni al reducer


  useEffect(() => {
    getAllCategories().then((data) => dispatch(getAllCategoriesStore(data)));
    getProductById().then((product) => dispatch(getProductByIdStore(product)));
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { title, image, price, category, description } = event.target.elements;
    const CurrentProduct = {
      title: title.value,
      image: image.value,
      price: price.value,
      category: category.value,
      description: description.value,
    };
    const idCurrent = localStorage.getItem('id')
    editProduct(idCurrent, CurrentProduct)
      .then((response) => {
        dispatch(updateProductStore(response))
        document.getElementById('alert').style.display = 'block'
      })
  };

  return (
    <div className='form-container'>
      {product && product.id ? (
        <Form onSubmit={handleSubmit}>
          <h3>Edit product</h3>
          <Alert variant="success" id='alert' style={{ display: 'none'}}>
            <Alert.Heading>Prodotto aggiornato con successo</Alert.Heading>
            <div>
              I suoi valori aggioranti:
              <Table striped bordered hover size="sm">
                  <tbody>
                    <tr>
                      <th>Title</th>
                      <td>{product.title}</td>
                    </tr>
                    <tr>
                      <th>Price</th>
                      <td>{product.price}</td>
                    </tr>
                    <tr>
                      <th>Image</th>
                      <td>{product.image}</td>
                    </tr>
                    <tr>
                      <th>Category</th>
                      <td>{product.category}</td>
                    </tr>
                    <tr>
                      <th>Description</th>
                      <td>{product.description}</td>
                    </tr>
                  </tbody>
              </Table>
              N.B.: Il server ha risposto con successo, ma il prodotto non verrà aggiunto al Database, quindi non sarà visibile. 
            </div>
          </Alert>
          <div className='title-price-container'>
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
                type="number" min="1" step="any" name='price'
                defaultValue={product.price}
                placeholder="Price" />
            </Form.Group>
          </div>
          <div className='image-category-container'>
            <Form.Group className="mb-3" controlId="formBasicImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                className="url-input" type="url"
                name='image'
                defaultValue={product.image}
                placeholder="url image" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                className="category-select"
                name='category'
                defaultValue={product.category}>
                {categoryNavStore && categoryNavStore.length > 0 ? (
                  categoryNavStore.map((data) => {
                    return (
                      <option key={data}>{data}</option>
                    );
                  })
                ) : (
                  <option>Loading...</option>
                )}
              </Form.Select>
            </Form.Group>
          </div>
          <Form.Group className="mb-3" controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea"
              type="text"
              className="desc-select"
              name='description'
              defaultValue={product.description}
              placeholder="Description" />
          </Form.Group>
          <Button variant="success" type="submit">
            Add
          </Button>
        </Form>
      ) : (
        <option>Loading...</option>
      )}
    </div>
  )
}

export default UpdateProduct