import React, { useEffect, useState } from "react";
import MetaData from "./layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import Loader from "./layouts/Loader";
import Product from "./Product";
import { useParams } from "react-router-dom";
import "rc-slider/assets/index.css";
import Slider from "rc-slider";
// const { createSliderWithTooltip } = Slider;
// const Slider = require('rc-slider');
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

export const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 100000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();

  const {
    loading,
    products,
    error,
    productsCount,
    resPerPage,
    productFilterdCount,
  } = useSelector((state) => state.products);
  const catgories = [
    "Electronics",
    "Sports",
    "Books",
    "Clothing",
    "Shoes",
    "Grocery",
    "Home Appliances",
    "Mobile",
  ];
  const keyword = params.keyword;
  useEffect(() => {
    if (error) {
      console.log(error);
      alert.error(error);
    }
    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [dispatch, alert, error, keyword, currentPage, price, category, rating]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }
  let count = productsCount;
  if (keyword) {
    count = productFilterdCount;
  }
  // console.log('the counts',productsCount,productFilterdCount)
  return (
    <>
      <div className="container container-fluid">
        <MetaData title={"Buy Best Products Online"} />
        <h1 id="products_heading">Latest Products</h1>
        {loading ? (
          <Loader />
        ) : (
          <>
            <section id="products" className="container mt-5">
              <div className="row">
                {keyword ? (
                  <>
                    <div className="col-6 col-md-3 mb-5">
                      <div className="px-5">
                        <Range
                          marks={{ 1: `$1`, 100000: `$100000` }}
                          min={1}
                          max={100000}
                          defaultValue={[1, 100000]}
                          tipFormatter={(value) => `$${value}`}
                          tipProps={{ placement: "top", visible: true }}
                          value={price}
                          onChange={(price) => setPrice(price)}
                        />
                      </div>
                      <hr className="my-5"></hr>
                      <div className="mt-5">
                        <h4 className="mb-3">Categories</h4>
                        <ul className="pl-0">
                          {catgories.map((category) => (
                            <li
                              style={{
                                listStyleType: "none",
                                cursor: "pointer",
                              }}
                              key={category}
                              onClick={() => setCategory(category)}
                            >
                              {category}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <hr className="my-3"></hr>
                      <div className="mt-5">
                        <h4 className="mb-3">Rating</h4>
                        <ul className="pl-0">
                          {[5, 4, 3, 2, 1].map((star) => (
                            <li
                              style={{
                                listStyleType: "none",
                                cursor: "pointer",
                              }}
                              key={star}
                              onClick={() => {
                                setRating(star);
                              }}
                            >
                              <div className="rating-outer">
                                <div
                                  className="rating-inner"
                                  style={{ width: `${star*20}%` }}
                                ></div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-6 col-md-9">
                        <div className="row">
                          {products &&
                            products.map((product) => (
                              <Product
                                key={product._id}
                                props={product}
                                col={12}
                              />
                            ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  products.map((product) => (
                    <Product key={product._id} props={product} col={3} />
                  ))
                )}

                {/* // {products && */}
                {/* //   products.map((item) => { */}
                {/* //     return <Product key={item._id} props={item} />;
                //   })} */}
                {/* <div className="col-sm-12 col-md-6 col-lg-3 my-3">
              <div className="card p-3 rounded">
                <img
                  className="card-img-top mx-auto"
                  src="https://m.media-amazon.com/images/I/617NtexaW2L._AC_UY218_.jpg"
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">
                    <a href="">
                      128GB Solid Storage Memory card - SanDisk Ultra
                    </a>
                  </h5>
                  <div className="ratings mt-auto">
                    <div className="rating-outer">
                      <div className="rating-inner"></div>
                    </div>
                    <span id="no_of_reviews">(5 Reviews)</span>
                  </div>
                  <p className="card-text">$45.67</p>
                  <a href="#" id="view_btn" className="btn btn-block">
                    View Details
                  </a>
                </div>
              </div>
            </div> */}
              </div>
            </section>
            {resPerPage <= count && (
              <div className="d-flex justify-content-center mt-5">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText={"Next"}
                  prevPageText={"Previous"}
                  firstPageText={"First"}
                  lastPageText={"Last"}
                  itemClass="page-item"
                  linkClass="page-link"
                ></Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
