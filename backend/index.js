const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const ResponseHandler = require('./middleware/reshandler');
const ResquestHandler = require('./middleware/reqhandler');
const ErrorHandler = require('./middleware/errorhandler');

const User=require('./routes/login')
const Ticket=require('./routes/ticket')
const Employee=require('./routes/employee')
const Update=require('./routes/updatet')
const Bot=require('./routes/bot')
const bodyParser = require('body-parser');
const app = express();  
dotenv.config();
const PORT = process.env.PORT || 5000;  

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(ResponseHandler);
app.use(ResquestHandler);

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/user', User);
app.use('/ticket', Ticket);
app.use('/employee', Employee);
app.use('/update', Update);
app.use('/bot', Bot);


app.use(ErrorHandler)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
      console.log("MongoDB connected");
    }).catch((err) => {
      console.log(err);
    });
  });