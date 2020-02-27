import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import socketIOClient from "socket.io-client";

var socket;
socket = socketIOClient("http://34.87.127.76:8080/");

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
  }
};

class HypoGen extends Component {
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
    streamingData: "",
    grammar: `<expr>  ::= (<foptr>(<expr>,<expr>,<day>))| 
                                                    (<fopbi>(<expr>,<day>))| 
                                                    (<fopun>(<expr>))| 
                                                    (<expr><matbi><expr>)  |
                                                    <var>
                                        <foptr> ::= corr | covariance
                                        <fopbi> ::= mean | 
                                                    median |   
                                                    stdev| 
                                                    back_diff| 
                                                    center| 
                                                    compress| 
                                                    scale| 
                                                    normalize_o|       
                                                    zscore|     
                                                    sma|
                                                    ema| 
                                                    fisher_norm| 
                                                    maxval| 
                                                    minval|       
                                                    gauss_filter|
                                                    ts_rank|
                                                    skew|
                                                    kurtosis
                                        <fopun> ::= fisher|invfisher|rank| -1* | 1/ |smooth
                                        <matbi> ::= + | - | * | /
                                        <var> ::= Open|High|Low|Close
                                        <day> ::=  5 | 10 | 15 | 20`,
    fitness_function: "Sharpe_Ratio",
    max_init_tree_depth: 10,
    min_init_tree_depth: 0,
    init_genom_length: 200,
    interaction_probability: 0.5,
    max_tree_depth: 10,
    max_tree_nodes: 10,
    population_size: 100,
    selection_proportion: 0.25,
    generations: 49,
    generation_size: 99,
    elite_size: 1,
    crossover_probability: 0.4,
    mutation_events: 1,
    mutation_probability: 0.1,
    tournament_size: 2,
    random_seed: 606632
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  getStreamData = () => {
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
      strategyExpression,
      grammar,
      fitness_function,
      max_init_tree_depth,
      min_init_tree_depth,
      init_genom_length,
      interaction_probability,
      max_tree_depth,
      max_tree_nodes,
      population_size,
      selection_proportion,
      generations,
      generation_size,
      elite_size,
      crossover_probability,
      mutation_events,
      mutation_probability,
      tournament_size,
      random_seed
    } = this.state;
    const hypoParams = {
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

    const engineParams = {
      grammar,
      fitness_function,
      max_init_tree_depth,
      min_init_tree_depth,
      init_genom_length,
      interaction_probability,
      max_tree_depth,
      max_tree_nodes,
      population_size,
      selection_proportion,
      generations,
      generation_size,
      elite_size,
      crossover_probability,
      mutation_events,
      mutation_probability,
      tournament_size,
      random_seed
    };
    const params = {
      hypoParams,
      engineParams
    };

    socket.emit("stream_data", params);
    socket.on("get_data", data => {
      this.setState({ streamingData: data.result });
    });
  };
  componentWillUnmount() {
    socket.off("get_data");
  }
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
      streamingData,
      grammar,
      fitness_function,
      max_init_tree_depth,
      min_init_tree_depth,
      init_genom_length,
      interaction_probability,
      max_tree_depth,
      max_tree_nodes,
      population_size,
      selection_proportion,
      generations,
      generation_size,
      elite_size,
      crossover_probability,
      mutation_events,
      mutation_probability,
      tournament_size,
      random_seed
    } = this.state;
    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <h4>
              <strong>Hypothesis Parameters:</strong>
            </h4>
            <Card className={classes.card}>
              <CardContent
                className={classes.content}
                style={{ minHeight: "800px", maxHeight: "" }}
              >
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
          <Grid item xs={4}>
            <h4>
              <strong>Engine Parameters:</strong>
            </h4>
            <Card className={classes.card}>
              <CardContent
                className={classes.content}
                style={{ minHeight: "800px", maxHeight: "" }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <FormControl variant="filled" fullWidth>
                      <InputLabel>Fitness Function</InputLabel>
                      <Select
                        name="fitness_function"
                        value={fitness_function}
                        onChange={this.handleChange}
                      >
                        <MenuItem value={"Information_Ratio"}>
                          Information_Ratio
                        </MenuItem>
                        <MenuItem value={"MAR_Ratio"}>MAR_Ratio</MenuItem>
                        <MenuItem value={"Maximum_Drawdown"}>
                          Maximum_Drawdown
                        </MenuItem>
                        <MenuItem value={"Omega_Ratio"}>Omega_Ratio</MenuItem>
                        <MenuItem value={"Rachev_Ratio"}>Rachev_Ratio</MenuItem>
                        <MenuItem value={"Sharpe_Ratio"}>Sharpe_Ratio</MenuItem>
                        <MenuItem value={"Sortino_Ratio"}>
                          Sortino_Ratio
                        </MenuItem>
                        <MenuItem value={"Total_Return"}>Total_Return</MenuItem>
                      </Select>
                    </FormControl>

                    <TextField
                      type="number"
                      name="max_init_tree_depth"
                      label="MAX_INIT_TREE_DEPTH"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={max_init_tree_depth}
                      onChange={this.handleChange}
                    />
                    <TextField
                      type="number"
                      name="min_init_tree_depth"
                      label="MIN_INIT_TREE_DEPTH"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      onChange={this.handleChange}
                      value={min_init_tree_depth}
                    />

                    <TextField
                      name="init_genom_length"
                      type="number"
                      label="INIT_GENOME_LENGTH"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={init_genom_length}
                      onChange={this.handleChange}
                    />

                    <TextField
                      name="interaction_probability"
                      type="number"
                      label="INTERACTION_PROBABILITY"
                      variant="outlined"
                      fullWidth
                      onChange={this.handleChange}
                      margin="normal"
                      value={interaction_probability}
                    />
                    <TextField
                      name="max_tree_depth"
                      type="number"
                      label="MAX_TREE_DEPTH"
                      variant="outlined"
                      fullWidth
                      onChange={this.handleChange}
                      margin="normal"
                      value={max_tree_depth}
                    />
                    <TextField
                      name="max_tree_nodes"
                      type="number"
                      label="MAX_TREE_NODES"
                      variant="outlined"
                      fullWidth
                      onChange={this.handleChange}
                      margin="normal"
                      value={max_tree_nodes}
                    />
                    <TextField
                      name="population_size"
                      type="number"
                      label="POPULATION_SIZE"
                      variant="outlined"
                      fullWidth
                      onChange={this.handleChange}
                      margin="normal"
                      value={population_size}
                    />
                    <TextField
                      name="commissionBps"
                      type="number"
                      label="SELECTION_PROPORTION"
                      variant="outlined"
                      fullWidth
                      onChange={this.handleChange}
                      margin="normal"
                      value={selection_proportion}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name="generations"
                      type="number"
                      label="GENERATIONS"
                      variant="outlined"
                      fullWidth
                      onChange={this.handleChange}
                      margin="normal"
                      value={generations}
                    />
                    <TextField
                      name="generation_size"
                      type="number"
                      label="GENERATION_SIZE"
                      variant="outlined"
                      fullWidth
                      onChange={this.handleChange}
                      margin="normal"
                      value={generation_size}
                    />
                    <TextField
                      name="elite_size"
                      type="number"
                      label="ELITE_SIZE"
                      variant="outlined"
                      fullWidth
                      onChange={this.handleChange}
                      margin="normal"
                      value={elite_size}
                    />
                    <TextField
                      name="crossover_probability"
                      type="number"
                      label="CROSSOVER_PROBABILITY"
                      variant="outlined"
                      fullWidth
                      onChange={this.handleChange}
                      margin="normal"
                      value={crossover_probability}
                    />
                    <TextField
                      name="mutation_events"
                      type="number"
                      label="MUTATION_EVENTS"
                      variant="outlined"
                      fullWidth
                      onChange={this.handleChange}
                      margin="normal"
                      value={mutation_events}
                    />
                    <TextField
                      name="mutation_probability"
                      type="number"
                      label="MUTATION_PROBABILITY"
                      variant="outlined"
                      fullWidth
                      onChange={this.handleChange}
                      margin="normal"
                      value={mutation_probability}
                    />
                    <TextField
                      name="tournament_size"
                      type="number"
                      label="TOURNAMENT_SIZE"
                      variant="outlined"
                      fullWidth
                      onChange={this.handleChange}
                      margin="normal"
                      value={tournament_size}
                    />
                    <TextField
                      name="random_seed"
                      type="number"
                      label="RANDOM_SEED"
                      variant="outlined"
                      fullWidth
                      onChange={this.handleChange}
                      margin="normal"
                      value={random_seed}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <h4>
              <strong>Grammar:</strong>
            </h4>
            <Card
              className={classes.card}
              style={{ minHeight: "800px", maxHeight: "" }}
            >
              <CardContent className={classes.content}>
                <TextField
                  name="grammar"
                  label="Grammar"
                  multiline
                  rows="37"
                  value={grammar}
                  variant="outlined"
                  fullWidth
                  onChange={this.handleChange}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <div style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.getStreamData}
                style={{
                  backgroundColor: "green",
                  color: "white",
                  width: "10%"
                }}
              >
                Generate
              </Button>
            </div>
          </Grid>
          <Grid item xs={12}>
            <h4>
              <strong>Output:</strong>
            </h4>
            <Card
              className={classes.card}
              style={{ minHeight: "400px", maxHeight: "" }}
            >
              <CardContent className={classes.content}>
                <TextField
                  label="Output"
                  multiline
                  rows="35"
                  value={streamingData}
                  variant="outlined"
                  fullWidth
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
    );
  }
}

HypoGen.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(HypoGen);
