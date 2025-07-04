const TicketSchema = new mongoose.Schema(
  {
    train: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Train',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    seatNumber: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
