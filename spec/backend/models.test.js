const { Reservation } = require('../../models');

test('Reservation.all() should return an array', async () => {
  const result = (await Reservation.all()) || [];
  expect(result.length).toEqual(10);
});

test('New Reservations can be created', async () => {
  await Reservation.newReservation(
    'Jorge',
    new Date(Date.UTC(2020, 1, 1, 18, 30)),
    new Date(Date.UTC(2020, 1, 1, 18, 0))
  );
  let result = await Reservation.all();
  expect(result.length).toEqual(11);
});

test('Check conflict returns true if less than 10 tables taken', async () => {
  let i = 0;
  while (i < 10) {
    await Reservation.newReservation(
      'Jorge',
      new Date(Date.UTC(2020, 1, 1, 18, 30)),
      new Date(Date.UTC(2020, 1, 1, 18, 0))
    );
    i++;
  }
  let conflictCheck = await Reservation.checkConflicts(
    new Date(Date.UTC(2020, 1, 1, 18, 30)),
    new Date(Date.UTC(2020, 1, 1, 18, 0))
  );

  expect(conflictCheck).toEqual(true);
});

test('No more than 10 tables at a given time', async () => {
  let i = 0;
  while (i < 10) {
    await Reservation.newReservation(
      'Testing',
      new Date(Date.UTC(2020, 1, 10, 18, 30)),
      new Date(Date.UTC(2020, 1, 10, 18, 0))
    );
    i++;
  }
  const test = await Reservation.newReservation(
    'test',
    new Date(Date.UTC(2020, 1, 10, 18, 30)),
    new Date(Date.UTC(2020, 1, 10, 18, 0))
  );
  expect(test).toEqual(undefined);
});
