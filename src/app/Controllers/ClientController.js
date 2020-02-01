import Client from '../models/Client';

class ClientController {
  async store(req, res) {
    const cpfExists = await Client.findOne({ where: { cpf: req.body.cpf } });

    if (cpfExists) {
      return res
        .status(400)
        .json({ error: 'Client with this CPF already exists' });
    }

    const client = await Client.create(req.body);

    return res.json(client);
  }
}

export default new ClientController();
