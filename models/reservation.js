'use strict';
module.exports = (sequelize, DataTypes) => {
  const SequelizeReservation = sequelize.define('Reservation', {
    name: DataTypes.STRING,
    slot: DataTypes.DATE,
  });

  class Reservation extends SequelizeReservation {
    static async all() {
      return await this.findAll();
    }

    static async checkConflicts(slot, prevHalfHour) {
      const tablesTaken = await this.findAll({
        where: { slot: slot },
      });
      const previousHalfHour = await this.findAll({
        where: { slot: prevHalfHour },
      });
      let tablesTakenTotal = tablesTaken.length + previousHalfHour.length;

      if (tablesTakenTotal < 10) return false;
      else return true;
    }

    static async newReservation(name, slot, prev) {
      const conflictCheck = await this.checkConflicts(slot, prev);
      if (conflictCheck === true) {
        console.log('No tables available at this time');
        return;
      }
      if (conflictCheck === false) {
        await this.create({
          name: name,
          slot: slot,
        });
        console.log('Reservation succesfully created');
      }
    }
  }

  return Reservation;
};
