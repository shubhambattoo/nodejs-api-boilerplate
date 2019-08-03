const mongoose = require("mongoose");

const mongodbURI = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}` ;

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

mongoose
  .connect(mongodbURI, {
    useNewUrlParser: true
  })
  .then(() => console.log(`connected to ${process.env.DB_NAME} ...`))
  .catch(err => console.log("error in connection", err));

module.exports = {
  mongoose
};
