export interface User {
  id?: string;
  name: string;
  email: string;
}

export interface Login {
  user: User,
  token: string
}
