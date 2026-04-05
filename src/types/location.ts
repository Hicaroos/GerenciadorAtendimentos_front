export type CreateLocationRequest = {
  name: string;
  address?: string;
  description?: string;
};

export type LocationResponse = {
  id: number;
  name: string;
  address?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};
