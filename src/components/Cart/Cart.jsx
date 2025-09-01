import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addItem, removeItem } from "../../utils/cartSlice";
import { CDN_URL } from "../../utils/constants";
import './Cart.css';   

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(store => store.cart.items);
    const [removingItems, setRemovingItems] = useState(new Set());
    
    // Calcular el total del carrito
    const totalPrice = cartItems.reduce((total, item) => {
        const price = item.card?.info?.price || item.dish?.info?.price || 0;
        return total + (price * item.quantity);
    }, 0);

    // Función para incrementar cantidad
    const handleIncrement = (item) => {
        dispatch(addItem(item));
    };

    // Función para decrementar cantidad con animación
    const handleDecrement = (item) => {
        const itemId = item.card?.info?.id || item.dish?.info?.id;
        
        // Si es el último item (quantity <= 1), aplicar animación
        if (item.quantity <= 1) {
            setRemovingItems(prev => new Set(prev).add(itemId));
            
            // Esperar a que termine la animación antes de eliminar del estado
            setTimeout(() => {
                dispatch(removeItem(itemId));
                setRemovingItems(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(itemId);
                    return newSet;
                });
            }, 600); // Tiempo de la animación CSS
        } else {
            dispatch(removeItem(itemId));
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="cart-empty">
                <h1>🛒 Tu carrito está vacío</h1>
                <p>¡Agrega algunos platos deliciosos!</p>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h1>🛒 Tu Carrito</h1>
            <div className="cart-items">
                {cartItems.map((item) => {
                    const itemInfo = item.card?.info || item.dish?.info;
                    const itemPrice = itemInfo?.price || itemInfo?.defaultPrice || 0;
                    const totalItemPrice = (itemPrice * item.quantity) / 100;
                    const isRemoving = removingItems.has(itemInfo?.id);
                    
                    return (
                        <div key={itemInfo?.id} className={`cart-item ${isRemoving ? 'removing' : ''}`}>
                            <div className="cart-item-content">
                                <div className="cart-item-info">
                                    <h3>{itemInfo?.name}</h3>
                                    <p className="cart-item-description">
                                        {itemInfo?.description || itemInfo?.category}
                                    </p>
                                    <div className="cart-item-price-info">
                                        <span className="unit-price">
                                            ₹{itemPrice / 100} por unidad
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="cart-item-image">
                                    {itemInfo?.imageId ? (
                                        <img 
                                            src={`${CDN_URL}/fl_lossy,f_auto,q_auto/w_200,h_150,c_fill/${itemInfo.imageId}`}
                                            alt={itemInfo.name}
                                            className="cart-item-img"
                                        />
                                    ) : (
                                        <div className="cart-item-placeholder">
                                            <span>🍜</span>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="cart-item-total">
                                    <span className="total-price">
                                        Total: ₹{totalItemPrice}
                                    </span>
                                    
                                    <div className="quantity-controls">
                                        <div className="quantity-buttons">
                                        {item.quantity <= 1 ? <button className="quantity-btn-remove"
                                                onClick={() => handleDecrement(item)}>🗑️</button> : <button 
                                                className="quantity-btn minus-btn"
                                                onClick={() => handleDecrement(item)}
                                            >
                                                -
                                            </button>}
                                            <span className="quantity-display">{item.quantity}</span>
                                            <button 
                                                className="quantity-btn plus-btn"
                                                onClick={() => handleIncrement(item)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="cart-summary">
                <div className="cart-total">
                    <h2>Total del Carrito: ₹{(totalPrice / 100).toFixed(2)}</h2>
                    <p>{cartItems.reduce((total, item) => total + item.quantity, 0)} Items</p>
                </div>
            </div>
        </div>
    );
};

export default Cart;