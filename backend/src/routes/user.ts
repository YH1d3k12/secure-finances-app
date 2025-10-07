import { Router } from 'express';
import { AuthController } from '../controller/user-controller';
import { RegisterDto, LoginDto } from '../dto/user-dto';
import { validationMiddleware } from '../middleware/validation';

const router = Router();
const authController = new AuthController();

router.post(
    '/register',
    validationMiddleware(RegisterDto),
    authController.register
);
router.post('/login', validationMiddleware(LoginDto), authController.login);

export default router;
