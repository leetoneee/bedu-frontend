import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: string;
      id: number;
      isActive: true;
      name: string;
      gender: string;
      birthday: string;
      address: string;
      cid: string;
      email: string;
      phone: string;
      currentLevel: string;
      username: string;
      // refreshToken: string;
      role: {
        id: number;
        name: string;
      };
    };
    accessToken: string;
  }
}
