const express = require('express');
const router = express.Router();
const { Reservation } = require('../../models');

//get all reservations for display, they are available at /reservations
router.get('/', async (req, res) => {
  res.json(await Reservation.all());
});

router.post('/', async (req, res, next) => {
  let slotSplit = req.body.slot.split(':');
  //convert strings to values to avoid creating dates with strings
  let month = req.body.month;
  switch (month) {
    case 'January':
      month = 0;
      break;
    case 'February':
      month = 1;
      break;
    case 'March':
      month = 2;
      break;
    case 'April':
      month = 3;
      break;
    case 'May':
      month = 4;
      break;
    case 'June':
      month = 5;
      break;
    case 'July':
      month = 6;
      break;
    case 'August':
      month = 7;
      break;
    case 'September':
      month = 8;
      break;
    case 'October':
      month = 9;
      break;
    case 'November':
      month = 10;
      break;
    case 'December':
      month = 11;
      break;
  }
  //create new date (UTC works)
  //todo: add front end validations to avoid creating weird dates (month/28/29/30 or 31 possible dates... etc)
  let slot = new Date(
    Date.UTC(2020, month, +req.body.day, +slotSplit[0], +slotSplit[1])
  );
  //create previous half hour for conflict check (no more than 10 reservations at a time)
  let prevHalf, prevFull;
  if (+slotSplit[1] === 30) {
    prevHalf = 0;
    prevFull = +slotSplit[0];
  } else {
    prevHalf = 30;
    prevFull = +slotSplit[0] - 1;
  }
  //no more than ten tables available at any given time, reservations can be made every half hour
  prevHalfHour = new Date(
    Date.UTC(2020, month, +req.body.day, prevFull, prevHalf)
  );
  //newReservation() takes in name, slot and the previous half hour slot for conflict check
  //todo: return error message if no table available.
  await Reservation.newReservation(req.body.name, slot, prevHalfHour);
});
module.exports = router;
