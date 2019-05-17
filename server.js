const express = require ('express');
const app = express();

//to connecting to the database
const connectDB = require ('./config/db')
connectDB();

//middleware so express can read the body
app.use(express.json({ extend: false }));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('API IS RUNNING!'))

app.use ('/api/users', require('./routes/api/users'))

app.use ('/api/profile', require('./routes/api/profile'))

app.use ('/api/auth', require('./routes/api/auth'))

  app.listen(PORT, () => 
    console.log(`Server now listening on PORT ${PORT}!`)
  )

