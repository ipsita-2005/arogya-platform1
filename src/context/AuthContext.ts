import { createContext } from 'react';

export const AuthContext = createContext<{
  user: { id: string; email: string; name: string } | null;
  setUser: (user: any) => void;
}>({
  user: null,
  setUser: () => {}
});
