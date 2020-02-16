'use strict';
module.exports = (sequelize, DataTypes) => {
  const SequelizeReservation = sequelize.define('Reservation', {
    name: DataTypes.STRING,
    slot: DataTypes.DATE
  });

  class Reservation extends SequelizeReservation {
    static async all() {
      return await this.findAll();
    }
    //conflict check works by adding the tables with the required slot with the previous half hour slot to avoid more than 10 tables at a time
    static async checkConflicts(slot, prevHalfHour) {
      const tablesTaken = await this.findAll({
        where: { slot: slot }
      });
      const previousHalfHour = await this.findAll({
        where: { slot: prevHalfHour }
      });

      let tablesTakenTotal = tablesTaken.length + previousHalfHour.length;
      //no conflict return false, reservation can be made.
      if (tablesTakenTotal < 10) return false;
      //conflict return true
      else return true;
    }

    static async newReservation(name, slot, prev) {
      const conflictCheck = await this.checkConflicts(slot, prev);
      if (conflictCheck === true) {
        //if there is a conflict console.log message.
        //todo: return message for front end display (Please try a different time)
        console.log('No reservations available at this time');
      }
      //if no conflict create reservation, display message
      //todo: return 'reservation succesfully created' for front end display
      if (conflictCheck === false) {
        await this.create({
          name: name,
          slot: slot
        });
        console.log('Reservation succesfully created');
      }
    }
  }

  return Reservation;
};
