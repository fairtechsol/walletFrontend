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

const RacingList = () => {
  const dispatch: AppDispatch = useDispatch();
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const { racingList, countryWiseList } = useSelector(
    (state: RootState) => state.horseRacing.matchList
  );

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
