require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Goods = require("./models/goods.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

//const MONGO_URL = "mongodb://127.0.0.1:27017/Store";
const dbUrl = process.env.ATLASDB_URL;

main()
 .then(() => {
    console.log("connected to DB");
 })
 .catch((err) => {
    console.log(err);
 });


async function main() {
    await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req,res) => {
    res.redirect("/goods")
});

//Index Route
app.get("/goods", async (req,res) => {
    const allGoods = await Goods.find({});
    res.render("goods/index.ejs", {allGoods});
});

//New Route

app.get("/goods/new", (req,res) => {
    res.render("goods/new.ejs");
})

//Show Route
app.get("/goods/:id", async (req,res) => {
    let {id} = req.params;
    const goods = await Goods.findById(id);
    res.render("goods/show.ejs", { goods});
});

//Create Route
app.post("/goods", async(req,res) => {
    const newGoods = new Goods(req.body.goods);
    await newGoods.save();
    res.redirect("/Goods");
});

//Edit Route
app.get("/goods/:id/edit", async (req,res) => {
    let {id} = req.params;
    const goods = await Goods.findById(id);
    res.render("goods/edit.ejs", { goods});
});

//Update Route
app.put("/goods/:id", async(req,res) => {
    let {id} = req.params;
    await Goods.findByIdAndUpdate(id, { ...req.body.goods});
   res.redirect(`/goods`);
});

//Delete Route
app.delete("/Goods/:id", async (req,res) => {
    let {id} = req.params;
    let deletedGoods = await Goods.findByIdAndDelete(id);
    console.log(deletedGoods);
    res.redirect("/goods");
})


/*app.get("/testGoods", async (req,res) => {
      let sampleGoods = new Goods({
      name: "Iphone 17",
      category: "Moblie",
      brand: "Iphone",
      price: 20000,
      stock: 10,
      });
      await sampleGoods.save();
      console.log("Goods was saved");
      res.send("successful testing");
});*/

app.listen(9090, () => {
    console.log("server is listening to port 9090");
});

