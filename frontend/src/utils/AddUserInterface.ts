// Can be put into the AuthButton file if not necessary here

export interface AddUserInput {
  name: string;
  email: string;
}

export interface AddUserResponse {
  addUser: {
    id: number;
    name: string;
    email: string;
  };
}
