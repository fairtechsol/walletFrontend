export interface BalanceDetails {
  ul_credit_refer: string;
  master_balance: string;
  available_balance: string;
  dl_balance: string;
  upper_level: string;
  available_balance_pl: string;
  dl_credit_refer: string;
  dl_profit_loss: string;
  profit_loss: string;
}

export interface DataShowInterface {
  title?: string;
  value?: string;
  containerStyle?: any;
  valueContainerStyle?: any;
}
