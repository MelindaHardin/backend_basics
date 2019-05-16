const express = require ('express');

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('API IS RUNNING!'))

  app.listen(PORT, () => 
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
  )

