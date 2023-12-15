import { Box } from "@mui/material";
import Pagination from "../../Common/Pagination";
import EmptyRow from "./EmptyRow";
import TableHeaderList from "./TableHeaderList";
import TableDataRow from "./TableDataRow";
import ListHeaderRow from "./ListHeaderRow";

const BetsList = (props: any) => {
  const { getLimitEntries, betHistory } = props;
  return (
    <Box
      sx={[
        {
          marginX: "0.5%",
          minHeight: "200px",
          borderTopRightRadius: {
            xs: "10px",
            lg: "0px",
            md: "10px",
          },
          position: "relative",
          borderRadius: {
            xs: "10px 10px 0 0",
            lg: "10px 10px 0 0",
            md: "10px 10px 0 0",
          },
          border: "2px solid white",
        },
        (theme: any) => ({
          backgroundImage: `${theme.palette.primary.headerGradient}`,
        }),
      ]}
    >
      <ListHeaderRow getLimitEntries={getLimitEntries} />

      <Box sx={{ overflowX: "scroll" }}>
        <TableHeaderList />

        {betHistory?.map((item: any, index: any) => {
          return (
            <TableDataRow
              key={index}
              data={item}
              index={index}
              containerStyle={{ background: "#FFE094" }}
              profit={true}
              fContainerStyle={{ background: "#0B4F26" }}
              fTextStyle={{ color: "white" }}
            />
          );
        })}
        {betHistory.length === 0 && (
          <EmptyRow containerStyle={{ background: "#FFE094" }} />
        )}
      </Box>

      <Box
        sx={{
          width: "100%",
          position: "absolute",
        }}
      >
        <Pagination currentPage={1} pages={10} setCurrentPage={() => {}} />
      </Box>
    </Box>
  );
};

export default BetsList;
