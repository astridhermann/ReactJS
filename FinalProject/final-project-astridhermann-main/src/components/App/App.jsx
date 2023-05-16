import { Routes, Route } from "react-router-dom";

import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Auth,
  AuthContextProvider,
  AddProduct,
  AddCategory,
  AddBrand,
  Home,
  ProductDetails,
  ProductsList,
  EditProduct,
} from "../../features";
import { Nav } from "../";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";

export function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route
            path="/products/add"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/brands/add"
            element={
              <ProtectedRoute>
                <AddBrand />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categories/add"
            element={
              <ProtectedRoute>
                <AddCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/edit/:id"
            element={
              <ProtectedRoute>
                <EditProduct />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </AuthContextProvider>
  );
}
