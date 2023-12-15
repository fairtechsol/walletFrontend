import { useSelector } from "react-redux";
import ListItems from "../../components/walletSettings/ListItems";
import { RootState } from "../../store/store";

const WalletSettings = () => {

  const { profileDetail } = useSelector((state: RootState) => state.user.profile);

  return (
    <ListItems
      title={"Wallet"}
      walletAccountDetail={profileDetail}
    />
  );
};

export default WalletSettings;
