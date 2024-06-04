import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  styled,
} from "@mui/material";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";

const YellowButton = styled("button")(() => ({
  backgroundColor: "#F8C851",
  color: "black",
  border: "none",
  borderRadius: "4px",
  padding: "6px 12px",
  margin: "4px",
  cursor: "pointer",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#FFC107",
  },
}));

const RacingListComponent = ({ racingList }: any) => {
  const navigate = useNavigate();
  const { matchType } = useParams();
  return (
    <TableContainer component={Paper}>
      <Table aria-label="time table">
        <TableBody>
          {Object.entries(racingList).map(
            ([matchName, item]: any, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      border: "1px solid black",
                      padding: "5px",
                      width: "30%",
                    }}
                  >
                    {matchName}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid black", padding: "5px" }}>
                    {item?.map((time: any, idx: any) => (
                      <YellowButton
                        key={idx}
                        onClick={() =>
                          navigate(`/wallet/race_list/${matchType}/${time.id}`)
                        }
                      >
                        {moment(time.startAt).format("hh:mm")}
                      </YellowButton>
                    ))}
                  </TableCell>
                </TableRow>
              );
            }
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RacingListComponent;
