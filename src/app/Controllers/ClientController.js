import * as Yup from 'yup';
import Client from '../models/Client';

class ClientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cpf: Yup.string().required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const cpfExists = await Client.findOne({ where: { cpf: req.body.cpf } });

    if (cpfExists) {
      return res
        .status(400)
        .json({ error: 'Client with this CPF already exists' });
    }

    const client = await Client.create(req.body);

    return res.json(client);
  }

  async index(req, res) {
    const clients = await Client.findAll({
      attributes: ['id', 'name', 'cpf', 'balance'],
    });
    return res.json(clients);
  }
}

export default new ClientController();
