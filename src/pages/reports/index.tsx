import ListItems from "../../components/report/ListItems";

const Reports = () => {
  const menutItems1 = [
    { title: "Profit/Loss", link: `/wallet/reports/profit_loss` },
    { title: "Profit/Loss Cards", link: `/wallet/reports/profit_loss_cards` },
    { title: "Account Statement", link: `/wallet/reports/account_statement` },
    { title: "Current Bet", link: `/wallet/reports/current_bet` },
    { title: "General Report", link: `/wallet/reports/general_report` },
  ];

  return <ListItems title={"Report"} menutItems1={menutItems1} />;
};

export default Reports;
