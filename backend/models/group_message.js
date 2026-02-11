const mongoose = require('mongoose')

const groupMessageSchema = new mongoose.Schema({
    from_user:{
        type: String
    },
    room:{
        type: String,
        enum: ["Gbc", "Card games", "Sports", "Pets", "Food"]
    },
    message:{
        type: String
    },
    date_sent:{
        type: Date
    }
})

groupMessageSchema.pre('save', () => {
  let date_sent = Date.now()

  if (!this.date_sent) {
    this.date_sent = now
  }
});

const groupMessages = mongoose.model("groupMessages", groupMessageSchema);
module.exports = groupMessages;