import api from "../../../../app/ApiConfig";
import { Apis } from "../../../../config";
import { NotificationManager } from "react-notifications";
import { setCookie, getCookie, eraseCookie } from "../../../../function";
import apiError from "../../../../common/apiError";
const getUserLogin = async (data) => {
  try {
    let result = await api.post(Apis.GetUserLogin, data, {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getUserRegister = async (data) => {
  try {
    let result = await api.post(Apis.GetUserRegsiter, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const authenticate = async (data, email, removeQueryString) => {
  if (typeof window !== "undefined") {
    setCookie("token", data, 2);
    setCookie("email", email, 2);
    setTimeout(function () {
      if (removeQueryString) {
        window.location = window.location.pathname;
      } else {
        window.location.reload();
      }
    }, 1000);
  }
};

const getAddNewAddress = async (data) => {
  try {
    let result = await api.post(Apis.GetAddNewAddress, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
    });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getDeleteProduct = async (data) => {
  try {
    let result = await api.post(Apis.GetDeleteProduct, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
    });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getCustomerDetail = async () => {
  try {
    let result = await api.get(Apis.GetCustomerDetails, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
    });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getCustomerUpdate = async (data) => {
  try {
    let result = await api.post(Apis.GetCustomerUpdateDetails, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("token"),
      },
    });
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const authenticateByCart = async (token, email) => {
  if (typeof window !== "undefined") {
    setCookie("token", token, 2);
    setCookie("email", email, 2);
    setTimeout(function () {
      window.location.href = "/checkout";
    }, 1000);
  } else {
    NotificationManager.error("Please check your login", "Input Error");
  }
};

const logout = (next) => {
  if (typeof window !== "undefined") {
    eraseCookie("token");
    eraseCookie("email");
    window.location.href = "/";
    // next();
  }
};

const isAuthenticate = () => {
  if (typeof window == "undefined") {
    return false;
  }
  return getCookie("token");
};

const getUserResetPassword = async (data) => {
  try {
    let result = await api.post(Apis.GetCustomerResetPassword, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
const getCustomerResetEmail = async (data) => {
  try {
    let result = await api.post(Apis.GetCustomerResetEmail, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};

const getCustomerEmailVerify = async (data) => {
  try {
    let result = await api.post(Apis.GetCustomerEmailVerify, data);
    if (result.data.error) {
      NotificationManager.error(result.data.error);
      return null;
    }
    return result.data;
  } catch (error) {
    apiError(error);
  }
};
export default {
  getUserLogin,
  authenticate,
  isAuthenticate,
  authenticateByCart,
  getUserRegister,
  getAddNewAddress,
  getCustomerDetail,
  getDeleteProduct,
  getCustomerUpdate,
  getUserResetPassword,
  getCustomerResetEmail,
  getCustomerEmailVerify,
  logout,
};
