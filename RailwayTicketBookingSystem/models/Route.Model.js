const routeSchema = new mongoose.Schema(
  {
    train: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Train',
      required: true,
    },
    stops: [
      {
        station: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Station',
          required: true,
        },
        arrivalTime: {
          type: String,
          required: true,
        },
        departureTime: {
          type: String,
          required: true,
        },
        distanceFromSource: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);
