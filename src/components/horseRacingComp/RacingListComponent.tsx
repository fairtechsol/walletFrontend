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
import { useNavigate } from "react-router-dom";

const data = [
  {
    id: 1,
    location: "Brighton",
    times: ["18:50", "19:20", "19:50", "20:20", "20:50", "21:25"],
  },
  {
    id: 2,
    location: "Hexham",
    times: ["21:55", "22:28", "23:28", "23:58", "00:28", "01:30"],
  },
  {
    id: 3,
    location: "Nottingham",
    times: [
      "18:40",
      "19:10",
      "19:40",
      "20:10",
      "20:40",
      "21:10",
      "21:40",
      "22:15",
    ],
  },
  {
    id: 4,
    location: "Huntingdon",
    times: ["22:40", "23:10", "00:10", "00:40", "01:10"],
  },
];

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
                          navigate(`/wallet/horse_racing/${time.id}`)
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
