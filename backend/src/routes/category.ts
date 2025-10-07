import { Router } from 'express';
import { CategoryController } from '../controller/category-controller';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category-dto';
import { authMiddleware, validationMiddleware } from '../middleware';

const router = Router();
const categoryController = new CategoryController();

router.use(authMiddleware);

router.post(
    '/',
    validationMiddleware(CreateCategoryDto),
    categoryController.create
);
router.get('/', categoryController.getAll);
router.put(
    '/:id',
    validationMiddleware(UpdateCategoryDto),
    categoryController.update
);
router.delete('/:id', categoryController.delete);

export default router;
