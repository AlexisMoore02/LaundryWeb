import React, { useState, useEffect } from "react";
import { CiLock } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [fieldsState, setFieldsState] = useState({ oldPassword: "", newPassword: "" });

  useEffect(() => {
    setError("");
  }, [fieldsState]);

  const handleSubmit = async () => {
    sessionStorage.setItem("mustChangePassword", false);
    // TO DO REQUEST
    navigate("/");
  };

  return (
    <AuthForm
      title="Изменение пароля"
      fields={[
        {
          label: "Старый пароль",
          type: "password",
          name: "oldPassword",
          placeholder: "#oldpassword",
          icon: CiLock,
          value: fieldsState.oldPassword,
          onChange: (e) => setFieldsState({ ...fieldsState, oldPassword: e.target.value }),
        },
        {
          label: "Новый пароль",
          type: "password",
          name: "newPassword",
          placeholder: "#newpassword",
          icon: CiLock,
          value: fieldsState.newPassword,
          onChange: (e) => setFieldsState({ ...fieldsState, newPassword: e.target.value }),
        },
      ]}
      onSubmit={handleSubmit}
      error={error}
    >
      Сохранить
    </AuthForm>
  );
};

export default ChangePassword;
