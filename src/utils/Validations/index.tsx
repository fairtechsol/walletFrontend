import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  userName: Yup.string()
    .max(20, "Username must be at most 20 characters long")
    .required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export const depositAmountValidations = Yup.object({
  amount: Yup.string().required("Amount is required"),
  transactionPassword: Yup.string().required(
    "Transaction Password is required"
  ),
});
export const userChangePasswordValidations = Yup.object({
  // newPassword: Yup.string().required("Amount is required"),
  newPassword: Yup.string()
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter"
    )
    .matches(
      /^(?=.*[a-zA-Z].*[a-zA-Z].*[a-zA-Z].*[a-zA-Z])/,
      "Password must contain at least four alphabet letters"
    )
    .matches(
      /^(?=.*\d.*\d.*\d.*\d)/,
      "Password must contain at least four numbers"
    ),
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
      /^(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter"
    )
    .matches(
      /^(?=.*[a-zA-Z].*[a-zA-Z].*[a-zA-Z].*[a-zA-Z])/,
      "Password must contain at least four alphabet letters"
    )
    .matches(
      /^(?=.*\d.*\d.*\d.*\d)/,
      "Password must contain at least four numbers"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});
export const changePasswordValidation = (item: any) => {
  return Yup.object({
    oldPassword: Yup.string()
      .required("Old Password is required")
      .test({
        name: "oldPassword",
        message: "Old Password Does Not Match",
        test: async function (value: any) {
          if (value) {
            try {
              return item;
            } catch (error) {
              console.log(error);
            }
          }
          return true;
        },
      }),
    newPassword: Yup.string()
      .required("New password is required")
      .matches(
        /^(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .matches(
        /^(?=.*[a-zA-Z].*[a-zA-Z].*[a-zA-Z].*[a-zA-Z])/,
        "Password must contain at least four alphabet letters"
      )
      .matches(
        /^(?=.*\d.*\d.*\d.*\d)/,
        "Password must contain at least four numbers"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
      .required("Confirm password is required"),
  });
};
export const addUserValidation = (item: any) => {
  return Yup.object({
    userName: Yup.string()
      .required("Username is required")
      .test({
        name: "clientName",
        message: "Client Name already exists",
        test: async function (value: any) {
          if (value) {
            try {
              return !item;
            } catch (error) {
              console.log(error);
            }
          }
          return true;
        },
      }),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .matches(
        /^(?=.*[a-zA-Z].*[a-zA-Z].*[a-zA-Z].*[a-zA-Z])/,
        "Password must contain at least four alphabet letters"
      )
      .matches(
        /^(?=.*\d.*\d.*\d.*\d)/,
        "Password must contain at least four numbers"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Confirm Password is required"),
    fullName: Yup.string()
      .notRequired()
      .matches(
        /^[a-zA-Z\s]*$/,
        "Full Name should only contain letters and spaces"
      )
      .max(20, "Full Name must be at most 20 characters"),
    roleName: Yup.object({
      value: Yup.string().required("Please select an option"),
      label: Yup.string().required("Please select an option"),
    }),
    adminTransPassword: Yup.string().required(
      "Admin Transaction Password is required"
    ),
  });
};

export const SuperURLValidation = Yup.object({
  userName: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter"
    )
    .matches(
      /^(?=.*[a-zA-Z].*[a-zA-Z].*[a-zA-Z].*[a-zA-Z])/,
      "Password must contain at least four alphabet letters"
    )
    .matches(
      /^(?=.*\d.*\d.*\d.*\d)/,
      "Password must contain at least four numbers"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
  domain: Yup.string().required("Domain is required"),
  creditRefrence: Yup.string().required("Credit Reference is required"),
  myPartnership: Yup.string().required("My Partnership is required"),
  adminTransPassword: Yup.string().required(
    "Admin Transaction Password is required"
  ),
});

export const FgAdminValidation = Yup.object({
  userName: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter"
    )
    .matches(
      /^(?=.*[a-zA-Z].*[a-zA-Z].*[a-zA-Z].*[a-zA-Z])/,
      "Password must contain at least four alphabet letters"
    )
    .matches(
      /^(?=.*\d.*\d.*\d.*\d)/,
      "Password must contain at least four numbers"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),

  creditRefrence: Yup.string().required("Credit Reference is required"),

  matchCommission: Yup.number().required("Match Commission is required"),
  adminTransPassword: Yup.string().required(
    "Admin Transaction Password is required"
  ),
});

export const changeDeleteCodeValidation = () => {
  return Yup.object({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .matches(
        /^(?=.*[a-zA-Z].*[a-zA-Z].*[a-zA-Z].*[a-zA-Z])/,
        "Password must contain at least four alphabet letters"
      )
      .matches(
        /^(?=.*\d.*\d.*\d.*\d)/,
        "Password must contain at least four numbers"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Confirm Password is required"),
    code: Yup.string().required("Parent Transaction Password is required"),
  });
};
