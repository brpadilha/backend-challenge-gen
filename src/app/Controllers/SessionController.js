import * as Yup from 'yup';

import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

import Client from '../models/Client';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      cpf: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { cpf, password } = req.body;

    const client = await Client.findOne({ where: { cpf } });

    if (!client) {
      return res.status(401).json({ error: 'Client not found' });
    }

    if (!(await client.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = client;

    return res.json({
      client: {
        id,
        name,
        cpf,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
