import { createContext, ReactNode, useEffect, useState } from 'react';

import Cookies from 'js-cookie';

import { api } from '../services/api';

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
};

type AuthContextData = {
  user: User | null;
  signInUrl: string;
  signOut: () => void;
};

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  };
};

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;

export const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${GITHUB_CLIENT_ID}`;

  async function signIn(githubCode: string) {
    const response = await api.post<AuthResponse>('authenticate', {
      code: githubCode,
    });

    const { token, user } = response.data;

    localStorage.setItem('@dowhile:token', token);
    Cookies.set('@dowhile:token', token);

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    setUser(user);
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem('@dowhile:token');
    Cookies.remove('@dowhile:token');
  }

  useEffect(() => {
    // const token = localStorage.getItem('@dowhile:token');
    const token = Cookies.get('@dowhile:token');

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    if (token) {
      api.get<User>('profile').then((response) => {
        setUser(response.data);
      });
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');

    if (hasGithubCode) {
      const [urlWhithoutCode, githubCode] = url.split('?code=');

      window.history.pushState({}, '', urlWhithoutCode);

      signIn(githubCode);
    }
  }, []);

  return <AuthContext.Provider value={{ signInUrl, user, signOut }}>{props.children}</AuthContext.Provider>;
}
