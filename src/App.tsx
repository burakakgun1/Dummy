import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/mainpage";
import ProductsList from "./pages/ProductsList";
import RecipesList from "./pages/RecipesList";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoginList from "./pages/LoginList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginList />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/recipes" element={<RecipesList />} />
      </Routes>
      <ToastContainer 
      autoClose={3000}/>
    </BrowserRouter>
  );
}

export default App;
