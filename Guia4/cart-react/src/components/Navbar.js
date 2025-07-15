'use client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../styles/navbar.css';
const Navbar = () => {
    const [showCart, setShowCart] = useState(false);
    const cart = useSelector(state => state.cart);
    return (
        <nav className="navbar">
            <h1>Mi Tienda</h1>
            <button className="cart-button" onClick={() => setShowCart(!showCart)}>
                🛒 Carrito ({cart.length})
            </button>
            {showCart && (
                <div className="cart-dropdown">
                    {cart.length === 0 ? (
                        <p>El carrito está vacío</p>
                    ) : (
                        cart.map((item, index) => (
                            <div key={index} className="cart-item">
                                <p>{item.title} - ${item.price}</p>
                            </div>
                        ))
                    )}
                </div>
            )}
        </nav>
    );
};
export default Navbar;
