import { useEffect } from "react";
import ListItems from "../../components/walletSettings/ListItems";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { getUsersProfile } from "../../store/actions/user/userAction";

const WalletSettings = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersProfile());
  }, []);
  return <ListItems title={"Wallet"} />;
};

export default WalletSettings;
