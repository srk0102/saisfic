# Satisfic Backend Developer Task

This project is just for the assignment purpose and to know how the crm development works.

## NOTE

IF YOU ARE RUNNING THIS PROJECT FOR THE FIRST TIME PLEASE FOLLOW THESE STEPS.
-> DB INSTALLATION SETUP: [https://www.youtube.com/watch?v=VAC_gmQZ_ws](https://www.youtube.com/watch?v=VAC_gmQZ_ws)
-> DB CONNECTION: open DBURI.js file in root directory and fill your details
-> Add Table to DB: open db.txt and copy the whole command and use that to create a table.
-> Installing Node Modules: Open cmd to file path and press `npm install`

#### NOW YOU CAN RUN THIS PROJECT FINE

## Available Scripts

In this project directory, you can run:

### `npm run start`

Runs the whole backend application.
Open [http://localhost:5000](http://localhost:5000) to view it in your browser.

## DB connection

We used sqlite as a database.\
If you want to connect your DB.\
use DBURI file and change value according your details.

## Available API End Points.

### `GET /leads`
[http://localhost:5000/leads](http://localhost:500/leads)

This will return all data from leads table in database.

### `GET /leads/:id`
[http://localhost:5000/leads/1](http://localhost/leads/1)

This will return the data that id equal to id in parameter.

### `POST /leads/`
[http://localhost:5000/leads](http://localhost:500/leads)

You can push data into DB using this url.

### `POST /leads/bulk`
[http://localhost:5000/leads](http://localhost:500/leads)

You can push data into DB using csv file.

### `PATCH /leads/:id`
[http://localhost:5000/leads](http://localhost:500/leads)

You can update data into DB using this url.
### `POST /leads/patch/bulk`
[http://localhost:5000/leads](http://localhost:500/leads)

You can update different row data in DB using this url with ids.

### `POST /leads/`
[http://localhost:5000/leads](http://localhost:500/leads)

You can delete data from DB using this url with id.