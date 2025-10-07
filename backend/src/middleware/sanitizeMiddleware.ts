import { Request, Response, NextFunction } from 'express';

// Função para escapar caracteres HTML e prevenir XSS
const escapeHtml = (text: string): string => {
  if (typeof text !== 'string') return text;
  
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return text.replace(/[&<>"'/]/g, (char) => map[char]);
};

// Sanitizar recursivamente objetos
const sanitizeObject = (obj: any): any => {
  if (typeof obj === 'string') {
    return escapeHtml(obj);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }
  
  if (obj !== null && typeof obj === 'object') {
    const sanitized: any = {};
    for (const key in obj) {
      sanitized[key] = sanitizeObject(obj[key]);
    }
    return sanitized;
  }
  
  return obj;
};

export const sanitizeMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  
  // req.query e req.params são getters e não podem ser reatribuídos diretamente.
  // A sanitização deles deve ser feita ao acessá-los ou ao construir respostas.
  // Para este exemplo, vamos focar na sanitização do body que é mais comum para XSS em inputs de formulário.
  
  next();
};
