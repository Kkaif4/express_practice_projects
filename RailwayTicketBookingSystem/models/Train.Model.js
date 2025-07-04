const trainSchema = new mongoose.Schema(
  {
    trainNumber: {
      type: String,
      required: true,
      unique: true,
    },
    trainName: {
      type: String,
      required: true,
    },
    mainSource: {
      type: String,
      required: true,
    },
    mainDestination: {
      type: String,
      required: true,
    },
    sourceDepartureTime: {
      type: String,
      required: true,
    },
    destinationArrivalTime: {
      type: String,
      required: true,
    },
    totalSeats: {
      type: Number,
      required: true,
    },
    routes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Route',
      },
    ],
    availableSeats: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
