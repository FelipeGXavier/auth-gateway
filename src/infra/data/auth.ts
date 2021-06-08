export type CustomerLoginPayload = {
  name: string;
  id: number;
};

export type CreateAccountRequest = {
  name: string;
  login: string;
  password: string;
  cpf: string;
  birth: string;
};

export type LoginAccountRequest = {
  login: string;
  password: string;
};
