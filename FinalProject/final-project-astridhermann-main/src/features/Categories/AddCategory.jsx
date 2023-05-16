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

const { add } = configureApi("category");

export function AddCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { accessToken, user } = useAuth();
  const navigate = useNavigate();

  async function handleAddCategory(data) {
    console.log(user);
    const newCategory = { ...data, userId: user.id };
    await toast.promise(add(newCategory, { accessToken }), {
      pending: "Adding a category, please wait ...",
      success: "Your category has been added.",
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
      <h1>Add Category</h1>
      <form className="pageForm" onSubmit={handleSubmit(handleAddCategory)}>
        <Input
          type="text"
          name="name"
          label="Category Name"
          {...bindToHookForm}
        />
        <Button variant="primary" className="submitBtn">
          Add Category
        </Button>
      </form>
    </>
  );
}
