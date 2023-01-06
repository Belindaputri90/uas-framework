import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Dashboard from "./assets/component/Dashboard";
import Home from "./page/Home";
import Login from "./component/Login";
import Navbar from "./component/Navbar";
import Register from "./component/Register";
import About from "./page/About";
// import Navigation from "./assets/component/Navigation.js";
// import Footer from "./assets/component/Footer.js";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
    // <div>
    //   <Navigation />
    //   <Footer />
    // </div>
  );
};
export default App;
