const mongoose = require('mongoose')

const userMessageSchema = new mongoose.Schema({
    from_user:{
        type: String
    },
    to_user:{
        type: String
    },
    message:{
        type: String
    },
    date_sent:{
        type: Date
    }
})

userMessageSchema.pre('save', () => {
  let date_sent = Date.now()

  if (!this.date_sent) {
    this.date_sent = now
  }
});

const userMessages = mongoose.model("userMessages", userMessageSchema);
module.exports = userMessages;
