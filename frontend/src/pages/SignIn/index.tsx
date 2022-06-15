import React, { useState } from "react";
import FormInput from "../../components/shared/FormInput";
import Logo from "../../components/shared/Logo";
import { useAppDispatch } from "../../store/hooks";
import { signInThunk } from "../../store/slices/auth";
import {
  FormWrapper,
  LogoWrapper,
  PageWrapper,
  SubmitButton,
  WelcomeSubtitle,
  WelcomeTitle,
  WelcomeWrapper,
} from "./styles";

const SignInPage = () => {
  const dispatch = useAppDispatch();

  const [formValues, setFormValues] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: think how to make universal form validation
    if (!formValues.identifier || !formValues.password.length) {
      return;
    }

    dispatch(signInThunk(formValues));
  };

  // TODO: move to separate helper
  const checkIsEmpty = (fieldName: "identifier" | "password") => {
    if (formValues[fieldName].length) {
      return false;
    }

    return true;
  };

  return (
    <PageWrapper>
      <FormWrapper component="form" onSubmit={handleSubmit}>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <WelcomeWrapper>
          <WelcomeTitle>Sigin In</WelcomeTitle>
          <WelcomeSubtitle>Welcome! Sign in to continue</WelcomeSubtitle>
        </WelcomeWrapper>
        <FormInput
          id="identifier"
          name="identifier"
          label="E-mail/Username"
          variant="standard"
          onChange={handleChange}
          error={checkIsEmpty("identifier")}
          helperText={checkIsEmpty("identifier") && "This field is required"}
        />
        <FormInput
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          onChange={handleChange}
          error={checkIsEmpty("password")}
          helperText={checkIsEmpty("password") && "This field is required"}
        />
        <SubmitButton variant="contained" type="submit">
          Sign In
        </SubmitButton>
      </FormWrapper>
    </PageWrapper>
  );
};

export default SignInPage;
