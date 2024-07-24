import { useState } from "react";
import { useAppDispatch } from "../store";
import { loginUser } from "../Slices/loginSlice";

interface LoginForm {
  username: string;
  password: string;
}

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<LoginForm>({
    username: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted with data:", formData);

    try {
      await dispatch(loginUser(formData));
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};
