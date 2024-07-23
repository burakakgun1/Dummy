import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./login";
import MainPage from "./mainpage";
import ProductsPage from "./ProductsPage";
import RecipesPage from "./RecipesPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/recipes" element={<RecipesPage />} />
      </Routes>
      <ToastContainer 
      autoClose={3000}/>
    </BrowserRouter>
  );
}

export default App;
