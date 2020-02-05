import * as Yup from 'yup';
import Transaction from '../schemas/Transaction';
import Client from '../models/Client';

class TransactionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      type: Yup.string().required(),
      value: Yup.number().required(),
      destination_client_id: Yup.number().required(),
      cpf: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { type, value, destination_client_id, cpf } = req.body;

    const id = destination_client_id;

    const idClient = await Client.findOne({
      where: { id },
    });

    const cpfClient = await Client.findOne({
      where: { cpf },
    });

    if (!cpfClient || !idClient) {
      return res
        .status(401)
        .json({ error: 'Client not found check the data again' });
    }

    if (idClient.id !== cpfClient.id && idClient.cpf !== cpfClient.cpf) {
      return res.status(401).json({ error: 'Account does not match with cpf' });
    }

    const name_destination_client_id = idClient.name;

    const originAccount = await Client.findOne({
      where: { id: req.clientId },
      attributes: ['id', 'name', 'cpf'],
    });

    const origin_client_id = originAccount.id;

    const name_client = originAccount.name;

    const transaction = await Transaction.create({
      origin_client_id,
      name_client,
      type,
      destination_client_id,
      name_destination_client_id,
      value,
      cpf,
    });

    const senderMoney = await Client.findOne({
      where: {
        id: req.clientId,
      },
      attributes: {
        exclude: ['_id', 'password_hash', 'updatedAt'],
      },
    });

    if (senderMoney.balance < value) {
      return res
        .status(400)
        .json({ error: 'You dont have money enouth to send' });
    }

    senderMoney.balance -= value;

    await senderMoney.save();

    const receiverMoney = await Client.findOne({
      where: {
        id: destination_client_id,
      },
      attributes: ['id', 'name', 'cpf', 'balance', 'createdAt'],
    });

    receiverMoney.balance += value;

    await receiverMoney.save();

    return res.json({ transaction, senderMoney, receiverMoney });
  }

  async index(req, res) {
    // const { type } = req.body;

    const checkIsManager = await Client.findOne({
      where: {
        id: req.clientId,
        manager: true,
      },
    });

    if (!checkIsManager) {
      return res
        .status(401)
        .json({ error: 'Only manager can load the bank transactions' });
    }

    const transaction = await Transaction.find(req.query);

    return res.json(transaction);
  }
}

export default new TransactionController();
