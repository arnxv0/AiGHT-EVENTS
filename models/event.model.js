const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = Schema(
  {
    //name
    title: {
      type: String,
      required: true,
      trim: true,
    },

    //description
    description: {
      type: String,
      required: true,
      trim: true,
    },

    //participentCount {type , min , max}
    individual: {
      type: Boolean,
      default: true,
    },
    group: {
      type: Boolean,
      default: false,
    },
    minParticipants: {
      type: Number,
      default: 1,
    },
    maxParticipants: {
      type: Number,
      default: 1,
    },

    //event time and date
    eventDate: {
      type: Date,
      default: new Date(),
    },

    //college
    college: {
      type: String,
      default: "None",
    },

    //registration ends by
    registrationEndDate: {
      type: Date,
      default: new Date(),
    },

    //prize
    prize: {
      type: String,
      default: "None",
    },

    //google form link
    formLink: {
      type: String,
      required: true,
    },

    //category
    category: {
      type: String,
      default: "Other",
    },

    //interested in
    views: {
      type: Number,
      default: 0,
    },

    organizerId: {
      type: String,
      required: true,
    },

    expired: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = Event = mongoose.model("event", EventSchema);
