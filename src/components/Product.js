import React from 'react'

export default function Product(props) {
    let { product } = props;
    let elementBuy = "";
    if (product.quantity == 0) {
        elementBuy = <span className="price"> {product.price} USD</span>;
    } else {
        elementBuy = <div>
            <input
                name="quantity-product-1"
                type="number"
                defaultValue={1}
                min={1}
            />
            <a data-product={1} href="#" className="price">
                {" "}
                {product.price} USD{" "}
            </a>
        </div>
    }
    return (
        <div className="media product">
            <div className="media-left">
                <a href="#">
                    <img
                        className="media-object"
                        src={product.image}
                        alt={product.productName}
                    />
                </a>
            </div>
            <div className="media-body">
                <h4 className="media-heading">{product.productName}</h4>
                <p>
                    {product.title}
                </p>
                {elementBuy}
            </div>
        </div>
    )
}
