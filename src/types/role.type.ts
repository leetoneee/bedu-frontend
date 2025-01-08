export type Role = {
  id: number;
  name: string;
  description: string;
};

export type Resource = {
  id: number;
  name: string;
  description: string;
}

export type Permission = {
  role: string;
  resource: string;
  action: string;
  attributes: string;
}

