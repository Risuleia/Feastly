import React from 'react'

import './Searchbar.styles.css'
import Filter from '../Filter/Filter'

function Searchbar() {

    const filters = [
        { content: { name: 'Diet', primary: true } },
        { content: { name: 'Nutritional Value', primary: false } },
        { content: { name: 'Calories', primary: false } },
        { content: { name: 'Fats', primary: false } },
        { content: { name: 'Servings', primary: false } },
        { content: { name: 'Ready Time', primary: false } },
    ]

    return (
        <div id="searchbar">
            <form className="searchbox-container">
                <div className="search-box">
                    <input
                        type="text"
                        className="search-input"
                        placeholder='What are you looking for?'
                        // value={searchQuery}
                        // onChange={(e) => onChangeSearchQuery(e.target.value)}
                    />
                    <button type='submit' className="search-btn" select="false">
                        <span className="material-symbols-rounded">search</span>
                    </button>
                </div>
                <div className="filters">
                    {filters.map((filter, index) => (
                        <Filter key={index} content={filter.content} />
                    ))}
                </div>
            </form>
            {/* <div className="cart-container" select="false">
                {(cart && cart.length > 0) && <span className="cart-count">{cart.length}</span>}
                <button
                    className={`cart-btn${(cart && cart.length > 0) ? ' active' : ''}`}
                    // onClick={() => (cart.length > 0) ? setMenuActive(prev => !prev) : setMenuActive(false)}
                    // disabled={!cart || cart.length === 0}
                >
                    <span className="cart-btn-text">Cart</span>
                    <span className="material-symbols-rounded">shopping_cart</span>
                </button>
                <div className={`cart-list${(cart.length > 0 && menuActive) ? ' active' : ''}`}>
                    <div className="cart-items-container">
                        {cart.map(item => (
                            <div key={item.pid} className="cart-item">
                                <div className="cart-item-logo">
                                    <img src={item.images[0]} alt={item.name} />
                                </div>
                                <div className="cart-item-details">
                                    <div className="cart-item-name">{trim(item.name, 30)}</div>
                                    <div className="cart-item-pricing-container">
                                        <div className="cart-item-price">₹ {item.price}</div>
                                        <button className="cart-item-remove-btn" onClick={(e) => handleRemove(item)}>
                                            <span className="material-symbols-rounded">remove_shopping_cart</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-details">
                        <div className="cart-price-container">
                            <div className="cart-price-label">Total</div>
                            <div className="cart-price">₹ {calculateTotalPrice()}</div>
                        </div>
                        <div className="cart-buttons">
                            <button
                                className='cart-list-btn cart-checkout-btn'
                                onClick={(e) => navigate('/store/checkout', { replace: true })}
                            >
                                Checkout
                            </button>
                            <button className="cart-list-btn cart-clear-btn" onClick={handleDelete}>
                                <span className="material-symbols-rounded">shopping_cart_off</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default Searchbar