import { useEffect, useState } from "react";
import { ProductSkeleton } from "./ProductSkeleton";
import { configureApi } from "~/helpers/api.helper";
import styles from "./Product.module.css";
import { Link, useParams } from "react-router-dom";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ShoppingCartIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "~/components";
import { useAuth } from "~/features";

const { get: getProduct } = configureApi("products");
const { get: getBrand } = configureApi("brands");
const { get: getCategory } = configureApi("category");

export function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    async function loadData() {
      const product = await getProduct(id);
      const brand = await getBrand(product.brandId);
      const category = await getCategory(product.categoryId);
      setProduct(product);
      setBrand(brand);
      setCategory(category);
    }

    loadData();
  }, [id]);

  if (!product) {
    return <ProductSkeleton />;
  }

  return (
    <article>
      <h1>{product?.name}</h1>
      <div className={styles.productInfo}>
        <div>
          <label>Category:</label>
          <p key={category?.id}>{category?.name}</p>
        </div>
        <div>
          <label>Brand:</label>
          <p key={brand?.id}>{brand?.name}</p>
        </div>
        <img src={product?.picture} alt={`${product?.name}`} />
        <p className={styles.productInfoDescription}>{product?.description}</p>
        <div className={styles.priceStock}>
          <p>{product?.price} lei</p>
          <div className={styles.stock}>
            {product?.stock <= 0 && (
              <>
                <XCircleIcon width="20" color="#E50D0D" />
                <p>No stock</p>
              </>
            )}
            {product?.stock <= 10 && product?.stock > 0 && (
              <>
                <ExclamationCircleIcon width="20" color="#FCC419" />
                <p>Low in stock</p>
              </>
            )}
            {product?.stock > 10 && (
              <>
                <CheckCircleIcon width="20" color="#19B305" />
                <p>In stock</p>
              </>
            )}
          </div>
        </div>
        {user && user?.id === product.userId && (
          <Link
            className={styles.linkToEdit}
            to={`/products/edit/${product.id}`}
          >
            Edit this post
          </Link>
        )}
        {user && (
          <Button variant="primary" className="addToCartBtn">
            Add to Cart <ShoppingCartIcon width="20" />
          </Button>
        )}
      </div>
    </article>
  );
}
