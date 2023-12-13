import ListItems from "../../components/walletSettings/ListItems";

const Reports = () => {
  // const menutItems = [
  //   { title: "Deposit", link: "/wallet/walletSettings/deposit" },
  //   { title: "Withdraw", link: "/wallet/walletSettings/withdraw" },
  //   {
  //     title: "Change Credit Reference",
  //     link: "/wallet/walletSettings/credit_reference",
  //   },
  // ];

  const walletAccountDetail: any = {
    id: "0fcef171-3e9c-4b97-bba2-7c2e7bca112f",
    userName: "FAIRGAMEWALLET",
    fullName: "fair game wallet",
    city: null,
    phoneNumber: "1234567890",
    roleId: "37e5f29e-8c24-413d-812a-66eb4828e32d",
    m_partnership: 0,
    sa_partnership: 0,
    a_partnership: 0,
    remark: null,
    createdBy: null,
    max_bet: null,
    min_bet: null,
    isActive: true,
    createAt: "2023-11-20T07:19:51.163Z",
    updateAt: "2023-12-04T11:03:24.657Z",
    sm_partnership: 0,
    fw_partnership: 0,
    fa_partnership: 0,
    all_blocked: 0,
    bet_blocked: 0,
    withdraw_week_day: 0,
    exposure_limit: 0,
    current_balance: 963770521,
    exposure: 180610,
    credit_refer: 500000,
    profit_loss: 965473621,
    point_profit_loss: 100,
    sessionComisssion: null,
    matchTypeComission: null,
    matchComission: null,
    TotalComission: "0.00(100%)",
    loginAt: "2023-12-04T11:03:24.603Z",
    percent_profit_loss: "965473621.00",
    available_balance: 963770521,
    balance: "965973621.00",
  };

  return (
    <ListItems
      title={"Wallet"}
      // menutItems1={menutItems}
      walletAccountDetail={walletAccountDetail}
    />
  );
};

export default Reports;
