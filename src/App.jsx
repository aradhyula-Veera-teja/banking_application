import {
  AppBar,
  Avatar,
  Box,
  Button,
  Grid,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import SingInPage from "./pages/SingInPage/SingInPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import MaintenancePage from "./pages/MaintenancePage/MaintenancePage";
import FixedFooter from "./components/FixedFooter/FixedFooter";
import HomePage from "./pages/HomePage/HomePage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import InvestPage from "./pages/InvestPage/InvestPage";

function App() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <AppBar
        sx={{
          background: theme.palette.primary.main,
          padding: "0 27px 0 22px !important",
          height: "75px",
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              color: "white",
            }}
          >
            <Typography>LLOYDS BANK</Typography>
            <Stack direction={"row"} spacing={2}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  navigate("/home");
                }}
              >
                Home
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/invest");
                }}
              >
                Invest
              </Button>
              <Avatar sx={{}}></Avatar>
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Grid container flexDirection={"column"} sx={{ flex: 1 }}>
        <Grid>
          <Routes>
            <Route
              path="/"
              exact
              element={
                sessionStorage.getItem("isLoggedIn") === "1" ? (
                  <HomePage />
                ) : (
                  <SingInPage />
                )
              }
            />
            <Route
              path="/home"
              exact
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/invest"
              exact
              element={
                <ProtectedRoute>
                  <InvestPage />
                </ProtectedRoute>
              }
            />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="/500" element={<ErrorPage />} />
            <Route path="/maintenance" element={<MaintenancePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Grid>
        <Grid item sx={{ position: "sticky", bottom: "0" }}>
          <FixedFooter />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
