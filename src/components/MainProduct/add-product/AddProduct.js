import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { addProduct, getAllCategories } from '../../../api/Api';
import './AddProduct.css'

import { useSelector, useDispatch } from 'react-redux';
import { addProductStore } from '../../../store/productsSlice';
import { getAllCategoriesStore } from '../../../store/categoryNavSlice';

function AddProduct() {
    const product = useSelector((state) => state.products.currentProducts); // recupera il prodotto dallo store
    const categoryNavStore = useSelector((state) => state.categoryNavStore.currentCategory); // recupera il prodotto dallo store
    const dispatch = useDispatch(); // crea una funzione dispatch per inviare azioni al reducer


    const addNewProduct = (newProduct) => {
        addProduct(newProduct)
            .then((response) => {
                dispatch(addProductStore(response))
                document.getElementById('alert').style.display = 'block'
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const { title, image, price, category, description } = event.target.elements;
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
      }, [dispatch])
    
    return (
        <div className='form-container'>
            <Form onSubmit={handleSubmit}>
                <h3>Add new product</h3>
                <Alert variant="success" id='alert' style={{ display: 'none', fontSize: '12px', maxWidth: '410px' }}>
                    <Alert.Heading  style={{ fontSize: '14px' }}>Prodotto inserito con successo</Alert.Heading>
                    {product && product.id ? (
                        <p>
                            Il prodotto è stato inserito con successo, il suo id è {product.id}.
                            N.B.: Il prodotto non verrà aggiunto al DB e quindi non è visibile.
                        </p>
                    ) : (
                        <option>Loading...</option>
                    )}
                </Alert>
                <div className='title-price-container'>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control className="title-input" type="text" name='title' placeholder="Title" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control className="price-input" type="number" min="1" step="any" name='price' placeholder="Price" />
                    </Form.Group>
                </div>
                <div className='image-category-container'>
                    <Form.Group className="mb-3" controlId="formBasicImage">
                        <Form.Label>Image</Form.Label>
                        <Form.Control className="url-input" type="url" name='image' placeholder="url image" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Select className="category-select" name='category'>
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
                    <Form.Control as="textarea" type="text" className="desc-select" name='description' placeholder="Description" />
                </Form.Group>
                <Button variant="success" type="submit">
                    Add
                </Button>
            </Form>

        </div>
    )
}

export default AddProduct