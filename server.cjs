const express = require('express')
const bodyParser = require('body-parser')
// Importing required functions from dbConnection.cjs
const {connectToDb, getDb} = require('./dbconnection.cjs')

const app = express()
app.use(bodyParser.json())

let db
connectToDb(function(error) {
    if(error) {
        console.log('Could not establish connection...')
        console.log(error)
    } else { // if no error in establishing connection
        app.listen(8000)
        db = getDb()
        console.log('Listening on port 8000...')
    }
})



/** 
 * Expense Tracker
 * Functionalities : adding entry, getting the summaries of previous entries, editing and deleting
 * Input fields : Category, Amount, Date
 * 
 * CRUD : Create, Read, Update and Delete
 * 
 * get-entries / get-data - GET
 * add-entry - POST
 * edit-entry - PATCH
 * delete-entry - DELETE
 */

app.post('/add-entry', function(request, response) {
    db.collection('ExpensesData').insertOne(request.body).then(function() {
        response.status(201).json({
            "status" : "Entry added successfully"
        })
    }).catch(function () {
        response.status(500).json({
            "status" : "Entry not added"
        })
    })
})

// app.get('/get-entries', function(request, response) {
//     // Declaring an empty array
//     const entries = []
//     db.collection('ExpensesData')
//     .find()
//     .forEach(entry => entries.push(entry))
//     .then(function() {
//         response.status(200).json(entries)
//     }).catch(function() {
//         response.status(404).json({
//             "status" : "Could not fetch documents"
//         })
//     })
// })