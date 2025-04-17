import { memo } from "react";
import GeneralReportList from "../../../components/report/GeneralReport/GeneralReportList";
import YellowHeaderGeneralReport from "../../../components/report/GeneralReport/YellowHeaderGeneralReport";

const GeneralReport = () => {
  return (
    <>
      <YellowHeaderGeneralReport />
      <GeneralReportList />
    </>
  );
};

export default memo(GeneralReport);
