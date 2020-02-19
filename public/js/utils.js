// define your functions like this so they're testable

function sum(num1, num2) {
  return num1 + num2;
}

//converts month value into text for display
function monthText(slotMonth) {
  let month;
  switch (slotMonth) {
    default:
      alert('Invalid Month Input');
      return -1;
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
  return month;
}
