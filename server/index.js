const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const FriendModel = require("./models/Friends");
//db connection
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/tutorialmern", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/addfriend", async (req, res) => {
  try {
    const name = req.body.name;
    const age = req.body.age;

    const friend = new FriendModel({ name: name, age: age });
    await friend.save();
    
    res.send("Data inserted");
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).send("Error inserting data");
  }
});

app.get("/read", async (req, res) => {
  try {
    const friends = await FriendModel.find({});
    console.log("Success");
    res.send(friends);
  } catch (err) {
    console.error("Error retrieving data:", err);
    res.status(500).send("Error retrieving data");
  }
});

app.put('/update', async (req, res) => {
    const newAge = req.body.newAge;
    const id = req.body.id;
  
    try {
      const friendToUpdate = await FriendModel.findById(id);
      if (!friendToUpdate) {
        return res.status(404).send("Friend not found");
      }
  
      friendToUpdate.age = newAge;
      await friendToUpdate.save();
  
      res.send("Updated");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error occurred during update");
    }
  });

app.delete('/delete/:id',async(req,res)=>{
    const id = req.params.id
    await FriendModel.findByIdAndDelete(id).exec()
    res.send("itemDeleted")
})

app.listen(3001, () => {
  console.log("server is running");
});
