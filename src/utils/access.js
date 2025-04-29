export const hasAccess = (loggedIn, role, allowedRoles) => {
    return loggedIn && allowedRoles.includes(role);
  };
  