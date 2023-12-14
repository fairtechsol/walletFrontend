import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export const depositAmountValidations = Yup.object({
  amount: Yup.string().required("Amount is required"),
  transactionPassword: Yup.string().required(
    "Transaction Password is required"
  ),
});
export const userChangePasswordValidations = Yup.object({
  newPassword: Yup.string().required("Amount is required"),
  transactionPassword: Yup.string().required(
    "Transaction Password is required"
  ),
});

export const changePasswordSchema = Yup.object({
  oldPassword: Yup.string().required("Old Password is required"),
  newPassword: Yup.string()
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).*$/,
      "Password must contain at least one uppercase letter, one number, and one special character (@ $ ! % * ? &)"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});

export const addUserValidation = Yup.object({
  userName: Yup.string().required("Username is required"),
  // password: Yup.string()
  //   .required("Password is required")
  //   .min(8, "Password must be at least 8 characters long")
  //   .matches(
  //     /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&]).*$/,
  //     "Password must contain at least one uppercase letter, one number, and one special character (@ $ ! % * ? &)"
  //   ),
  // confirmPassword: Yup.string()
  //   .oneOf([Yup.ref("password"), ""], "Passwords must match")
  //   .required("Confirm Password is required"),
  // fullName: Yup.string().required("Full Name is required"),
  // city: Yup.string().required("City is required"),
  // number: Yup.string().required("Number is required"),
  // domain: Yup.string().required("Domain is required"),
  // roleName: Yup.string().required("Account Type is required"),
  // creditReference: Yup.string().required("Credit Reference is required"),
  // uplinePartnership: Yup.string().required("Upline Partnership is required"),
  // myPartnership: Yup.string().required("My Partnership is required"),
  // downlinePartnership: Yup.string().required(
  //   "Downline Partnership is required"
  // ),
  // matchCommissionType: Yup.string().required(
  //   "Match Commission Type is required"
  // ),
  // matchCommission: Yup.number().required("Match Commission is required"),
  // sessionCommission: Yup.number().required("Session Commission is required"),
  // remarks: Yup.string(),
  adminTransPassword: Yup.string().required(
    "Admin Transaction Password is required"
  ),
  // session: Yup.boolean(),
  // bookmaker: Yup.boolean(),
});
