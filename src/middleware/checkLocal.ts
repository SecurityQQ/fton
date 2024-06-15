// middleware/checkLocal.ts
import { NextApiRequest, NextApiResponse } from 'next';

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

const checkLocal = (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
  const authKey = req.headers['x-auth-key'];
  const expectedAuthKey = process.env.AUTH_KEY;
  const origin = req.headers.origin || req.headers.referer || '';

  if (req.url?.startsWith('/api/tgbot') || req.url?.startsWith('/api/validate-hash')) {
    // Allow /api/tgbot, /api/validate-hash to be accessed in all environments
    return next();
  } else if (allowedOrigins.some((allowedOrigin) => origin.startsWith(allowedOrigin))) {
    // Allow access if the request comes from an allowed origin
    return next();
  } else if (process.env.NODE_ENV === 'development') {
    // Allow all other API requests only in local development
    return next();
  } else if (
    authKey !== undefined &&
    expectedAuthKey !== undefined &&
    authKey === expectedAuthKey
  ) {
    // Allow access if the correct auth key is provided
    return next();
  } else {
    // Restrict access in production if auth key is missing or incorrect
    res.status(403).json({ error: 'Forbidden: Invalid API key or origin' });
  }
};

export default checkLocal;
