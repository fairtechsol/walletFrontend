import { Box } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CountryWiseListComponent from "../../../components/horseRacingComp/CountryWiseListComponent";
import RacingListComponent from "../../../components/horseRacingComp/RacingListComponent";
import { socketService } from "../../../socketManager";
import {
  getHorseRacingCountryWiseList,
  getHorseRacingMatchList,
} from "../../../store/actions/horseRacing/horseMatchListAction";
import { AppDispatch, RootState } from "../../../store/store";

const RacingList = () => {
  const dispatch: AppDispatch = useDispatch();
  const { matchType } = useParams();
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const { racingList, countryWiseList, success } = useSelector(
    (state: RootState) => state.horseRacing.matchList
  );

  const getMatchListService = () => {
    setTimeout(() => {
      dispatch(getHorseRacingCountryWiseList({ matchType: matchType }));
    }, 500);
  };

  useEffect(() => {
    dispatch(getHorseRacingCountryWiseList({ matchType: matchType }));
  }, [matchType]);

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
          matchType: matchType,
        })
      );
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
          matchType={matchType}
        />
      </Box>
      <Box>
        <RacingListComponent racingList={racingList} />
      </Box>
    </>
  );
};

export default memo(RacingList);
