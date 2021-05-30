import { Router } from 'express';
import { getConnection } from 'typeorm';
import Customer from '../entity/Customer';
import flatPermissions from '../service/flatUserPermissions';

export const userRouter = Router();

const getUserPermission = async (req, res) => {
  if (!req.params.id) {
    res.sendStatus(400);
  }
  try {
    const user = await getConnection()
      .getRepository(Customer)
      .findOne({ relations: ['subscriptions', 'subscriptions.permissions'], where: { id: `${req.params.id}` } });
    if (user) {
      res.send(flatPermissions(user));
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.sendStatus(400);
  }
};

userRouter.get('/info/:id', getUserPermission);
