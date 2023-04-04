import "./App.css";
import { Home } from "./components/Home";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
function App() {
  return (
   
      <Router>
        <div className="app">
          <Header />
          <div className="conatiner container-fluid">
            <Routes>
              <Route path="/" exact element={<Home />}></Route>
              <Route path="/product/:id" exact element={<ProductDetails />}></Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
 
  );
}

export default App;
