import ListItmes from "../../components/report/ListItmes";

const Reports = () => {
  const menutItems1 = [
    { title: "Profit/Loss", link: `/wallet/reports/profit_loss` },
    { title: "Account Statement", link: `/wallet/reports/account_statement` },
    { title: "Current Bet", link: `/wallet/reports/current_bet` },
    { title: "General Report", link: `/wallet/reports/general_report` },
  ];

  return <ListItmes title={"Report"} menutItems1={menutItems1} />;
};

export default Reports;
