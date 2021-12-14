import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
export default function CourseTable(props) {
  var dataDetails = props.dat;
  return (
    <Box mx={2} color="primary" clone sx={{ fontSize: 20 }}>
      <TableContainer component={Paper} sx={{ maxWidth: 700 }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: 20 }}>
                <b>Course</b>
              </TableCell>
              <TableCell sx={{ fontSize: 20 }} align="left">
                <b>Joined Date</b>
              </TableCell>
              <TableCell sx={{ fontSize: 20 }} align="left">
                <b>Joined Time</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataDetails.map((dataDetail) => (
              <TableRow
                key={dataDetail.course.toUpperCase()}
                // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{ fontSize: 20 }}>
                  {dataDetail.course.toUpperCase()}
                </TableCell>
                <TableCell sx={{ fontSize: 20 }} align="left">
                  {dataDetail.date}
                </TableCell>
                <TableCell sx={{ fontSize: 20 }} align="left">
                  {dataDetail.time}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
