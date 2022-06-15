import { Outlet } from "react-router-dom";
import { AuthLayoutWrapper } from "./styles";

const AuthLayout = () => {
  return (
    <AuthLayoutWrapper>
      <Outlet />
    </AuthLayoutWrapper>
  );
};

export default AuthLayout;
