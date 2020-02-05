import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    name_client: {
      type: String,
      references: { model: 'clients', key: 'name' },
    },
    origin_client_id: {
      type: Number,
      references: { model: 'clients', key: 'id' },
      required: true,
    },
    destination_client_id: {
      type: Number,
      references: { model: 'clients', key: 'id' },
      required: true,
    },
    cpf_destination_client_id: {
      type: String,
      references: { model: 'clients', key: 'cpf' },
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
    },
  }
);

export default mongoose.model('Transaction', TransactionSchema);
