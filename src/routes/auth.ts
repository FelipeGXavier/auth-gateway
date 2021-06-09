import { Request, Response, Router } from 'express';
import { getConnection } from 'typeorm';
import * as yup from 'yup';
import { compare, hash } from '../infra/crypt/bcrypt';
import { signToken } from '../infra/crypt/jwt';
import { CreateAccountRequest, LoginAccountRequest } from '../infra/data/auth';
import Customer from '../infra/entity/Customer';

export const authRouter = Router();

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
      return res.sendStatus(201);
    }
    return res.sendStatus(409);
  }
  return res.sendStatus(400);
};

const signIn = async (req: Request, res: Response) => {
  const schema = yup.object().shape({
    login: yup.string().required(),
    password: yup.string().required(),
  });
  const request: LoginAccountRequest = req.body;
  if (schema.isValid(request)) {
    try {
      const customer = await getConnection().getRepository(Customer).findOneOrFail({ login: request.login });
      const rightLoginPassword = await compare(request.password, customer.password);
      if (rightLoginPassword) {
        return res.send({ token: signToken({ name: customer.name, id: customer.id }) });
      }
      return res.sendStatus(401);
    } catch (err) {
      return res.sendStatus(400);
    }
  }
  return res.sendStatus(400);
};

authRouter.post('/auth/sign-up', signUp);
authRouter.post('/auth/sign-in', signIn);
