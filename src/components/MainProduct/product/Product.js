import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductById } from '../../../api/Api';
import Button from 'react-bootstrap/Button';
import './Product.css';
import { getProductByIdStore } from '../../../store/productsSlice'; // importa l'azione che imposta il prodotto
 


function Product() {
  const product = useSelector((state) => state.products.currentProducts); // recupera il prodotto dallo store
  const dispatch = useDispatch(); // crea una funzione dispatch per inviare azioni al reducer

  useEffect(() => {
    getProductById().then((response) => {
      dispatch(getProductByIdStore(response)); // invia un'azione per impostare il prodotto nello store
    });
  }, [dispatch]);

  return (
    <div>
      {product ? (
        <div key={product.id}>
          <div className="container">
            <div className="left-column">
              <img data-image="black" className="active image" src={product.image} alt="" />
            </div>

            <div className="right-column">
              <div className="product-description">
                <span>{product.category}</span>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
              </div>

              <div className="product-price">
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
  );
}

export default Product;
