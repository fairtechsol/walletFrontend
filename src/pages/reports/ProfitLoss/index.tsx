import { Box, Typography } from "@mui/material";
import ProfitLossHeader from "../../../components/report/ProfitLossReport/ProfitLossHeader";
import ProfitLossTableComponent from "../../../components/report/ProfitLossReport/ProfitLossTableComponent";

const ProfitLossReport = () => {
  return (
    <>
      <ProfitLossHeader
        title="Profit/Loss"
        // onClick={handleClick}
        // clientData={allClinets}
        // setSearch={setSearch}
        // search={search}
        // setEndDate={setEndDate}
        // endDate={endDate}
        // startDate={startDate}
        // setStartDate={setStartDate}
      />
      <Typography
        sx={{
          fontSize: "16px",
          color: "white",
          marginLeft: "1%",
          fontWeight: "600",
          marginY: "0.5%",
          alignSelf: "start",
        }}
      >
        Profit/Loss for Event Type
      </Typography>

      <Box sx={{ width: "99%", marginY: "10%" }}>
        {/* <Loader text="upcoming" /> */}
        <ProfitLossTableComponent
          loading
          // visible={visible}
          // getUserProfitLoss={getUserProfitLoss}
          // userProfitLoss={userProfitLoss}
          // setVisible={setVisible}
          eventData={[]}
          // reportData={reportData}
          // betData={betData}
          // sessionBetData={sessionBetData}
          // sessionBets={sessionBets}
          // handleReport={handleReport}
          // handleBet={handleBet}
          // currentPage={currentPage}
          // pageCount={pageCount}
          // setCurrentPage={setCurrentPage}
          user={"admin"}
        />
      </Box>
    </>
  );
};

export default ProfitLossReport;
