const mongoose = require("mongoose");

mongoose
  .connect(
    `${process.env.DB_SERVICE}://${process.env.DB_HOST}/${process.env.DB_NAME}`,
    {
      useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Data base connected!"))
  .catch((err) => console.log(`Con't connect the data base: ${err}`));
