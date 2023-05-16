import { NavLink, Route, Routes } from "react-router-dom";
import { AddProduct, ProductDetails, ProductsList } from "~/features";
import styles from "./Product.module.css";

export function ProductsLayout() {
  console.log("hello");
  return (
    <>
      <nav className={styles.nav}>
        <h1>Products</h1>
        <NavLink to="add">Add a Product</NavLink>
      </nav>
      <Routes>
        <Route index element={<ProductsList />} />
        <Route path=":productId" element={<ProductDetails />} />
        <Route path="add" element={<AddProduct />} />
      </Routes>
    </>
  );
}
