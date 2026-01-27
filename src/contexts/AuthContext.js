import { Token, User } from "@/api";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

const tokenCtrl = new Token();
const userCtrl = new User();

export const AuthContext = createContext();
export function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const token = tokenCtrl.getToken();
      if (!token || tokenCtrl.hasExpired(token)) {
        setLoading(false);
        return;
      }
      await login(token);
    })();
  }, []);

  const logout = () => {
    tokenCtrl.removeToken();
    setUser(null);
    setToken(null);
    router.push("/join/login");
  };

  const login = async (token) => {
    try {
      tokenCtrl.setToken(token);
      const userResponse = await userCtrl.getMe();
      setUser(userResponse);
      setToken(token);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (key, value) => {
    setUser((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const data = {
    accessToken: token,
    user,
    login,
    logout,
    updateUser,
  };

  if (loading) return null;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
