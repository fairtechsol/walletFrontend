import BetsList from "../../../components/report/CurrentBets/BetsList";
import HeaderCurrentBets from "../../../components/report/CurrentBets/HeaderCurrentBets";

const CurrentBets = () => {
  const betHistory: any[] = [];
  return (
    <>
      <HeaderCurrentBets />
      <BetsList betHistory={betHistory} />
    </>
  );
};

export default CurrentBets;
