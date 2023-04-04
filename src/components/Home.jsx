import React, { useEffect, useState } from "react";
import MetaData from "./layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import Loader from "./layouts/Loader";
import Product from "./Product";
export const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, products, error, productsCount, resPerPage } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts(currentPage));
    if (error) {
      console.log(error);
    }
    alert.error(error);
  }, [dispatch, alert, error, currentPage]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

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
                {products &&
                  products.map((item) => {
                    return <Product key={item._id} props={item} />;
                  })}
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
            {resPerPage<=productsCount && (

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
