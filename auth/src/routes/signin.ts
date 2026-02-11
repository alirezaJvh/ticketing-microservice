import express, { type Request, type Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError, validateRequest } from '@alirezajvh/common';
import { User } from '../models/user';
import { Password } from '../utils/password';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 to 20 chars'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await Password.compare(user.password, password);
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials2');
    }

    const userJwt = jwt.sign({ email }, process.env.JWT_KEY!);
    req.session = {
      jwt: userJwt,
    };
    res.status(200).send(user);
  }
);

export { router as signInRouter };
