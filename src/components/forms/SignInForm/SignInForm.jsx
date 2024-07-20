import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Navigate } from "react-router-dom";
import * as Yup from "yup";

const initialValues = {
  email: "",
  password: "",
  rememberMe: false,
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid Email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  rememberMe: Yup.boolean(),
});

export default function SignInForm() {

  const handleSignInSubmit = async (values) => {
    console.log("Sign in form values", values);
    sessionStorage.setItem("isLoggedIn", 1);
    return <Navigate to={"/home"} />;
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            helperText={<ErrorMessage name="email" />}
            autoFocus
          />
          <Field
            as={TextField}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            helperText={<ErrorMessage name="password" />}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={
              <Checkbox name="rememberMe" color="primary" onChange={() => {}} />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Form>
      )}
    </Formik>
  );
}
