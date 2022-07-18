import { MAIN_URL } from "./rootConstants";
import { IFormDataTypes } from "./types";
import { getCookie, setCookie } from "./utils";

const checkResponse = async (res: Response) => {
  return (await res).ok
    ? (await res).json()
    : (await res).json().then((err: object) => Promise.reject(err));
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

export const fetchWithRefresh = async (
  url: string,
  options: any
) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err instanceof Error && err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", refreshData.accessToken);
      options.headers.Authorization  = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const forgotPassword = (data: IFormDataTypes) => {
  return fetchWithRefresh(`${MAIN_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });
};

export const resetPassword = (data: IFormDataTypes) => {
  return fetchWithRefresh(`${MAIN_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });
};

export const registerUser = (data: IFormDataTypes) => {
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

export const updateUser = (data: IFormDataTypes) => {
  return fetchWithRefresh(`${MAIN_URL}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: getCookie("accessToken"),
    },
    body: JSON.stringify(data),
  });
};

export const login = (data: IFormDataTypes) => {
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
