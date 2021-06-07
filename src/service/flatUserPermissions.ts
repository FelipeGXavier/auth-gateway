import Customer from '../infra/entity/Customer';

type CustomerPermisson = {
  id: number;
  name: string;
  modules: string[];
  permissions: string[];
};

const flatPermissions = (customer: Customer): CustomerPermisson => {
  const { id, name } = customer;
  const modules = customer.subscriptions.map((sub) => sub.prefix);
  const permissions = [].concat(
    [],
    ...customer.subscriptions.map((sub) => {
      return sub.permissions.map((permission) => {
        return `${sub.prefix}.${permission.target}.${permission.action}`;
      });
    }),
  );
  return { id, name, modules, permissions };
};

export default flatPermissions;
