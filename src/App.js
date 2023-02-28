import "./App.css";
import { Home } from "./components/Home";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MetaData } from "./components/layouts/MetaData";
function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="conatiner container-fluid">
          <Routes>
            <Route path="/" exact element={<Home />}></Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
