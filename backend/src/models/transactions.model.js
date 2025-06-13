import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const transactionSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  wager: {
    type: Number,
    required: true,
    min: 0
  },
  win: {
    type: Number,
    required: true,
    min: 0
  },
  result: {
    type: [String], // e.g., ["🍒", "🍋", "🍒"]
    required: true
  },
  isFreeSpin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

transactionSchema.plugin(mongooseAggregatePaginate)

transactionSchema.index({ userId: 1, createdAt: -1 });


export const Transaction  = mongoose.model('Transaction', transactionSchema);
