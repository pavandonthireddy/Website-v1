import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  createMuiTheme,
  withStyles,
  ThemeProvider
} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getData } from "../getData/index";
import ClassificationTable from "../table/ClassificationTable";
import FactorTable from "../table/FactorTable";
import Density from "../graph/Density";
import BootstrapGraph from "../graph/BootstrapGraph";
import { green } from "@material-ui/core/colors";

const styles = {
  card: {
    border: "2px solid rgb(3, 28, 48)"
  },
  content: {
    padding: 25
  },
  root: {
    justifyContent: "center"
  },
  input5: {
    color: "white"
  },
  root5: {
    background: "rgb(3, 28, 48)"
  },
  genButton: {
    color: "white",
    backgroundColor: "purple",
    "&:hover": {
      backgroundColor: "purple"
    },
    marginTop: 40
  }
};
const theme = createMuiTheme({
  palette: {
    primary: green
  }
});

export class HypoTest extends Component {
  state = {
    portfolio: "US_TOP_500_LIQUID",
    neutralization: "DOLLAR",
    startDate: "2004-01-01",
    endDate: "2019-01-01",
    startingValue: 20000000,
    longLeverage: 0.5,
    shortLeverage: 0.5,
    costThresholdBps: 5,
    advThreshold: 10,
    commissionBps: 0.1,
    strategyExpression:
      "mean(rank(Volume)*(gauss_filter(High,5)-gauss_filter(Open,5)),5)",
    graphData: "",
    status: ""
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSimulate = () => {
    console.log(this.state);
    const {
      startDate,
      endDate,
      portfolio,
      neutralization,
      longLeverage,
      shortLeverage,
      startingValue,
      costThresholdBps,
      advThreshold,
      commissionBps,
      strategyExpression
    } = this.state;
    const plotParams = {
      startDate,
      endDate,
      portfolio,
      neutralization,
      longLeverage,
      shortLeverage,
      startingValue,
      costThresholdBps,
      advThreshold,
      commissionBps,
      strategyExpression
    };
    getData(plotParams).then(data => {
      if (data.error) {
        this.setState({ error: data.error, loading: false });
      } else {
        console.log(data);
        this.setState({ graphData: data["result"], status: data["status"] });
      }
    });
  };
  render() {
    const { classes } = this.props;
    const {
      startDate,
      endDate,
      portfolio,
      neutralization,
      startingValue,
      longLeverage,
      shortLeverage,
      advThreshold,
      commissionBps,
      costThresholdBps,
      strategyExpression,
      graphData,
      status
    } = this.state;
    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <h4>
              <strong>Settings:</strong>
            </h4>
            <Card className={classes.card}>
              <CardContent className={classes.content}>
                <TextField
                  type="date"
                  name="startDate"
                  label="Start Date"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={startDate}
                  onChange={this.handleChange}
                  min="1994-01-01"
                />
                <TextField
                  name="endDate"
                  type="date"
                  label="End Date"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  onChange={this.handleChange}
                  value={endDate}
                />
                <FormControl variant="filled" fullWidth>
                  <InputLabel>Portfolio</InputLabel>
                  <Select
                    name="portfolio"
                    value={portfolio}
                    onChange={this.handleChange}
                  >
                    <MenuItem value={"Basic Industries"}>
                      Basic Industries
                    </MenuItem>
                    <MenuItem value={"Capital Goods"}>Capital Goods</MenuItem>
                    <MenuItem value={"Consumer Durables"}>
                      Consumer Durables
                    </MenuItem>
                    <MenuItem value={"Consumer Non Durables"}>
                      Consumer Non Durables
                    </MenuItem>
                    <MenuItem value={"Consumer Services"}>
                      Consumer Services
                    </MenuItem>
                    <MenuItem value={"Energy"}>Energy</MenuItem>
                    <MenuItem value={"Finance"}>Finance</MenuItem>
                    <MenuItem value={"Large Cap"}>Large Cap</MenuItem>
                    <MenuItem value={"Mid Cap"}>Mid Cap</MenuItem>
                    <MenuItem value={"Public Utilities"}>
                      Public Utilities
                    </MenuItem>
                    <MenuItem value={"Small Cap"}>Small Cap</MenuItem>
                    <MenuItem value={"Technology"}>Technology</MenuItem>
                    <MenuItem value={"Transportation"}>Transportation</MenuItem>
                    <MenuItem value={"US_TOP_500_LIQUID"}>
                      US_TOP_500_LIQUID
                    </MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  name="startingValue"
                  type="number"
                  label="Starting Value"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={startingValue}
                  onChange={this.handleChange}
                  max="200000000"
                  min="1000000"
                />

                <FormControl variant="filled" fullWidth>
                  <InputLabel>Neutralization</InputLabel>
                  <Select
                    name="neutralization"
                    value={neutralization}
                    onChange={this.handleChange}
                  >
                    <MenuItem value="DOLLAR">DOLLAR</MenuItem>
                    <MenuItem value="SECTOR">SECTOR</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  name="longLeverage"
                  type="number"
                  label="Long Leverage"
                  variant="outlined"
                  fullWidth
                  onChange={this.handleChange}
                  margin="normal"
                  value={longLeverage}
                  step="0.01"
                />
                <TextField
                  name="shortLeverage"
                  type="number"
                  label="Short Leverage"
                  variant="outlined"
                  fullWidth
                  onChange={this.handleChange}
                  margin="normal"
                  value={shortLeverage}
                />
                <TextField
                  name="costThresholdBps"
                  type="number"
                  label="Cost threshold bps"
                  variant="outlined"
                  fullWidth
                  onChange={this.handleChange}
                  margin="normal"
                  value={costThresholdBps}
                />
                <TextField
                  name="advThreshold"
                  type="number"
                  label="ADV threshold %"
                  variant="outlined"
                  fullWidth
                  onChange={this.handleChange}
                  margin="normal"
                  value={advThreshold}
                />
                <TextField
                  name="commissionBps"
                  type="number"
                  label="Commissions bps"
                  variant="outlined"
                  fullWidth
                  onChange={this.handleChange}
                  margin="normal"
                  value={commissionBps}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={9}>
            <h4>
              <strong>Strategy:</strong>
            </h4>
            <Card
              className={classes.card}
              style={{ minHeight: "720px", maxHeight: "" }}
            >
              <CardContent className={classes.content}>
                <TextField
                  name="strategyExpression"
                  label="Strategy"
                  multiline
                  rows="30"
                  value={strategyExpression}
                  variant="outlined"
                  fullWidth
                  onChange={this.handleChange}
                />
              </CardContent>
            </Card>
            <div className="mt-5" style={{ textAlign: "center" }}>
              <ThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleSimulate}
                  style={{ width: "15%" }}
                >
                  Simulate
                </Button>
              </ThemeProvider>
            </div>
          </Grid>
        </Grid>
        <hr />
        {graphData && (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {status && <h6>Status: {status}</h6>}
              </Grid>
              <Grid item xs={8}>
                <h4>
                  <strong>Equity Curves:</strong>
                </h4>
                <Card
                  className={classes.card}
                  style={{ minHeight: 600, maxHeight: 600 }}
                >
                  <CardContent className={classes.content}>
                    <Density curvesData={graphData["PLOT_CURVES_DATA"]} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <h4>
                  <strong>Bootstrap Results:</strong>
                </h4>

                <Card
                  className={classes.card}
                  style={{ minHeight: 600, maxHeight: 600 }}
                >
                  <CardContent className={classes.content}>
                    <h5 style={{ textAlign: "center" }}>
                      Distribution of Geometric mean
                    </h5>
                    <BootstrapGraph
                      data={graphData["SHARPE_BS"]}
                      avm={graphData["SHARPE_BS_GEOM_AVG"]}
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item container xs={12}>
                <Grid item xs={1}></Grid>
                <Grid item xs={2} style={{ textAlign: "center" }}>
                  <h5>CUMMULATIVE_RETURN</h5>
                  <Button
                    disabled
                    style={{
                      backgroundColor: "#031c30",
                      color: "white",
                      width: "50%"
                    }}
                  >
                    {graphData["CUMMULATIVE_RETURN"]}
                  </Button>
                </Grid>
                <Grid item xs={2} style={{ textAlign: "center" }}>
                  <h5>MDD_STRATEGY</h5>
                  <Button
                    disabled
                    style={{
                      backgroundColor: "#031c30",
                      color: "white",
                      width: "50%"
                    }}
                  >
                    {graphData["MDD_STRATEGY"]}
                  </Button>
                </Grid>
                <Grid item xs={2} style={{ textAlign: "center" }}>
                  <h5>INFORMATION_RATIO</h5>
                  <Button
                    disabled
                    style={{
                      backgroundColor: "#031c30",
                      color: "white",
                      width: "50%"
                    }}
                  >
                    {graphData["INFORMATION_RATIO"]}
                  </Button>
                </Grid>
                <Grid item xs={2} style={{ textAlign: "center" }}>
                  <h5>PROBABILISTIC_SR_GE_1</h5>
                  <Button
                    disabled
                    style={{
                      backgroundColor: "#031c30",
                      color: "white",
                      width: "50%"
                    }}
                  >
                    {graphData["PROBABILISTIC_SR_GE_1"]}
                  </Button>
                </Grid>
                <Grid item xs={2} style={{ textAlign: "center" }}>
                  <h5>RACHEV_RATIO</h5>
                  <Button
                    disabled
                    style={{
                      backgroundColor: "#031c30",
                      color: "white",
                      width: "50%"
                    }}
                  >
                    {graphData["RACHEV_RATIO"]}
                  </Button>
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
            </Grid>

            <hr />

            <Grid container spacing={3}>
              <Grid item xs={4}>
                <h4 className="mb-3">PERFORMANCE MEASURES:</h4>
                <table class="table table-borderless">
                  <tbody>
                    <tr>
                      <td>
                        <strong>ANNUALIZED_MEAN_RETURN</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["ANNUALIZED_MEAN_RETURN"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>CAGR_BENCHMARK</strong>:
                      </td>
                      <td>:</td>
                      <td>{graphData["CAGR_BENCHMARK"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>CAGR_STRATEGY</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["CAGR_STRATEGY"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>HIT_RATIO</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["HIT_RATIO"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>MIN_TRL_SRGE1_99%</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["MIN_TRL_SRGE1_99%"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>MIN_TRL_SRGE2_99%</strong>:
                      </td>
                      <td>:</td>
                      <td>{graphData["MIN_TRL_SRGE2_99%"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>MIN_TRL_SRGE3_99%</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["MIN_TRL_SRGE3_99"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>PNL_FROM_LONG:</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["PNL_FROM_LONG"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>PNL_FROM_STRATEGY:</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["PNL_FROM_STRATEGY"]}</td>
                    </tr>
                  </tbody>
                </table>
              </Grid>
              <Grid item xs={4}>
                <h4 className="mb-3">EFFICIENCY MEASURES:</h4>
                <table class="table table-borderless">
                  <tbody>
                    <tr>
                      <td>
                        <strong>GM_BOOTSTRAP_p_val</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["GM_BOOTSTRAP_p_val"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>MAR_RATIO</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["MAR_RATIO"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>OMEGA_RATIO</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["OMEGA_RATIO"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>PROBABILISTIC_SR_GE_2</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["PROBABILISTIC_SR_GE_2"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>PROBABILISTIC_SR_GE_3</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["PROBABILISTIC_SR_GE_3"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>p-VALUE</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["p-VALUE"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>SHARPE_RATIO</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["SHARPE_RATIO"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>SIGNIFICANCE_AT_0.01%:</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["SIGNIFICANCE_AT_001%:"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>SORTINO_RATIO</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["SORTINO_RATIO"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>TAIL_RATIO</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["TAIL_RATIO"]}</td>
                    </tr>
                  </tbody>
                </table>
              </Grid>
              <Grid item xs={4}>
                <h4 className="mb-3">RISK MEASURES:</h4>
                <table class="table table-borderless">
                  <tbody>
                    <tr>
                      <td>
                        <strong>ANNUALIZED_VOLATILITY</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["ANNUALIZED_VOLATILITY"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>ANNUALIZED_VOLATILITY</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["ANNUALIZED_VOLATILITY"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>HHI_PLUS</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["HHI_PLUS"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>KURTOSIS</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["KURTOSIS"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>MDD_BENCHMARK</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["MDD_BENCHMARK"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>MDD_STRATEGY</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["MDD_STRATEGY"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>SKEWNESS</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["SKEWNESS"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>TRACKING_ERROR</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["TRACKING_ERROR"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>VaR_999</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["VaR_999"]}</td>
                    </tr>
                  </tbody>
                </table>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={5}>
                <h4 className="mb-3">CLASSIFICATION METRICS:</h4>
                <ClassificationTable data={graphData["CLASSIFICATION_DATA"]} />
              </Grid>
              <Grid item xs={7}>
                <h4 className="mb-3">FACTOR ANALYSIS:</h4>
                <FactorTable data={graphData["FACTOR_RES"]} />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <h4>GENERAL CHARACTERISTICS:</h4>
              </Grid>
              <Grid item xs={6}>
                <table class="table table-borderless">
                  <tbody>
                    <tr>
                      <td>
                        <strong>START_DATE</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["START_DATE"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>END_DATE</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["END_DATE"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>TIME_RANGE_DAYS</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["TIME_RANGE_DAYS"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>TOTAL_BARS</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["TOTAL_BARS"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>AVERAGE_AUM</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["AVERAGE_AUM"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>AVERAGE_DAILY_TURNOVER</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["AVERAGE_DAILY_TURNOVER"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>START_DATE</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["START_DATE"]}</td>
                    </tr>
                  </tbody>
                </table>
              </Grid>
              <Grid item xs={6}>
                <table class="table table-borderless">
                  <tbody>
                    <tr>
                      <td>
                        <strong>AVERAGE_POSITION_SIZE</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["AVERAGE_POSITION_SIZE"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>CORRELATION_WITH_UNDERLYING</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["CORRELATION_WITH_UNDERLYING"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>LONG_RATIO</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["LONG_RATIO"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>MAX_SIZE</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["MAX_SIZE"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>NET_LEVERAGE</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["NET_LEVERAGE"]}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>STABILITY_OF_WEALTH_PROCESS</strong>
                      </td>
                      <td>:</td>
                      <td>{graphData["STABILITY_OF_WEALTH_PROCESS"]}</td>
                    </tr>
                  </tbody>
                </table>
              </Grid>
            </Grid>
          </>
        )}
      </>
    );
  }
}

HypoTest.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(HypoTest);
