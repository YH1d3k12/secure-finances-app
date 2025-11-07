import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { EntryController } from '../controller/entry-controller';
import { CreateEntryDto, UpdateEntryDto } from '../dto/entry-dto';
import { authMiddleware } from '../middleware/auth';
import { validationMiddleware } from '../middleware/validation';

const router = Router();
const entryController = new EntryController();

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const randomBytes = crypto.randomBytes(16).toString('hex');
        const uniqueSuffix = `${Date.now()}-${randomBytes}`;
        cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
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
    validationMiddleware(CreateEntryDto),
    entryController.create
);
router.get('/', entryController.getAll);
router.get('/balance', entryController.getBalance);
router.put(
    '/:id',
    upload.single('attachment'),
    validationMiddleware(UpdateEntryDto),
    entryController.update
);
router.delete('/:id', entryController.delete);

export default router;
