// jest won't error out on DOM calls.
//console.log(document.querySelector('p').innerHTML);
let previous = [];
const getReservations = () => {
  fetch('http://localhost:3000/reservations')
    .then(response => response.json())
    .then(data => {
      let upcoming = [];

      data.map(el => {
        if (!previous.includes(el.id)) {
          slotSplit = el.slot.split('T');
          slotMonth = slotSplit[0].slice(5, 7);
          slotDay = slotSplit[0].slice(8, 10);
          switch (slotMonth) {
            case '01':
              month = 'January';
              break;
            case '02':
              month = 'February';
              break;
            case '03':
              month = 'March';
              break;
            case '04':
              month = 'April';
              break;
            case '05':
              month = 'May';
              break;
            case '06':
              month = 'June';
              break;
            case '07':
              month = 'July';
              break;
            case '08':
              month = 'August';
              break;
            case '09':
              month = 'September';
              break;
            case '10':
              month = 'October';
              break;
            case '11':
              month = 'November';
              break;
            case '12':
              month = 'December';
              break;
          }

          upcoming.push(
            document.createTextNode(
              `${el.name} on ${month} ${slotDay} at ${slotSplit[1].slice(0, 5)}`
            )
          );
          previous.push(el.id);
          previous.push(el.name);

          console.log(previous);
        }
      });
      upcoming.map(node => {
        let listItem = document.createElement('LI');
        listItem.appendChild(node);
        document.getElementById('upcoming').appendChild(listItem);
      });
    });
};
window.addEventListener('load', () => {
  getReservations();
});

const form = $('#reservation');
form.on('submit', submitHandler);

function submitHandler(e) {
  e.preventDefault();

  $.ajax({
    url: '/reservations',
    type: 'POST',
    data: form.serialize()
  }).done(response => {
    console.log(response);
  });
  getReservations();
}
