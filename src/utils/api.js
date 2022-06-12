import { MAIN_URL } from "./rootConstants";
import { getCookie, setCookie } from "./utils";

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = () => {
  return fetch(`${MAIN_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.massage === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const forgotPassword = (data) => {
  return fetchWithRefresh(`${MAIN_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
};

export const resetPassword = (data) => {
  return fetchWithRefresh(`${MAIN_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
};

export const registerUser = (data) => {
  return fetch(`${MAIN_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then(checkResponse)
    .then((data) => (data?.success ? data : Promise.reject(data)));
};

export const getUser = () => {
  return fetchWithRefresh(`${MAIN_URL}/auth/user`, {
    method: "GET",
    headers: {
      Authorization: getCookie("accessToken"),
    },
  });
};

export const updateUser = (data) => {
  return fetchWithRefresh(`${MAIN_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: getCookie("accessToken"),
    },
    body: JSON.stringify(data),
  });
};

export const login = (data) => {
  return fetch(`${MAIN_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
};

export const logout = () => {
  return fetchWithRefresh(`${MAIN_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};
