import { NextFunction, Request, RequestHandler, Response } from 'express';
import { decodeToken } from '../crypt/jwt';
import { getUserPermission } from '../../service/getUserPermission';
import { CustomerPermisson } from '../../service/flatUserPermissions';

declare module 'express-serve-static-core' {
  interface Request {
    permission?: CustomerPermisson;
  }
}

export const checkAuth: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers?.['authorization'] || '';
  const token = header.substring(7);
  try {
    const decoded = decodeToken(token);
    req.permission = await getUserPermission(decoded.id);
    return next();
  } catch (err) {
    return res.sendStatus(403);
  }
};
