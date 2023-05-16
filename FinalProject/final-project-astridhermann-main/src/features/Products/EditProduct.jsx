import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { number, object, string } from "yup";
import { Button, Input, Select, Textarea } from "~/components";
import { configureApi } from "~/helpers/api.helper";
import { useAuth } from "~/features";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowPathIcon, TrashIcon } from "@heroicons/react/24/outline";

const { update } = configureApi("products");
const { remove } = configureApi("products");
const { get: getProduct } = configureApi("products");

const schema = object({
  picture: string().required().url(),
  description: string().min(30),
  price: number().min(0),
  stock: number("Please provide a valid number of items in scotck.").min(1),
  // brandId: number().positive(),
  // categoryId: number().positive(),
});

export function EditProduct() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  console.log("edit product");

  useEffect(() => {
    async function loadData() {
      const product = await getProduct(id);
      setProduct(product);
    }

    loadData();
  }, [id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { accessToken, user } = useAuth();
  const navigate = useNavigate();

  async function handleUpdateProduct(data) {
    console.log("update clicked");
    const newValuesForProduct = { ...data, userId: user.id };
    console.log(id);
    await toast.promise(update(id, newValuesForProduct, { accessToken }), {
      pending: "Updating a product, please wait ...",
      success: "Your product has been updated.",
      error: {
        render: ({ data }) => data.message,
      },
    });
    navigate("/products");
  }

  async function handleDeleteProduct() {
    await toast.promise(remove(id, { accessToken }));
    navigate("/products");
  }

  const bindToHookForm = {
    register,
    errors,
  };

  return (
    <>
      <h1>Edit Product {product?.name}</h1>
      <form className="pageForm" onSubmit={handleSubmit(handleUpdateProduct)}>
        <Input
          type="url"
          name="picture"
          label="Picture"
          defaultValue={product?.picture}
          {...bindToHookForm}
        />

        <Textarea
          name="description"
          label="Description"
          defaultValue={product?.description}
          {...bindToHookForm}
        />

        <Input
          type="number"
          min="0"
          step="0.01"
          name="price"
          label="Price (Lei)"
          defaultValue={product?.price}
          {...bindToHookForm}
        />

        <Input
          type="number"
          min="1"
          name="stock"
          label="Ammount"
          defaultValue={product?.stock}
          {...bindToHookForm}
        />
        {/* 
        <Select
          name="brandId"
          label="Brand"
          {...bindToHookForm}
          defaultValue={product?.brandId}
        >
          {brands?.map((br) => (
            <option value={br.id}>{br.name}</option>
          ))}
        </Select>

        <Select
          name="categoryId"
          label="Category"
          {...bindToHookForm}
          defaultValue={product?.categoryId}
        >
          {categories?.map((cat) => (
            <option value={cat.id}>{cat.name}</option>
          ))}
        </Select> */}

        <Button variant="primary" className="submitBtn">
          <ArrowPathIcon width={20}></ArrowPathIcon>
          Update Product
        </Button>
        <Button
          variant="secondary"
          className="deleteBtn"
          onClick={handleDeleteProduct}
        >
          <TrashIcon width={20}></TrashIcon>
          Delete Product
        </Button>
      </form>
    </>
  );
}
