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
    },
    origin_client_id: {
      type: Number,
      required: true,
    },
    destination_client_id: {
      type: Number,
      required: true,
    },
    cpf_destination_client_id: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
    },
  }
);

export default mongoose.model('Transaction', TransactionSchema);
