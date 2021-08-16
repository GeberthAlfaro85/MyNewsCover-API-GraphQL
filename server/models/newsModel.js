const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const news = new Schema ({
    title: {type: String},
    short_description: {type: String},
    permanlink: {type: String},
    date: {type: String},
    news_source_id : {type: String},
    user_id: {type: String},
    category_id: {type: String}
});

module.exports = mongoose.model("news", news);
