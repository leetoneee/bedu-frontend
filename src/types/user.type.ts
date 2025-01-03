export type User = {
  id: number;
  name: string;
  gender: string;
  birthday: string;
  address: string;
  cid: string;
  email: string;
  phone: string;
  currentLevel: string;
  username: string;
  password: string;
  role?: {
    id: number;
    name: string;
  }
};
