import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

/**
 * Middleware genérico para validação de DTOs usando class-validator.
 * Exemplo: router.post('/', validationMiddleware(CreateUserDto), controller);
 */
export const validationMiddleware = (dtoClass: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Transforma o body em uma instância da classe DTO
            const dtoObject = plainToInstance(dtoClass, req.body, {
                enableImplicitConversion: true, // converte "1" -> 1 automaticamente
            });

            const errors = await validate(dtoObject, {
                whitelist: true, // remove propriedades não declaradas no DTO
                forbidNonWhitelisted: true, // lança erro se enviar campos extras
            });

            if (errors.length > 0) {
                const errorMessages = errors
                    .map(error =>
                        Object.values(error.constraints || {}).join(', ')
                    )
                    .join('; ');

                return res.status(400).json({ error: errorMessages });
            }

            // substitui req.body pelo objeto já validado
            req.body = dtoObject;
            next();
        } catch (error) {
            console.error('Erro no validationMiddleware:', error);
            res.status(400).json({ error: 'Dados inválidos ou malformados.' });
        }
    };
};
