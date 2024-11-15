import { Box, Tab, Tabs, styled } from "@mui/material";
import { useEffect, useState } from "react";

const CustomTabs = styled(Tabs)({
  "& .MuiTab-root": {
    maxWidth: "0.5rem",
    flex: 1,
  },
  "& .Mui-selected": {
    backgroundColor: "#F8C851",
  },
  "& .MuiTabs-indicator": {
    height: 0,
    backgroundColor: "#F8C851",
  },
});

const CountryWiseListComponent = ({
  countryWiseList,
  setSelectedCountryCode,
  matchType,
}: any) => {
  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setSelectedCountryCode(countryWiseList[newValue].countryCode);
  };

  useEffect(() => {
    setValue(0);
    if (countryWiseList[0]?.countryCode) {
      setSelectedCountryCode(countryWiseList[0]?.countryCode);
    }
  }, [matchType, countryWiseList]);

  return (
    <>
      {countryWiseList && countryWiseList?.length === 0 && (
        <span style={{ color: "#fff" }}>No Record Found</span>
      )}
      {countryWiseList && countryWiseList?.length > 0 && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CustomTabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            textColor="inherit"
            aria-label="country tabs"
            sx={{
              height: "30px",
              "& .MuiTab-root": {
                minWidth: "2.5rem",
                minHeight: "1rem",
              },
            }}
          >
            {countryWiseList &&
              countryWiseList.map((item: any, index: number) => (
                <Tab
                  sx={{
                    backgroundColor: value === index ? "#F8C851" : "#FFFFFF",
                    color: "black",
                  }}
                  key={item?.countryCode}
                  label={item?.countryCode}
                />
              ))}
          </CustomTabs>
        </Box>
      )}
    </>
  );
};

export default CountryWiseListComponent;
