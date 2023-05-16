import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { object, string } from "yup";
import { Button, Input } from "~/components";
import { configureApi } from "~/helpers/api.helper";
import { useAuth } from "~/features";
import { useNavigate } from "react-router-dom";

const schema = object({
  name: string().required().min(3),
});

const { add } = configureApi("brands");

export function AddBrand() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { accessToken, user } = useAuth();
  const navigate = useNavigate();

  async function handleAddBrand(data) {
    console.log(user);
    const newBrand = { ...data, userId: user.id };
    await toast.promise(add(newBrand, { accessToken }), {
      pending: "Adding a brand, please wait ...",
      success: "Your brand has been added.",
      error: {
        render: ({ data }) => data.message,
      },
    });

    navigate("/");
  }

  const bindToHookForm = {
    register,
    errors,
  };

  return (
    <>
      <h1>Add Brand</h1>
      <form className="pageForm" onSubmit={handleSubmit(handleAddBrand)}>
        <Input type="text" name="name" label="Brand Name" {...bindToHookForm} />
        <Button variant="primary" className="submitBtn">
          Add Brand
        </Button>
      </form>
    </>
  );
}
