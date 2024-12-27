import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number;
      name: string;
      role: string;
      accessToken: string;
    };
  }
  interface User {
    id: number;
    name: string;
    accessToken: string;
    role: {
      id: number;
      name: string;
    };
  }
}
