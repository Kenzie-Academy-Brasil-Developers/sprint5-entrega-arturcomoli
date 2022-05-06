export interface CreateUser {
  name: string;
  email: string;
  password: string;
  age: number;
}

export interface ReturnUserCreation {
  id: string;
  name: string;
  email: string;
  age: number;
  created_at: Date;
  updated_at: Date;
}
