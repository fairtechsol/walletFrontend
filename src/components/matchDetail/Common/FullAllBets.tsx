import { Box, Typography } from "@mui/material";
import moment from "moment";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ARROWUP, CHECK } from "../../../assets";
import { formatToINR } from "../../../helper";
import { RootState } from "../../../store/store";
import AllBetsHeaderRow from "./AllBetsHeaderRow";
import FullAllBetsRow from "./FullAllBetsRow";

const ITEMS_PER_PAGE = 100;
const BUFFER_SIZE = 30;
const ROW_HEIGHT = 35;

interface FullAllBetsProps {
  tag: any;
  mode?: any;
  IObets: any;
  selectedBetData?: any;
  setSelectedBetData?: (val: any) => void;
  role?: any;
  deletePermanent?: () => void;
}

const FullAllBets = ({
  tag,
  mode,
  IObets,
  selectedBetData,
  setSelectedBetData,
  role,
  deletePermanent,
}: FullAllBetsProps) => {
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );
  const [newData, setNewBets] = useState([]);
  const [visible, setVisible] = useState(true);
  const [selectedData, setSelectedData] = useState<any>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [visibleRange, setVisibleRange] = useState({
    start: 0,
    end: ITEMS_PER_PAGE,
  });

  const renderCheckBox = (isSelected: any) =>
    isSelected ? (
      <img src={CHECK} style={{ width: "20px", height: "20px" }} />
    ) : (
      <Box
        sx={{
          width: "15px",
          height: "15px",
          border: "1px solid white",
          borderRadius: "10px",
        }}
      />
    );

  const shouldRenderCheckBox = (mode: any, values: any, selectedData: any) =>
    mode?.value && selectedData.some((item: any) => item?.id === values[0]?.id);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollTop, clientHeight } = scrollRef.current;

      const start = Math.floor(scrollTop / ROW_HEIGHT);
      const visibleCount = Math.ceil(clientHeight / ROW_HEIGHT);

      setVisibleRange({
        start: Math.max(0, start - BUFFER_SIZE),
        end: Math.min(newData.length, start + visibleCount + BUFFER_SIZE),
      });
    }
  }, [newData.length]);

  const processNextChunk = useCallback(() => {
    if (IObets) {
      const uniqueData: any = {};
      IObets?.forEach((item: any) => {
        uniqueData[item.id] = item;
      });

      const result = Object.values<Record<string, any>>(uniqueData);
      const body: any = result?.map((v: any) => {
        const roleName = role || profileDetail?.roleName;
        let partnership = 0;
        switch (roleName) {
          case "fairGameAdmin":
            partnership = v?.user?.faPartnership;
            break;
          case "superAdmin":
            partnership = v?.user?.saPartnership;
            break;
          case "admin":
            partnership = v?.user?.aPartnership;
            break;
          case "superMaster":
            partnership = v?.user?.smPartnership;
            break;
          case "master":
            partnership = v?.user?.mPartnership;
            break;
          case "agent":
            partnership = v?.user?.agPartnership;
            break;
          case "fairGameWallet":
            partnership = v?.user?.fwPartnership;
            break;
          case "user":
            partnership = 100;
            break;
          default:
            partnership = 0;
        }
        const values = {
          values: [
            {
              name: v?.user?.userName,
              color: v?.marketBetType === "SESSION" ? "#FFF" : "black",
              background:
                v?.marketBetType === "SESSION" ? "#319E5B" : "#F1C550",
              deleteReason: v?.deleteReason,
              id: v?.id,
              userId: v?.user?.id ?? v?.userId,
              betId: v?.betId,
              matchId: v?.matchId,
              domain: v?.domain,
              isCommissionActive: v?.isCommissionActive,
            },
            {
              name:
                v?.marketBetType !== "SESSION"
                  ? v?.bettingName ?? v?.marketType
                  : v?.marketType,
              color: v?.marketBetType === "SESSION" ? "#FFF" : "black",
              background:
                v?.marketBetType === "SESSION" ? "#319E5B" : "#F1C550",
              deleteReason: v?.deleteReason,
            },
            {
              name: v?.teamName,
              color: "black",
              background: ["YES", "BACK"].includes(v?.betType)
                ? "#B3E0FF"
                : "rgb(255, 146, 146)",
              deleteReason: v?.deleteReason,
            },
            {
              name: v?.odds,
              color: "black",
              rate: v.rate ? (v?.betType === "NO" ? v?.rate : v?.rate) : null,
              background: ["YES", "BACK"].includes(v?.betType)
                ? "#B3E0FF"
                : "rgb(255, 146, 146)",
              small: true,
              deleteReason: v?.deleteReason,
            },
            {
              name:
                v?.marketType === "oddEven"
                  ? v?.teamName
                      ?.match(/[-_](odd|even)$/i)?.[1]
                      ?.toUpperCase() || v?.betType
                  : v?.betType,
              color: "black",
              background: ["YES", "BACK"].includes(v?.betType)
                ? "#B3E0FF"
                : "rgb(255, 146, 146)",
              small: true,
              deleteReason: v?.deleteReason,
            },
            {
              name: formatToINR(v?.amount || v?.stake),
              color: "black",
              background: ["YES", "BACK"].includes(v?.betType)
                ? "#B3E0FF"
                : "rgb(255, 146, 146)",
              deleteReason: v?.deleteReason,
            },
            {
              name: formatToINR(
                v?.myStake || v?.myStake === 0
                  ? parseFloat(v?.myStake).toFixed(2)
                  : (v?.amount * partnership) / 100
              ),
              color: "white",
              background: "#0B4F26",
              deleteReason: v?.deleteReason,
            },
            {
              name: moment.utc(v?.createdAt).utcOffset("+05:30").format("LTS"),
              color: "black",
              background: ["YES", "BACK"].includes(v?.betType)
                ? "#B3E0FF"
                : "rgb(255, 146, 146)",
              time: true,
              date: moment.utc(v?.createdAt).utcOffset("+05:30").format("L"),
              deleteReason: v?.deleteReason,
            },
          ],
        };
        return values;
      });

      setNewBets(body);
    }
  }, [IObets]);

  const handleBetSelect = (e: any, i: any) => {
    e.stopPropagation();
    try {
      let x: any = [...selectedData];
      if (
        x.length > 0 &&
        x.some((item: any) => item?.id === i?.values[0]?.id)
      ) {
        const updatedSelectedBetData = selectedBetData.filter(
          (item: any) => item?.id !== i?.values[0].id
        );
        setSelectedBetData?.(updatedSelectedBetData);
        const updatedX = x.filter((v: any) => v?.id !== i?.values[0]?.id);
        x = updatedX;
        setSelectedData(updatedX);
      } else {
        if (mode?.type == "edit") {
          if (i?.values[0].deleteReason) {
            setSelectedBetData?.([
              ...selectedBetData,
              {
                id: i?.values[0].id,
                betId: i?.values[0].betId,
                matchId: i?.values[0].matchId,
                userId: i?.values[0].userId,
                domain: i?.values[0].domain,
              },
            ]);
            x.push({
              id: i?.values[0].id,
              betId: i?.values[0].betId,
              matchId: i?.values[0].matchId,
              userId: i?.values[0].userId,
              domain: i?.values[0].domain,
            });
            setSelectedData([...x]);
          }
        } else if (
          mode?.type === "delete" ||
          mode?.type === "deletePermanent"
        ) {
          if (!i?.values[0].deleteReason) {
            setSelectedBetData?.([
              ...selectedBetData,
              {
                id: i?.values[0].id,
                betId: i?.values[0].betId,
                matchId: i?.values[0].matchId,
                userId: i?.values[0].userId,
                domain: i?.values[0].domain,
              },
            ]);
            x.push({
              id: i?.values[0].id,
              betId: i?.values[0].betId,
              matchId: i?.values[0].matchId,
              userId: i?.values[0].userId,
              domain: i?.values[0].domain,
            });
            setSelectedData([...x]);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setSelectedData([]);
    if (setSelectedBetData !== undefined) {
      setSelectedBetData([]);
    }
  }, [mode?.value]);

  useEffect(() => {
    setNewBets([]);
    if (IObets?.length) {
      processNextChunk();
    }
  }, [IObets, processNextChunk]);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      return () => {
        scrollElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);
  const visibleItems = useMemo(() => {
    return newData.slice(visibleRange.start, visibleRange.end);
  }, [newData, visibleRange]);

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        backgroundColor: "white",
        padding: 0.2,
        flexDirection: "column",
        marginY: "0",
        width: "100%",
        alignSelf: { xs: "center", md: "center", lg: "flex-start" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: 38,
          flexDirection: "row",
          width: "99.7%",
          alignSelf: "center",
        }}
      >
        <Box
          sx={{
            flex: 1,
            background: "#f1c550",
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: { lg: "13px", md: "12px", xs: "12px" },
              fontWeight: "bold",
              marginLeft: "7px",
            }}
          >
            All Bets
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 0.1,
            background: "#262626",
          }}
        >
          <Box className="slanted" />
        </Box>
        <Box
          sx={{
            flex: 1,
            background: "#262626",
            display: "flex",
            alignItems: "center",
            justifyContent: { lg: "flex-end", xs: "flex-end" },
            padding: { lg: "0", xs: "0" },
          }}
        >
          <Box
            sx={{
              width: "70px",
              height: "80%",
              background: "white",
              justifyContent: "center",
              borderRadius: "3px",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              marginRight: "2px",
            }}
            onDoubleClick={(e: any) => {
              e.stopPropagation();
              deletePermanent?.();
            }}
          >
            <Typography
              sx={{
                fontSize: { lg: "8px", xs: "8px" },
                fontWeight: "700",
                color: "#FF1111",
              }}
            >
              Total Bet
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "700",
                color: "#0B4F26",
                lineHeight: 1,
              }}
            >
              {IObets?.length || 0}
            </Typography>
          </Box>
          <img
            onClick={() => {
              setVisible(!visible);
            }}
            src={ARROWUP}
            style={{
              transform: visible ? "rotate(180deg)" : "rotate(0deg)",
              width: "15px",
              height: "15px",
              marginRight: "5px",
              marginLeft: "5px",
              cursor: "pointer",
            }}
          />
        </Box>
      </Box>
      {visible && (
        <>
          <AllBetsHeaderRow mode={mode?.value} tag={tag} />
          <Box
            ref={scrollRef}
            className="myScroll"
            style={{ maxHeight: "80vh", overflowY: "auto" }}
          >
            <Box style={{ height: visibleRange.start * ROW_HEIGHT }} />

            {visibleItems?.map((i: any, k: number) => {
              const num = IObets.length - (k + visibleRange.start);
              const formattedNum = num < 10 ? "0" + num : num.toString();
              return (
                <Box
                  key={k + visibleRange.start}
                  style={{
                    display: "flex",
                    position: "relative",
                    height: ROW_HEIGHT,
                  }}
                  onClick={(e) => handleBetSelect(e, i)}
                >
                  <Box
                    sx={{
                      width: mode?.value ? "7%" : "5.3%",
                      border: "1px solid white",
                      background: "black",
                      height: "35px",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    {!mode?.value && (
                      <Typography
                        sx={{
                          fontSize: !tag ? { xs: "8px", lg: "11px" } : "13px",
                          fontWeight: tag ? "bold" : "600",
                          color: "white",
                        }}
                      >
                        {formattedNum}
                      </Typography>
                    )}

                    {(((mode?.type === "delete" ||
                      mode?.type === "deletePermanent") &&
                      !i?.values[0]?.deleteReason) ||
                      (mode?.type === "edit" && i?.values[0]?.deleteReason)) &&
                      renderCheckBox(
                        shouldRenderCheckBox(mode, i?.values, selectedData)
                      )}
                  </Box>
                  <FullAllBetsRow
                    index={k + visibleRange.start}
                    values={i.values}
                  />
                  {i?.values[0]?.deleteReason && (
                    <Box
                      sx={{
                        background: "rgba(0,0,0,0.5)",
                        width: "100%",
                        position: "absolute",
                        display: "flex",
                      }}
                    >
                      <Box sx={{ flex: 1, display: "flex" }}>
                        <Box sx={{ width: "34%", height: "35px" }} />
                        <Box
                          sx={{
                            width: "66%",
                            height: "35px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-end",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "10px",
                              fontWeight: "700",
                              color: "white",
                              textTransform: "uppercase",
                            }}
                          >
                            Bet{" "}
                            <span style={{ color: "#e41b23" }}>deleted</span>{" "}
                            Due To {"\n"} {i?.values[0]?.deleteReason}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>
              );
            })}
            <Box
              style={{
                height: (IObets.length - visibleRange.end) * ROW_HEIGHT,
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default memo(FullAllBets);
