import * as Yup from 'yup';
import Transaction from '../schemas/Transaction';
import Client from '../models/Client';

class TransactionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      type: Yup.string().required(),
      value: Yup.number().required(),
      destination_client_id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { type, value, destination_client_id } = req.body;

    const transaction = await Transaction.create({
      origin_client_id: req.clientId,
      type,
      destination_client_id,
      value,
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
    const { type } = req.body;

    if (type == null) {
      const transaction = await Transaction.find({
        origin_client_id: req.clientId,
      }).select('-_id -updatedAt -__v');

      return res.json(transaction);
    }

    const transaction = await Transaction.find({
      type,
    }).select('-_id -updatedAt -__v');

    return res.json(transaction);
  }
}

export default new TransactionController();
