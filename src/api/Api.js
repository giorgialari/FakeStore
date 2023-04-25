import axios from 'axios';
//--------------------PRODOTTI--------------------//
//Riempie la pagina con tutti i prodotti
export const getAllProducts = async () => {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}

//Seleziona un prodotto per id
export const getProductById = async () => {
    const idProduct = localStorage.getItem('id');
    try {
        const response = await axios.get(`https://fakestoreapi.com/products/` + idProduct);
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}

//Aggiunge un nuovo prodotto
export const addProduct = async (newProduct) => {
    try {
        const response = await axios.post(`https://fakestoreapi.com/products`, newProduct);
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}
//Modifica il prodotto
export const editProduct = async (id, editProduct) => {
    try {
        const response = await axios.put(`https://fakestoreapi.com/products/${id}`, editProduct);
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}
//Elimina il prodotto
export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`https://fakestoreapi.com/products/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}

//--------------------CATEGORIE--------------------//
//Riempie la nav con l'elenco delle categorie
export const getAllCategories = async () => {
    try {
        const response = await axios.get(`https://fakestoreapi.com/products/categories`);
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}

//Riempie la pagina delle categorie in base a quelle selezionate dalla nav
export const getCategoriyByType = async (category) => {
    try {
        const response = await axios.get(`https://fakestoreapi.com/products/category/` + category);
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}

//--------------------ORDERS--------------------//
//Simula gli ordini inserendo i prodotti in tabella
export const getAllOrders = async () => {
    try {
        const response = await axios.get('https://my.api.mockaroo.com/orders.json?key=7eee96a0');
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}
//Modifica l'ordine
export const updateOrder = async (id, editOrder) => {
    try {
        const response = await axios.put(`https://my.api.mockaroo.com/orders/${id}.json?key=7eee96a0&__method=PUT`, editOrder);
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}
//Elimina il prodotto
export const deleteOrder = async (id) => {
    try {
        const response = await axios.delete(`https://my.api.mockaroo.com/delete/${id}.json?key=7eee96a0&__method=DELETE`);
        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}