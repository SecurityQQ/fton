// utils/withMiddleware.ts
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

import checkLocal from '@/middleware/checkLocal';

const withMiddleware = (handler: NextApiHandler): NextApiHandler => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    await new Promise<void>((resolve) => {
      checkLocal(req, res, resolve);
    });

    if (!res.headersSent) {
      return handler(req, res);
    }
  };
};

export default withMiddleware;
