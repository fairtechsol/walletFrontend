import { Box } from "@mui/material";
import { memo, useEffect, useState } from "react";
import service from "../../../service";
import AllUserListSeparate from "./AllUserListSeparate";

const ChildUserList = ({
  id,
  url,
  matchId,
  roleName,
  eventType,
  getBetReport,
  sessionBetData,
  sessionBets,
  bet1Data,
}: any) => {
  const [data1, setData] = useState([]);

  const getChildUserList = async () => {
    try {
      setData([]);
      const { data } = await service.get(
        `/user/userwise/profitLoss?runnerId=${matchId}${
          id ? "&userId=" + id + "&roleName=" + roleName : ""
        }${url ? "&url=" + url : ""}`
      );
      if (data) {
        setData(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getChildUserList();
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      {data1?.map((profitLoss: any, index: number) => (
        <AllUserListSeparate
          id={profitLoss?.userId}
          key={index}
          item={{ ...profitLoss, eventType }}
          index={index + 1}
          matchId={matchId}
          getBetReport={getBetReport}
          sessionBetData={sessionBetData}
          bet1Data={bet1Data}
          sessionBets={sessionBets}
        />
      ))}
    </Box>
  );
};

export default memo(ChildUserList);
