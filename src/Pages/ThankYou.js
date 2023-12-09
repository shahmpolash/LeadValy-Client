import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ThankYou = () => {
    const {id} = useParams();
    const [product, setProduct] = useState([]);
  
    useEffect(() => {
      fetch(`https://dry-inlet-34467-1e797feb3813.herokuapp.com/product/${id}`)
        .then((res) => res.json())
        .then((info) => setProduct(info));
    }, [product]);
    return (
        <div>
            <h2>Thanks for order this item {product.ProductName}</h2>
        </div>
    );
};

export default ThankYou;