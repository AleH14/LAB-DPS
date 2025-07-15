'use client';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import '../styles/product-grid.css';
const products = [
    {
        id: 1,
        title: 'Cien años de soledad',
        price: 100,
        image: 'https://images.penguinrandomhouse.com/cover/9780525562443',
        quantity: 1
    }, {
        id: 2,
        title: 'El señor de los anillos (Trilogía)',
        price: 190,
        image:
            'https://proassetspdlcom.cdnstatics2.com/usuaris/libros/fotos/358/original/portada_pack-trilogia-el-senor-de-los-anillos_j-r-r-tolkien_202206071544.jpg',
        quantity: 1
    },
    {
        id: 3,
        title: 'Cuentos de Barro',
        price: 30,
        image: 'https://www.librosdelaballena.com/wp-content/uploads/2020/05/cuentos-barro-244x300.png',
        quantity: 1
    },
    {
        id: 4,
        title: 'Tierra de Infancia',
        price: 30,
        image: 'https://assets.isu.pub/document-structure/230605011415-591c5b47dde190303e7de29a0a888041/v1/fa8a209bb2ce609861c6572f117e69f8.jpeg?width=720&quality=85%2C50', quantity: 1
    },
    {
        id: 5,
        title: 'Harry Potter Pack',
        price: 390,
        image: 'https://contentv2.tap-commerce.com/cover/large/9789878000473_1.jpg?id_com=1113',
        quantity: 1
    }
];
const ProductGrid = () => {
    const dispatch = useDispatch();
    return (
        <div className="product-grid">
            {products.map(product => (
                <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.title} />
                    <h3>{product.title}</h3>
                    <p>${product.price}</p>
                    <button onClick={() => dispatch(addToCart(product))}>
                        Agregar al carrito
                    </button>
                </div>
            ))}
        </div>
    );
};
export default ProductGrid;
