import express from 'express';
import { UserController } from './user.controller';
const router = express.Router();

router.post(
  '/signup',
  UserController.createUser
);
router.get('/', UserController.getAlluser);
router.get('/:id', UserController.getSingleuser);
router.patch('/:id', UserController.updateuser);
router.delete('/:id', UserController.deleteuser);

export const UserRoutes = router;
