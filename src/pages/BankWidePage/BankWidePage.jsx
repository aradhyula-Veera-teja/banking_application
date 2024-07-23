import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import PieChartCard from "../../components/PieChart/PieChartCard";
import PieChartCardLoader from "../../components/PieChart/PieChartCardLoader";
import PieChartNoData from "../../components/PieChart/PieChartNoData";
import { useQuery } from "react-query";
import { useState } from "react";
import getApiData from "../../API/utils/getApiData";
import { ages, salaries } from "./constants";
export default function HomePage() {
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");

  const {
    isFetching: ExpensesIsFetching,
    isError: ExpensesIsError,
    isLoading: ExpensesIsLoading,
    data: ExpensesData,
    isSuccess: ExpensesIsSuccess,
    refetch: ExpenseRefetch,
  } = useQuery(
    "bankwideexpenses",
    () => {
      return getApiData("/bankwideexpenses");
    },
    { refetchOnWindowFocus: false, enabled: false }
  );
  const {
    isFetching: ExpenditureIsFetching,
    isError: ExpenditureIsError,
    isLoading: ExpenditureIsLoading,
    data: ExpenditureData,
    isSuccess: ExpenditureIsSuccess,
    refetch: ExpenditureRefetch,
  } = useQuery(
    "bankwideexpenditure",
    () => {
      return getApiData("/bankwideexpenditure");
    },
    { refetchOnWindowFocus: false, enabled: false }
  );
  const {
    isFetching: InvestmentsIsFetching,
    isError: InvestmentsIsError,
    isLoading: InvestmentsIsLoading,
    data: InvestmentsData,
    isSuccess: InvestmentsIsSuccess,
    refetch: InvestmentsRefetch,
  } = useQuery(
    "bankwideinvestments",
    () => {
      return getApiData("/bankwideinvestments");
    },
    { refetchOnWindowFocus: false, enabled: false }
  );

  const handleAgeChange = (event) => {
    setAge(event.target.value);
    refetchData();
  };

  // utility function to refetch all data
  const refetchData = () => {
    ExpenseRefetch();
    InvestmentsRefetch();
    ExpenditureRefetch();
  };

  const handleSalaryChange = (event) => {
    setSalary(event.target.value);
    refetchData();
  };

  const pieChartItemClickHandler = (data, heading) => {
    console.log("pieChartItemClickHandler", data, heading);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography sx={{ pt: 1 }} variant="h4" gutterBottom align="center">
        Others page
      </Typography>
      <Grid container flexDirection={"column"} gap={3}>
        <Grid item>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <FormControl sx={{ width: "100%" }} fulWidth>
                <InputLabel id="bankWideAgeFilter">Age</InputLabel>
                <Select
                  fullWidth
                  labelId="bankWideAgeFilter"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleAgeChange}
                  disabled={
                    ExpensesIsFetching ||
                    ExpensesIsLoading ||
                    ExpenditureIsFetching ||
                    ExpenditureIsLoading ||
                    InvestmentsIsFetching ||
                    InvestmentsIsLoading
                  }
                >
                  {ages.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl sx={{ width: "100%" }} fulWidth>
                <InputLabel id="bankWideSalaryFilter">salary</InputLabel>
                <Select
                  fullWidth
                  labelId="bankWideSalaryFilter"
                  id="demo-simple-select"
                  value={salary}
                  label="salary"
                  onChange={handleSalaryChange}
                  disabled={
                    ExpensesIsFetching ||
                    ExpensesIsLoading ||
                    ExpenditureIsFetching ||
                    ExpenditureIsLoading ||
                    InvestmentsIsFetching ||
                    InvestmentsIsLoading
                  }
                >
                  {salaries.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            flexDirection="row"
            justifyContent={"space-around"}
            spacing={2}
            sx={{ pt: 2 }}
          >
            <Grid item>
              {(ExpensesIsFetching || ExpensesIsLoading) && (
                <PieChartCardLoader />
              )}
              {ExpensesIsError && <PieChartNoData />}
              {!ExpensesIsFetching &&
                !ExpensesIsLoading &&
                ExpensesIsSuccess && (
                  <PieChartCard
                    heading="Expenses"
                    pieChatData={ExpensesData.data}
                    onItemClickHandler={pieChartItemClickHandler}
                  />
                )}
            </Grid>
            <Grid item>
              {(InvestmentsIsFetching || InvestmentsIsLoading) && (
                <PieChartCardLoader />
              )}
              {InvestmentsIsError && <PieChartNoData />}
              {!InvestmentsIsFetching &&
                !InvestmentsIsLoading &&
                InvestmentsIsSuccess && (
                  <PieChartCard
                    heading="Investments"
                    pieChatData={InvestmentsData.data}
                    onItemClickHandler={pieChartItemClickHandler}
                  />
                )}
            </Grid>
            <Grid item>
              {(ExpenditureIsFetching || ExpenditureIsLoading) && (
                <PieChartCardLoader />
              )}
              {ExpenditureIsError && <PieChartNoData />}
              {!ExpenditureIsFetching &&
                !ExpenditureIsLoading &&
                ExpenditureIsSuccess && (
                  <PieChartCard
                    heading="Expenditure"
                    pieChatData={ExpenditureData.data}
                    onItemClickHandler={pieChartItemClickHandler}
                  />
                )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
