import moment from "moment-timezone";

const order: any = {
  session: 1,
  overByover: 2,
  ballByBall: 3,
  fancy1: 4,
  khado: 5,
  meter: 6,
  oddEven: 5,
};
export const formatNumber = (value?: any, isRound?: any) => {
  if (value >= 1000) {
    return isRound
      ? Math.round(value / 1000) + "k"
      : (value / 1000).toFixed(1) + "k";
  } else {
    return isRound ? Math.round(value) : value;
  }
};

export const customSort = (a: any, b: any) => {
  const order: any = { live: 1, save: 2, result: 3 };
  return order[a?.activeStatus] - order[b?.activeStatus];
};

export const formatToINR = (amount: any) => {
  const formatter = new Intl.NumberFormat("en-IN", {
    currency: "INR",
  });
  return formatter.format(parseFloat(amount || 0));
};

export const numberInputOnWheelPreventChange = (e: any) => {
  e.target.blur();
  e.stopPropagation();
  setTimeout(() => {
    e.target.focus();
  }, 0);
};

export const handleNumber = (num: any, color: any) => {
  let amount = parseFloat(num)?.toFixed(2);
  let value;

  if (amount === "-0.00") {
    amount = "0.00";
  }

  if (amount && amount?.includes(".")) {
    value = amount?.split(".");
  } else {
    value = amount;
  }
  return value?.length > 0 ? (
    <>
      <span style={{ color: color }}>{formatToINR(value[0])}.</span>
      <span style={{ fontSize: "0.8em", color: color }}>{value[1]}</span>
    </>
  ) : null;
};

export const getTimeLeft = (matchStartDate: string | any) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const targetDate = moment(matchStartDate).tz(timezone);

  const difference = targetDate.diff(moment().tz(timezone), "milliseconds");
  if (difference <= 0) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
};

export const customSortOnName = (a: any, b: any) => {
  let nameA = a.name;
  let nameB = b.name;

  let numA = parseFloat(nameA.match(/[\d.]+$/));
  let numB = parseFloat(nameB.match(/[\d.]+$/));

  if (isNaN(numA)) numA = 0;
  if (isNaN(numB)) numB = 0;

  return numA - numB;
};

export const stripUrl = (url: any) => {
  url = url?.replace(/^(?:https?:\/\/)/, "");

  const parts = url?.split(".");

  url = parts?.[parts.length - 2];

  return url || "";
};

export const customSortBySessionMarketName = (
  [_, nameA]: any,
  [__, nameB]: any
) => {
  const orderA = order[nameA] || Infinity;
  const orderB = order[nameB] || Infinity;
  return orderA - orderB;
};

export const roundToTwoDecimals = (value: any) => {
  return Math.round(value * 100) / 100;
};
