import { Request, Response, Router } from 'express';
import { getConnection } from 'typeorm';
import * as yup from 'yup';
import { hash } from '../infra/crypt/bcrypt';
import Customer from '../infra/entity/Customer';

export const authRouter = Router();

type CreateAccountRequest = {
  name: string;
  login: string;
  password: string;
  cpf: string;
  birth: string;
};

const signUp = async (req: Request, res: Response) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    login: yup.string().required(),
    password: yup.string().required(),
    cpf: yup.string().required(),
    birth: yup.date().min(new Date(1900, 0, 1)).required(),
  });
  const request: CreateAccountRequest = req.body;
  const validRequest = await schema.isValid(request);
  if (validRequest) {
    const userExists = await getConnection().getRepository(Customer).findOne({ login: request.login });
    if (!userExists) {
      request.password = await hash(request.password);
      const customer = getConnection().getRepository(Customer).create(request);
      await getConnection().getRepository(Customer).save(customer);
      res.sendStatus(201);
    } else {
      res.sendStatus(409);
    }
  } else {
    res.sendStatus(400);
  }
};

authRouter.post('/auth/sign-up', signUp);
