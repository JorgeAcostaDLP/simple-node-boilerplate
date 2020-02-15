![Node.js CI](https://github.com/JorgeAcostaDLP/simple-node-boilerplate/workflows/Node.js%20CI/badge.svg?branch=master)

# Awesome Delicious

To run this application locally:
npm install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm start or npx nodemon

The reservation porta will check all reservations on a given day, month, and hour as well as the previous half hour. If there are 10 reservations already taken no further reservations will be made.
Dates should be valid for a new reservation to be made.
