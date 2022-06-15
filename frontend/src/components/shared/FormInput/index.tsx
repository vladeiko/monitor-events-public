import { TextFieldProps } from "@mui/material";
import { StyledTextField } from "./styles";

const FormInput = (props: TextFieldProps) => {
  return <StyledTextField {...props} />;
};

export default FormInput;
