import React from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../locales/LanguageSelector";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const { formData, handleChange, handleSubmit } = useLogin();
  const navigate = useNavigate();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    await handleSubmit(event);
    navigate("/mainpage");
  };

  return (
    <div className="mt-4 d-flex flex-column justify-content-center align-items-center">
      <LanguageSelector />
      <h2 className="my-3">{t("login.title")}</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Control
            type="text"
            placeholder={t("login.username")}
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="my-3"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder={t("login.password")}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="my-3"
          />
        </Form.Group>

        <Button className="btn-lg my-3" variant="primary" type="submit">
        {t("login.title")}
        </Button>
      </Form>
    </div>
  );
};

export default Login;
