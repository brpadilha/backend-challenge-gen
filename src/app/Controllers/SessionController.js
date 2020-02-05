import * as Yup from 'yup';

import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

import Client from '../models/Client';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      cpf: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { id, cpf, password } = req.body;

    const idClient = await Client.findOne({ where: { id } });

    const cpfClient = await Client.findOne({ where: { cpf } });

    if (!cpfClient || !idClient) {
      return res
        .status(401)
        .json({ error: 'Client not found check the data again' });
    }
    if (idClient.id !== cpfClient.id && idClient.cpf !== cpfClient.cpf) {
      return res.status(401).json({ error: 'Account does not match with cpf' });
    }

    if (!(await idClient.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { name, balance, manager } = idClient;

    return res.json({
      client: {
        id,
        name,
        cpf,
        balance,
        manager,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
