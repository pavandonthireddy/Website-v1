import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  },
  padding: 5
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  },
  padding: 5
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700
  },
  container: {
    maxHeight: 440
  }
});

export default function FactorTable(props) {
  const classes = useStyles();
  const { data } = props;
  const columns = Object.keys(data);
  const index = Object.keys(Object.values(data)[0]);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Param</StyledTableCell>
            {columns.map(item => (
              <StyledTableCell key={item}>{item}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {index.map(rowIndex => (
            <StyledTableRow key={rowIndex}>
              <StyledTableCell component="th" scope="row">
                {rowIndex}
              </StyledTableCell>
              {columns.map(item => (
                <StyledTableCell
                  key={item + rowIndex}
                  component="th"
                  scope="row"
                >
                  {parseFloat(data[item][rowIndex]).toPrecision(6)}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}