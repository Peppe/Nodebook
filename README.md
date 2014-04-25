Nodebook
========

A REST backend for an address book implemented in node.js. It serves the front end from a static folder, which is just HTML+CSS+JS. Frontend uses JQuery and Twitter Bootstrap.

Routes
GET / (root): The frontend for using the app.
GET /persons: REST call to retreive all persons.
POST /add: REST call to add one person
POST /update: REST call to update one person
DELETE /delete/:id: REST call to delete one person based on the id

Setup.

1. Take a checkout out of this.
2. Download and install Node.js from http://nodejs.org/
3. Download and extract MongoDB from https://www.mongodb.org/
4. Create a empty folder named data within the checkout folder.
4. Start up the database by going into the extracted MongoDB folder and running ./mongod --dbpath <path to your checkout>/data
5. Download app dependencies by going to the checkout folder and run npm install
6. Run the app with node app.js
7. Point your browser towards http://localhost:3000/
