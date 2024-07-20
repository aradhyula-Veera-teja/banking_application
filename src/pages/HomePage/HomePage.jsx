// import {  } from "@mui/material";

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
} from "@mui/material";
import PieChartCard from "../../components/PieChart/PieChartCard";
import PieChartCardLoader from "../../components/PieChart/PieChartCardLoader";
import PieChartNoData from "../../components/PieChart/PieChartNoData";
import { useQuery } from "react-query";
import getExpenses from "../../API/ApiCalls/getExpenses";
import getExpenditure from "../../API/ApiCalls/getExpenditure";
import getInvestments from "../../API/ApiCalls/getInvestments";
import getInvestmentsTableData from "../../API/ApiCalls/getInvestmentsTableData";
import TableLoader from "../../components/Loaders/TableLoader";
// import PieChartCard from "../../components/PieChart/PieChartCard";
// import PieChartCardLoader from "../../components/PieChart/PieChartCardLoader";

export default function HomePage() {
  const {
    isFetching: ExpensesIsFetching,
    isError: ExpensesIsError,
    isLoading: ExpensesIsLoading,
    data: ExpensesData,
    isSuccess: ExpensesIsSuccess,
  } = useQuery("Expenses", getExpenses, { refetchOnWindowFocus: false });
  const {
    isFetching: ExpenditureIsFetching,
    isError: ExpenditureIsError,
    isLoading: ExpenditureIsLoading,
    data: ExpenditureData,
    isSuccess: ExpenditureIsSuccess,
  } = useQuery("Expenditure", getExpenditure, { refetchOnWindowFocus: false });
  const {
    isFetching: InvestmentsIsFetching,
    isError: InvestmentsIsError,
    isLoading: InvestmentsIsLoading,
    data: InvestmentsData,
    isSuccess: InvestmentsIsSuccess,
  } = useQuery("Investments", getInvestments, { refetchOnWindowFocus: false });

  const {
    isFetching: tableIsFetching,
    isError: tableIsError,
    isLoading: tableIsLoading,
    data: tableData,
    isSuccess: tableIsSuccess,
    refetch: tableRefetch,
  } = useQuery("InvestmentsTable", getInvestmentsTableData, {
    enabled: false,
    refetchOnWindowFocus: false,
  });
  const pieChartItemClickHandler = (data) => {
    console.log("pieChartItemClickHandler", data);
    tableRefetch();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container flexDirection={"column"} gap={3}>
        <Grid item>
          <Grid
            container
            flexDirection="row"
            justifyContent={"space-around"}
            spacing={2}
          >
            <Grid item>
              {(ExpensesIsFetching || ExpensesIsLoading) && (
                <PieChartCardLoader />
              )}
              {ExpensesIsError && <PieChartNoData />}
              {ExpensesIsSuccess && (
                <PieChartCard
                  heading="Expenses"
                  pieChatData={ExpensesData.data}
                  onItemClickHandler={pieChartItemClickHandler}
                />
              )}
            </Grid>
            <Grid item>
              {(ExpenditureIsFetching || ExpenditureIsLoading) && (
                <PieChartCardLoader />
              )}
              {ExpenditureIsError && <PieChartNoData />}
              {ExpenditureIsSuccess && (
                <PieChartCard
                  heading="Expenditure"
                  pieChatData={ExpenditureData.data}
                  onItemClickHandler={pieChartItemClickHandler}
                />
              )}
            </Grid>
            <Grid item>
              {(InvestmentsIsFetching || InvestmentsIsLoading) && (
                <PieChartCardLoader />
              )}
              {InvestmentsIsError && <PieChartNoData />}
              {InvestmentsIsSuccess && (
                <PieChartCard
                  heading="Investments"
                  pieChatData={InvestmentsData.data}
                  onItemClickHandler={pieChartItemClickHandler}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {(tableIsFetching || tableIsLoading) && <TableLoader />}
          {tableIsError && (
            <Typography variant="h4" align="center">
              Some error while fetching details. Please try again later
            </Typography>
          )}
          {tableIsSuccess && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>LABEL</TableCell>
                    <TableCell>VALUE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.data.map((item) => (
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
    </Box>
  );
}