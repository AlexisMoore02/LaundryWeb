import React, { useState, useEffect } from "react";
import { CiUser, CiMail } from "react-icons/ci"; 
import AuthForm from "./AuthForm";

const ForgotPassword = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    setError("");
  }, [user, email]);

  const handleResetPassword = async () => {
    // TO DO REQUEST
  };

  return (
    <>
      <AuthForm
        title="Восстановление пароля"
        fields={[
          {
            label: "Логин",
            type: "text",
            name: "username",
            placeholder: "#login",
            icon: CiUser,
            value: user,
            onChange: (e) => setUser(e.target.value),
          },
          {
            label: "Эл.адрес",
            type: "email",
            name: "email",
            placeholder: "#email",
            icon: CiMail,
            value: email,
            onChange: (e) => setEmail(e.target.value),
          },
        ]}
        onSubmit={handleResetPassword}
        error={error}
        link={"/"}
        textLink={'   Вернуться на страницу входа'}
      >
        Отправить
      </AuthForm>
    </>
  );
};

export default ForgotPassword;
