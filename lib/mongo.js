const config = require('config-lite')(__dirname);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect(config.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: 'TeamProject',
});

//template blow

// const replySchema = new Schema({
//     Author: String,
//     Comment: String,
//     ReplyDate: Date,
// });
//
// const reply = mongoose.model('replys', replySchema);
//
// const studentSchema = new Schema({
//     UserName: String,
//     Password: String,
//     Name: String,
//     GroupID: {type: Schema.Types.ObjectId, ref: 'teams'},
//     PeopleLike: {type: Schema.Types.ObjectId, ref: 'students'},
//     PeopleDontLike: [{type: Schema.Types.ObjectId, ref: 'students'}],
//     StaffMark: [Number],
//     StaffFeedback: [String],
//     Mark: [Number],
//     MarkForTeam: Boolean,
// });
