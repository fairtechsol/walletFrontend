import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch } from "react-redux";
import {
  getHorseRacingCountryWiseList,
  getHorseRacingMatchList,
} from "../../../store/actions/horseRacing/horseMatchListAction";
import { useSelector } from "react-redux";
import CountryWiseListComponent from "../../../components/horseRacingComp/CountryWiseListComponent";
import RacingListComponent from "../../../components/horseRacingComp/RacingListComponent";
import { Box } from "@mui/material";
import { socketService } from "../../../socketManager";

const RacingList = () => {
  const dispatch: AppDispatch = useDispatch();
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const { racingList, countryWiseList, success } = useSelector(
    (state: RootState) => state.horseRacing.matchList
  );

  const getMatchListService = () => {
    setTimeout(() => {
      dispatch(getHorseRacingCountryWiseList());
    }, 500);
  };

  useEffect(() => {
    dispatch(getHorseRacingCountryWiseList());
  }, []);

  useEffect(() => {
    if (
      countryWiseList &&
      countryWiseList?.length > 0 &&
      selectedCountryCode === ""
    ) {
      setSelectedCountryCode(countryWiseList[0]?.countryCode);
    }
    if (selectedCountryCode !== "") {
      dispatch(getHorseRacingMatchList({ countryCode: selectedCountryCode }));
    }
  }, [selectedCountryCode, countryWiseList]);

  useEffect(() => {
    try {
      if (success) {
        socketService.match.matchResultDeclaredOff();
        socketService.match.matchResultUnDeclaredOff();
        socketService.match.declaredMatchResultAllUserOff();
        socketService.match.unDeclaredMatchResultAllUserOff();
        socketService.match.matchAddedOff();
        socketService.match.matchResultDeclared(getMatchListService);
        socketService.match.matchResultUnDeclared(getMatchListService);
        socketService.match.declaredMatchResultAllUser(getMatchListService);
        socketService.match.unDeclaredMatchResultAllUser(getMatchListService);
        socketService.match.matchAdded(getMatchListService);
      }
    } catch (e) {
      console.log(e);
    }
  }, [success]);

  useEffect(() => {
    return () => {
      socketService.match.matchResultDeclaredOff();
      socketService.match.matchResultUnDeclaredOff();
      socketService.match.declaredMatchResultAllUserOff();
      socketService.match.unDeclaredMatchResultAllUserOff();
      socketService.match.matchAddedOff();
    };
  }, [success]);

  return (
    <>
      <Box sx={{ margin: "1rem" }}>
        <CountryWiseListComponent
          countryWiseList={countryWiseList}
          setSelectedCountryCode={setSelectedCountryCode}
        />
      </Box>
      <Box>
        <RacingListComponent racingList={racingList} />
      </Box>
    </>
  );
};

export default RacingList;
