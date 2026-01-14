import { Token } from "@/api";

export async function authFetch(url, params) {
  const tokenCtrl = new Token();
  const token = tokenCtrl.getToken();

  const logout = () => {
    tokenCtrl.removeToken();
    window.location.replace("/");
  };

  if (!token) {
    logout();
    return;
  }
  const hasexpired = tokenCtrl.hasExpired(token);
  if (hasexpired) {
     logout();
     return;
  }

  const paramsFetch = {
    ...params,
    headers: {
      ...params?.headers,
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    return await fetch(url, paramsFetch);
  } catch (error) {
    return error;
  }
}
