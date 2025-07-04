const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    ticket: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket',
      },
    ],
    passengers: [
      {
        name: {
          type: String,
          required: true,
        },
        age: {
          type: Number,
          required: true,
        },
        gender: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);
