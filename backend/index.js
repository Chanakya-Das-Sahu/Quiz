const express = require('express');
const app = express();
const connectToMongo = require('./db');
const QuizUser = require('./user');
const cors = require('cors');   
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
connectToMongo();


app.post('/submitDetails', async (req, res) => {
    const { name, rollno, gmail, branch, mark, duration } = req.body;
 
    const user = await QuizUser.findOne({gmail});
    if(user){
         res.status(400).json({ error: "User already exists" });
        return;
    }

     console.log(req.body);
    try {
        const user = new QuizUser(req.body);
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to register" });
    }
});

app.get('/leaderboard', async (req, res) => {
    try {
        const users = await QuizUser.find().sort({ mark: -1, duration: -1 });
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});