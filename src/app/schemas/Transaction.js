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
  },
  {
    timestamps: {
      createdAt: 'created_at',
    },
  }
);

export default mongoose.model('Transaction', TransactionSchema);
