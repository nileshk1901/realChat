const express = require("express");
const { chats } = require("./data");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.get('/', (req, res) => {
    res.send("API is running");
});

app.get('/api/chat', (req, res) => {
    console.log('Chats:', chats); // Log chats to check its contents
    res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
    // Check if chats is defined and an array
    if (!chats || !Array.isArray(chats)) {
        return res.status(500).send("Chats data is not available or not in the correct format");
    }
    
    const singleChat = chats.find((c) => c._id === req.params.id);
    
    // Handle the case where chat is not found
    if (!singleChat) {
        return res.status(404).send("Chat not found");
    }

    res.send(singleChat);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
