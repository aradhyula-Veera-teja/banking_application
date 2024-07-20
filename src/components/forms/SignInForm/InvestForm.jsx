import { Button, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const initialValues = {
  Purpose: "",
  Term: "",
  rememberMe: false,
};

const validationSchema = Yup.object().shape({
  Purpose: Yup.string().required("Purpose is required"),
  Term: Yup.number("Term must be a number").required("Term is required"),
  Percentage: Yup.number("Percentage must be a number").required(
    "Percentage is required"
  ),
  Investment: Yup.number("Investment must be a number").required(
    "Investment is required"
  ),
});

export default function InvestForm({ onSubmitHandler }) {
  const handleSignInSubmit = async (values) => {
    console.log("Sign in form values", values);

    onSubmitHandler();
  };

  return (
    <Formik
      sx={{ mt: 1 }}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSignInSubmit}
    >
      {() => (
        <Form>
          <Field
            as={TextField}
            margin="normal"
            required
            fullWidth
            id="Purpose"
            label="Purpose of Goal."
            name="Purpose"
            helperText={<ErrorMessage name="Purpose" />}
            autoFocus
          />
          <Field
            as={TextField}
            margin="normal"
            required
            fullWidth
            name="Term"
            label="Term"
            id="Term"
            helperText={<ErrorMessage name="Term" />}
          />
          <Field
            as={TextField}
            margin="normal"
            required
            fullWidth
            name="Percentage"
            label="Percentage of amount growth"
            id="Percentage"
            helperText={<ErrorMessage name="Percentage" />}
          />
          <Field
            as={TextField}
            margin="normal"
            required
            fullWidth
            name="Investment"
            label="Investment Amount"
            id="Investment"
            helperText={<ErrorMessage name="Investment" />}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Invest
          </Button>
        </Form>
      )}
    </Formik>
  );
}
