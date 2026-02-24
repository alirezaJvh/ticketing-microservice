import express, { type Response, type Request } from 'express';
import { requireAuth, currentUser } from '@alirezajvh/common';

const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  async (req: Request, res: Response) => {
    res.sendStatus(200);
  },
);

export { router as createTicketRouter };
