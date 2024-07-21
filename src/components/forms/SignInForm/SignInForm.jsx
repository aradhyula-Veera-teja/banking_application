import {
  Alert,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useMutation } from "react-query";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import signInUser from "../../../API/ApiCalls/sigiInuser";

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
    mutate(values);
  };

  const navigate = useNavigate();

  const { isLoading, isError, mutate } = useMutation(signInUser, {
    onSuccess: (data) => {
      sessionStorage.setItem("userEmail", data.email);
      navigate("/home");
    },
  });

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
          {isError && <Alert severity="error">Error message</Alert>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled:isLoading
          >
            Sign In {isLoading && <CircularProgress />}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
