import { Box, Typography } from "@mui/material";
import ProfitLossHeader from "../../../components/report/ProfitLossReport/ProfitLossHeader";
import ProfitLossTableComponent from "../../../components/report/ProfitLossReport/ProfitLossTableComponent";
import { useEffect, useState } from "react";
import { ArrowDown, ARROWUP } from "../../../assets";


const ProfitLossReport = () => {

  
  const [visible, setVisible] = useState(false);
  const [pageLimit] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [userProfitLoss, setUserProfitLoss] = useState([""]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventData, setEventData] = useState<{
    eventType: string;
    profit: string;
    arrow: string;
  }[]>([]);
  const [reportData, setReportData] = useState([]);
  const [betData, setBetData] = useState([]);
  const [sessionBetData, setSessionBetData] = useState([]);
  const [allClinets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {

    getEventList();
  }, [pageCount, pageLimit]);


  async function getUserProfitLoss() {
    try {
      // Simulating static data for user profit/loss
      const staticUserData = [
        {
          rateProfitLoss: "-1118.50",
          sessionProfitLoss: "0",
          eventType: "cricket",
          matchId: "58aaec76-330c-4816-8d99-7dd242471425",
          eventName: "Central Hinds v Northern Districts",
          matchDate: "2023-12-26T23:30:00.000Z",
        },
        {
          rateProfitLoss: "616.48",
          sessionProfitLoss: "0",
          eventType: "cricket",
          matchId: "1184172f-0438-4207-92fa-0f40f96c267a",
          eventName: "Hobart Hurricanes v Melbourne Renegades",
          matchDate: "2023-12-23T08:15:00.000Z",
        },
        {
          rateProfitLoss: "-117.20",
          sessionProfitLoss: "400.00",
          eventType: "cricket",
          matchId: "770a2221-5ef2-4b94-9931-e10c096588dc",
          eventName: "Northern Brave v Central Districts",
          matchDate: "2023-12-22T04:30:00.000Z",
        },

      ];
  
      setUserProfitLoss(staticUserData as any);
      setPageCount(Math.ceil(staticUserData.length / pageLimit));
    } catch (e) {
      console.log(e);
    }
  }

  async function getEventList() {

    const staticEventData: {
      eventType: string;
      profit: string;
      arrow: string;
      totalLoss: string;
      totalBet:string;
    }[] = [
      {totalLoss:"-7317.72",totalBet:"135", eventType: "Cricket", profit: "4,02,000,000,0", arrow: ARROWUP },
    
    ];
  
    setEventData(staticEventData);
  }
  
  const handleReport = (eventType: "cricket" | "football" | "tennis", pageno: number) => {

    getReport(eventType, pageno);
  };

  const getReport = async (eventType: "cricket" | "football" | "tennis", pageno: number) => {
 
    const staticReportData = {
      cricket: { profit: "4,02,000,000,0", arrow: ARROWUP },
      football: { profit: "4,02,000,000,0", arrow: ArrowDown },
      tennis: { profit: "4,02,000,000,0", arrow: ARROWUP },
    };
  
    const reportData = [staticReportData[eventType]]; 
    setReportData(reportData as any);
    setPageCount(1);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {

      setVisible(false);
      getEventList();
    } catch (error) {
      console.error("Error:", (error as Error)?.message);
    }
  };

  return (
    <div>
    <ProfitLossHeader
        title="Profit/Loss"
        onClick={handleClick}
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
    

          <Box>
            <ProfitLossTableComponent
              visible={true} 
              // getUserProfitLoss={getUserProfitLoss} 
              // userProfitLoss={userProfitLoss}
              setVisible={() => {}} 
              eventData={eventData}
              // reportData={reportData}
              // betData={betData}
              // sessionBetData={sessionBetData}
              // sessionBets={[]}
              // handleReport={handleReport}
              // handleBet={() => {}}
              currentPage={currentPage}
              pageCount={pageCount}
              setCurrentPage={setCurrentPage}
              user={"admin"}
           
            />
          </Box>


    </div>
  );
};



//   return (
//     <>
//       <ProfitLossHeader
//         title="Profit/Loss"
//         // onClick={handleClick}
//         // clientData={allClinets}
//         // setSearch={setSearch}
//         // search={search}
//         // setEndDate={setEndDate}
//         // endDate={endDate}
//         // startDate={startDate}
//         // setStartDate={setStartDate}
//       />
//       <Typography
//         sx={{
//           fontSize: "16px",
//           color: "white",
//           marginLeft: "1%",
//           fontWeight: "600",
//           marginY: "0.5%",
//           alignSelf: "start",
//         }}
//       >
//         Profit/Loss for Event Type
//       </Typography>

//       <Box sx={{ width: "99%", marginY: "10%" }}>
//         {/* <Loader text="upcoming" /> */}
//         <ProfitLossTableComponent
//           loading
//           // visible={visible}
//           // getUserProfitLoss={getUserProfitLoss}
//           // userProfitLoss={userProfitLoss}
//           // setVisible={setVisible}
//           eventData={[]}
//           // reportData={reportData}
//           // betData={betData}
//           // sessionBetData={sessionBetData}
//           // sessionBets={sessionBets}
//           // handleReport={handleReport}
//           // handleBet={handleBet}
//           // currentPage={currentPage}
//           // pageCount={pageCount}
//           // setCurrentPage={setCurrentPage}
//           user={"admin"}
//         />
//       </Box>

      
//     </>
//   );
// };

export default ProfitLossReport;
