const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const todosRouter = require('./routes/todos');


const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(bodyParser.json());


app.use('/api/todos', todosRouter);


app.get('/', (req, res) => {
res.send({ message: 'Backend is running' });
});


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));