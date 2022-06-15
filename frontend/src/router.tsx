import { useEffect, useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { savedToken } from "./constants/savedToken";
import AuthLayout from "./layouts/Auth";
import EventLayout from "./layouts/Event";
import ProfileLayout from "./layouts/Profile";
import EventPage from "./pages/Event";
import ProfilePage from "./pages/Profile";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import { setAxiosToken } from "./services/axios";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchUserInfoThunk } from "./store/slices/auth";

const Router = () => {
  const dispatch = useAppDispatch();

  const isAuthoreized = useAppSelector((state) => state.auth.isAuthorized);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (isAuthoreized && !user) {
      setAxiosToken(savedToken);
      dispatch(fetchUserInfoThunk());
    }
  }, [dispatch, isAuthoreized, user]);

  const routes = useMemo(() => {
    if (isAuthoreized) {
      return (
        <>
          <Route path="/" element={<Navigate to="/profile" />} />
          <Route path="/" element={<ProfileLayout />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Navigate to="profile" />} />
          </Route>
          <Route path="/" element={<EventLayout />}>
            <Route path="event" element={<EventPage />} />
          </Route>
        </>
      );
    }

    return (
      <>
        <Route path="/" element={<Navigate to="/sign-in" />} />
        <Route path="/" element={<AuthLayout />}>
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="*" element={<Navigate to="/sign-in" />} />
        </Route>
      </>
    );
  }, [isAuthoreized]);

  return (
    <BrowserRouter>
      <Routes>{routes}</Routes>
    </BrowserRouter>
  );
};

export default Router;
