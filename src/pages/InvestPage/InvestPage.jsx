import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
  useTheme,
} from "@mui/material";
import InvestForm from "../../components/forms/SignInForm/InvestForm";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";
import TableLoader from "../../components/Loaders/TableLoader";
import getInvestmentsTableData from "../../API/ApiCalls/getInvestmentsTableData";
import { useQuery } from "react-query";
import SavingsIcon from "@mui/icons-material/Savings";

export default function InvestPage() {
  const theme = useTheme();
  const { isFetching, isError, isLoading, data, isSuccess, refetch } = useQuery(
    "InvestmentsTable",
    getInvestmentsTableData,
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );
  return (
    <Grid container sx={{ p: 3 }} flexDirection={"row"} spacing={4}>
      <Grid item xs={3}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2, mt: 3 }}>
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
            <SavingsIcon />
          </Avatar>
        </Box>
        <InvestForm
          onSubmitHandler={() => {
            refetch();
          }}
        />
      </Grid>
      <Grid item flex={1}>
        {(isFetching || isLoading) && <TableLoader />}
        {isError && (
          <Typography variant="h4" align="center">
            Some error while fetching details. Please try again later
          </Typography>
        )}
        {isSuccess && (
          <TableContainer
            component={Paper}
            elevation={3}
            sx={{ maxHeight: 500 }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>LABEL</TableCell>
                  <TableCell>VALUE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.data.map((item) => (
                  <TableRow key={item.label}>
                    <TableCell>{item.label}</TableCell>
                    <TableCell>{item.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  );
}
