require("dotenv").config();
const express = require('express');
// const morgan = require('morgan');
const db = require("./db");
const cors = require("cors");
const app = express();

// define middleware at the top so the url dont go to the route handler first
// app.use((req, res, next) => {
//     console.log("middleware");
//     next()
// })
// app.use(morgan("dev"));
app.use(cors());
app.use(express.json());    // take the info in the body and attach it to the req object

// https://localhost:3001/getRestaurants
// Get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {

    try {
        const results = await db.query("select * from restaurants");
        // console.log(results);

        // response normally sends in json format
        res.json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows
            },
        })
    } catch (err) {
        console.log(err);
    }
    // res.send("these are the restaurants");
    // console.log("get all restaurants");
})


// Get a Restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    // console.log(req.params.id);

    try {
        const results = await db.query(
            "select * from restaurants where id = $1", [req.params.id]
        );
        // console.log(results);

        res.json({
            status: "success",
            data: {
                restaurants: results.rows[0]
            }
        })

    } catch (err) {
        console.log(err);
    }

    // res.status(200).json({
    //     status: "success",
    //     data: {
    //         restaurant: "mcdonalds"
    //     }
    // })
})


// Create a Restaurant
app.post("/api/v1/restaurants", async (req, res) => {
    // console.log(req.body);

    try {
        const results = await db.query(
            "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *", 
            [req.body.name, req.body.location, req.body.price_range]
        )
        // console.log(results);
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        })
    } catch (err) {
        console.log(err);
    }
})


// Update Restaurants
app.put("/api/v1/restaurants/:id", async (req, res) => {
    // console.log(req.params.id);
    // console.log(req.body);

    try {
        const results = await db.query(
            "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
            [req.body.name, req.body.location, req.body.price_range, req.params.id]
        );
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0]
            }
        })
    } catch (err) {
        console.log(err);
    }
})


// Delete Restaurants
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {

        const results = await db.query(
            "DELETE FROM restaurants WHERE id = $1", 
            [req.params.id]
        );
        res.status(204).json({
            status: "success"
        })

    } catch (err) {
        console.log(err);
    }
})

const port = process.env.PORT || 3001;  // default 3001 if no number given

// () => {} callback func: what to do once starts the server
app.listen(port, () => {
    console.log(`Server is up and listening on port ${port}`);
});