import { getConnection } from 'typeorm';
import Customer from '../infra/entity/Customer';
import flatPermissions, { CustomerPermisson } from './flatUserPermissions';

export const getUserPermission = async (id: number): Promise<CustomerPermisson | null> => {
  try {
    const user = await getConnection()
      .getRepository(Customer)
      .findOne({ relations: ['subscriptions', 'subscriptions.permissions'], where: { id } });
    if (user) {
      return flatPermissions(user);
    }
  } catch (err) {
    return null;
  }
  return null;
};
