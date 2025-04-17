import { Box, Tab, Tabs, Typography } from "@mui/material";
import { Fragment, memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import CustomBox from "../../components/analysis/CustomBox";
import RacingListComponentAnalysis from "../../components/analysis2/raceListAnalysisComp";
import CountryWiseListComponent from "../../components/horseRacingComp/CountryWiseListComponent";
import { socket, socketService } from "../../socketManager";
import {
  getHorseRacingCountryWiseList,
  getHorseRacingMatchList,
} from "../../store/actions/horseRacing/horseMatchListAction";
import { AppDispatch, RootState } from "../../store/store";
import "./index.css";

const Analysis2 = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [mode, setMode] = useState("0");
  const [max, setMax] = useState("2");
  const [selected, setSelected] = useState<any>([]);
  const { raceType } = useParams();
  const [selectedMatchType, setSelectedMatchType] = useState<any>("");
  const [matchIds, setMatchIds] = useState<any>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [value, setValue] = useState("horseRacing");
  const { racingList, countryWiseList, success } = useSelector(
    (state: RootState) => state.horseRacing.matchList
  );
  const { loading } = useSelector(
    (state: RootState) => state.match.analysisList
  );

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(`/wallet/market_analysis2/${newValue}`);
  };

  const handleClick = (value: string) => {
    setMax(value);
    setMode("1");
  };

  const handleRadioButtonSelect = (match: any) => {
    if (mode === "0") {
      return false;
    }

    const updatedSelected = [...selected];
    const matchId = match?.id;

    if (selected?.length === 0 || selectedMatchType === match?.matchType) {
      const isSelected = updatedSelected.includes(matchId);

      if (isSelected) {
        setMatchIds((prevIds: any) =>
          prevIds.filter((matchId: any) => matchId !== matchId)
        );
        setSelected(updatedSelected.filter((id: any) => id !== matchId));
      } else {
        if (+max === selected?.length) {
          toast.warn(`Only ${max} allowed`);
          return;
        }
        setMatchIds((prevIds: any) => [...prevIds, matchId]);
        setSelected([...updatedSelected, matchId]);
        if (!isSelected) {
          setSelectedMatchType(match?.matchType);
        }
      }
    } else {
      toast.error("Please Select Match Of Same Category");
      return;
    }
  };

  const handleSubmit = () => {
    if (max == "2") {
      if (selected.length != 2) {
        toast.error("Select 2 matches");
        return;
      }
    } else if (max == "3") {
      if (selected.length != 3) {
        toast.error("Select 3 matches");
        return;
      }
    } else if (max == "4") {
      if (selected.length != 4) {
        toast.error("Select 4 matches");
        return;
      }
    }
    if (selected) {
      setMode("0");
      setSelected([]);
      setMatchIds([]);
    }
    if (max == "3") {
      navigate(`/wallet/market_analysis2/multiple_Match`, {
        state: {
          match: Number(max),
          matchIds: matchIds,
          matchType: selectedMatchType,
        },
      });
    } else {
      navigate(`/wallet/market_analysis2/multiple_Match`, {
        state: {
          match: Number(max),
          matchIds: matchIds,
          matchType: selectedMatchType,
        },
      });
    }
  };
  const getMatchist = (event: any) => {
    if (event?.gameType === value) {
      dispatch(getHorseRacingCountryWiseList({ matchType: value }));
    }
  };

  useEffect(() => {
    dispatch(getHorseRacingCountryWiseList({ matchType: value }));
  }, [value]);

  useEffect(() => {
    if (
      countryWiseList &&
      countryWiseList?.length > 0 &&
      selectedCountryCode === ""
    ) {
      setSelectedCountryCode(countryWiseList[0]?.countryCode);
    }
    if (selectedCountryCode !== "") {
      dispatch(
        getHorseRacingMatchList({
          countryCode: selectedCountryCode,
          matchType: value,
        })
      );
    }
  }, [selectedCountryCode, countryWiseList]);

  useEffect(() => {
    try {
      if (socket && success) {
        socketService.match.matchResultDeclaredOff();
        socketService.match.matchResultUnDeclaredOff();
        socketService.match.matchAddedOff();
        socketService.match.matchResultDeclared(getMatchist);
        socketService.match.matchResultUnDeclared(getMatchist);
        socketService.match.declaredMatchResultAllUser(getMatchist);
        socketService.match.unDeclaredMatchResultAllUser(getMatchist);
        socketService.match.matchAdded(getMatchist);
      }
    } catch (error) {
      console.log(error);
    }
  }, [socket, success]);

  useEffect(() => {
    return () => {
      socketService.match.matchResultDeclaredOff();
      socketService.match.matchResultUnDeclaredOff();
      socketService.match.declaredMatchResultAllUserOff();
      socketService.match.unDeclaredMatchResultAllUserOff();
      socketService.match.matchAddedOff();
    };
  }, []);

  useEffect(() => {
    if (raceType) {
      setValue(raceType);
    }
  }, [raceType]);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        margin: "0.5%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginX: ".5%",
            padding: { xs: "5px", lg: "0px 8px" },
            flexDirection: { xs: "column", md: "row", lg: "row" },
            width: "100%",
            marginY: { xs: "1%", md: "1%", lg: "0" },
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              color: "white",
              width: "100%",
              fontWeight: "700",
              marginY: "0.5%",
              marginLeft: "5px",
              alignSelf: "start",
            }}
          >
            MARKET ANALYSIS 2
          </Typography>
          {mode == "0" && (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: {
                  xs: "center",
                  md: "flex-end",
                  lg: "flex-end",
                  marginRight: "0.5%",
                },
              }}
            >
              {["2", "3", "4"].map((value: string, index: number) => (
                <Fragment key={value}>
                  <CustomBox
                    onClick={() => handleClick(value)}
                    title={`${value} Match Screen`}
                  />
                  {index !== 2 && <Box sx={{ width: "10px" }} />}
                </Fragment>
              ))}
            </Box>
          )}
          {mode == "1" && (
            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
              <CustomBox
                bg="#E32A2A"
                onClick={() => {
                  setMode("0");
                  setSelected([]);
                  setMatchIds([]);
                }}
                title="Cancel"
              />
              <CustomBox onClick={handleSubmit} title="Submit" />
              <Box sx={{ width: "10px" }} />
            </Box>
          )}
        </Box>
      </Box>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        variant="scrollable"
      >
        <Tab sx={{ color: "white" }} value="horseRacing" label="Horse Racing" />
        <Tab
          sx={{ color: "white" }}
          value="greyHound"
          label="Greyhound Racing"
        />
      </Tabs>
      {loading ? (
        <Box
          sx={{
            height: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </Box>
      ) : (
        <>
          <Box sx={{ margin: "1rem" }}>
            <CountryWiseListComponent
              countryWiseList={countryWiseList}
              setSelectedCountryCode={setSelectedCountryCode}
              matchType={value}
            />
          </Box>
          <Box>
            <RacingListComponentAnalysis
              racingList={racingList}
              matchType={value}
              mode={mode}
              handleRadioButtonSelect={handleRadioButtonSelect}
              selected={selected}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default memo(Analysis2);
