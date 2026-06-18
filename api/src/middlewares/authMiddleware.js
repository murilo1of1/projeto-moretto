import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).send({
                message: 'Token não informado'
            });
        }

        const [, token] = authorization.split(' ');

        const decoded = jwt.verify(token,process.env.TOKEN_KEY);

        req.user = decoded;

        return next();
    } catch (error) {
        return res.status(401).send({
            message: 'Token inválido ou expirado'
        });
    }
};

export const adminOnly = (req, res, next) => {
    if (req.user.tipoPessoa !== 2) {
        return res.status(403).send({
            message: 'Acesso permitido apenas para administradores'
        });
    }

    return next();
};