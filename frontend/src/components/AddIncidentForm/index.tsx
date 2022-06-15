import { Box, Button, MenuItem } from "@mui/material";
import { useState } from "react";
import { axiosService } from "../../services/axios";
import { useAppSelector } from "../../store/hooks";
import FormInput from "../shared/FormInput";

interface AddIncidentFormProps {
  submitCallback?: () => void;
}

const AddIncidentForm = (props: AddIncidentFormProps) => {
  const { submitCallback } = props;

  const instances = useAppSelector((state) => state.instances.instances);
  const currentEvent = useAppSelector((state) => state.events.currentEvent);
  const user = useAppSelector((state) => state.auth.user);

  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    instance: instances[0]?.id || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    // TODO: think how to make universal form validation
    if (!formValues.name) {
      return;
    }

    setIsLoading(true);

    const data = {
      ...formValues,
      author: user?.id,
      event: currentEvent?.id,
    };

    axiosService.post("/incidents", { data }).then((res) => {
      setIsLoading(false);
      setFormValues({
        name: "",
        description: "",
        instance: formValues.instance,
      });

      if (submitCallback) submitCallback();
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <FormInput
        id="name"
        name="name"
        label="Title"
        variant="filled"
        value={formValues.name}
        onChange={handleChange}
        required
      />
      <FormInput
        id="description"
        name="description"
        label="Description"
        variant="filled"
        multiline
        rows={4}
        value={formValues.description}
        onChange={handleChange}
      />
      {!!instances.length && (
        <FormInput
          id="instance"
          name="instance"
          select
          label="Instance"
          helperText="Please select instance"
          variant="filled"
          defaultValue={instances[0].id}
          value={formValues.instance}
          onChange={handleChange}
        >
          {instances.map((instance) => (
            <MenuItem key={instance.id} value={instance.id}>
              {instance.name}
            </MenuItem>
          ))}
        </FormInput>
      )}
      <Button
        variant="contained"
        sx={{ marginTop: "16px", width: "100%" }}
        type="submit"
      >
        Submit
      </Button>
    </Box>
  );
};

export default AddIncidentForm;
