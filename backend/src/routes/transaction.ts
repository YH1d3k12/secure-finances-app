import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { TransactionController } from '../controller/transaction-controller';
import {
    CreateTransactionDto,
    UpdateTransactionDto,
} from '../dto/transaction-dto';
import { authMiddleware } from '../middleware/auth';
import { validationMiddleware } from '../middleware/validation';

const router = Router();
const transactionController = new TransactionController();

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(
            null,
            file.fieldname +
                '-' +
                uniqueSuffix +
                path.extname(file.originalname)
        );
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|pdf/;
        const extname = allowedTypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Apenas arquivos JPEG, PNG e PDF são permitidos'));
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
});

router.use(authMiddleware);

router.post(
    '/',
    upload.single('attachment'),
    validationMiddleware(CreateTransactionDto),
    transactionController.create
);
router.get('/', transactionController.getAll);
router.get('/balance', transactionController.getBalance);
router.put(
    '/:id',
    upload.single('attachment'),
    validationMiddleware(UpdateTransactionDto),
    transactionController.update
);
router.delete('/:id', transactionController.delete);

export default router;
