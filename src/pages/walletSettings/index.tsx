import { useSelector } from "react-redux";
import ListItems from "../../components/walletSettings/ListItems";
import { RootState } from "../../store/store";

const WalletSettings = () => {

  const { userDetail } = useSelector((state: RootState) => state.user.profile);

  return (
    <ListItems
      title={"Wallet"}
      walletAccountDetail={userDetail}
    />
  );
};

export default WalletSettings;
