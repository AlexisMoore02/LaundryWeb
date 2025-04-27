import React, { useState, useEffect } from "react";
import { CiUser, CiLock } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginFailure, loginSuccess } from "store/actions/authActions";
import { handleActionForError } from "store/actions/errorActions"; 
import fetchData from "services/fetchData";
import AuthForm from "./AuthForm";

const MY_API = process.env.REACT_APP_USER_API;

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(null);

  sessionStorage.setItem("mustChangePassword", true);

  useEffect(() => {
    setError("");
  }, [user, pwd]);

  const handleLogin = async () => {
    fetchData({
      url: `${MY_API}/check_admin?login=${user}&passw=${pwd}`,
      method: "POST",
      successCallback: (js) => {
        if (js.errcode === 0) {
          handleRoles(user, pwd);
        } else {
          setError(handleActionForError(js.errcode).content);
        }
      },
      errorCallback: (err) => {
        setError(handleActionForError(err).content);
      },
      finalCallback: () => {},
    });
  };

  const handleRoles = async (user, pwd) => {
    fetchData({
      url: `${MY_API}/check_role?login=${user}&passw=${pwd}`,
      method: "POST",
      successCallback: (js) => {
        if (js.errcode === 0) {
          const roles = js.result.roles;
          const botAccessList = Object.entries(js.result.bot_access).map(
            ([id, value]) => ({ id: parseInt(id), value })
          );
          sessionStorage.setItem(
            "botAccess",
            JSON.stringify({ bot_access: botAccessList })
          );
          dispatch(loginSuccess(roles));
          navigate("/");
        } else {
          dispatch(loginFailure());
        }
      },
      errorCallback: () => dispatch(loginFailure()),
      finalCallback: () => {},
    });
  };

  return (
    <>
      <AuthForm
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
            label: "Пароль",
            type: "password",
            name: "password",
            placeholder: "#password",
            icon: CiLock,
            value: pwd,
            onChange: (e) => setPwd(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleLogin();
              }
            },
          },
        ]}
        onSubmit={handleLogin}
        error={error}
        link={"/resetpassword"}
        textLink={'Забыли пароль?'}
      >
        Вход
      </AuthForm>
           
    </>
  );
};

export default Auth;
