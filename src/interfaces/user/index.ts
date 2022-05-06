export interface CreateUser {
  name: string;
  email: string;
  password: string;
  age: number;
}

export interface FindUser {
  id: string;
}
