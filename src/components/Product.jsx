import React from "react";
import { Link, useNavigation } from "react-router-dom";
const Product = ({ props, getProductById }) => {
  const item = props;

  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3" key={item._id}>
      <div className="card p-3 rounded">
        <img
          className="card-img-top mx-auto"
          src="https://m.media-amazon.com/images/I/617NtexaW2L._AC_UY218_.jpg"
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link
              to={`/product/${item._id}`}
              onClick={() => {
                getProductById(item._id);
              }}
            >
              {item.product_name}
            </Link>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(item.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({item.noOfReviews})</span>
          </div>
          <p className="card-text">{item.price}</p>
          <Link
            to={`/product/${item._id}`}
            id="view_btn"
            className="btn btn-block"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
