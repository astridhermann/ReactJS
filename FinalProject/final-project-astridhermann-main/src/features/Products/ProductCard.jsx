import { Link } from "react-router-dom";
import styles from "./Product.module.css";

export function ProductCard({ product }) {
  return (
    <article className={styles.productCard}>
      <Link to={`${product?.id}`}>
        <img src={product?.picture} alt={`Image for ${product?.name}`} />
        <h3>{product.name}</h3>
      </Link>
    </article>
  );
}
