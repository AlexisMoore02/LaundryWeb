import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ForgotPassword from "pages/Auth/ForgotPassword";
import ChangePassword from "pages/Auth/ChangePassword";
import CreateAdmin from "pages/CreateAdmin/CreateAdmin";
import Laundry from "pages/laundry/laundry"; 
import Error from "pages/ErrorPage/ErrorPage";  
import Auth from "pages/Auth/Auth";

const AppRouter = () => {
    const loggedIn = useSelector((state) => state.auth.loggedIn);
  const role = useSelector((state) => state.auth.roles);
  const mustChangePassword = sessionStorage.getItem("mustChangePassword") === true;
  
  const hasAccess = (allowedRoles) => {
    return loggedIn && allowedRoles.includes(role);
  };

  return (
    <Router>
      <Routes>
        <Route path="/resetpassword" element={<ForgotPassword />} />
        <Route path="/error" element={<Error />} />

        {loggedIn ? (
          mustChangePassword ? (
            <>
              <Route path="/" element={<ChangePassword />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              {hasAccess(["Admin", "God"]) ? (
                <Route path="/" element={<Laundry />} />
              ) : (
                <Route path="/" element={<Navigate to="/error" replace />} />
              )}

              {hasAccess(["God"]) ? (
                <Route path="/createAdmin" element={<CreateAdmin />} />
              ) : (
                <Route path="/createAdmin" element={<Navigate to="/error" replace />} />
              )}
            </>
          )
        ) : (
          <Route path="/" element={<Auth />} />
        )}

        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
