import { useState, useEffect } from 'react';
import API from '../api';

export function useAuth() {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  });

  useEffect(() => { if (user) localStorage.setItem('user', JSON.stringify(user)); else localStorage.removeItem('user'); }, [user]);

  const login = (token, userObj) => {
    localStorage.setItem('token', token);
    setUser(userObj);
  };
  const logout = () => { localStorage.removeItem('token'); setUser(null); };

  return { user, setUser, login, logout };
}



