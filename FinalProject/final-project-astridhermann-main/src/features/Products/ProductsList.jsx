import { useEffect, useState } from "react";
import styles from "./Product.module.css";
import { configureApi } from "../../helpers/api.helper";
import { ProductCard } from "./ProductCard";

const { get } = configureApi("products");

export function ProductsList() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    get().then((data) => setProducts(data));
  }, []);

  return (
    <section className={styles.productsList}>
      <h2 className={styles.fullWidth}>Product list</h2>
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
