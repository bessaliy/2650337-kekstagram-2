function checkStringLength(theString, stringLength) {
  return 'Длина строки соответствует - ' + (theString.length <= stringLength);
}
console.log(checkStringLength('Проверяемая строка', 20));

function checkPalindrome(primalString) {
  let newString = primalString.replaceAll(' ', '').toLowerCase();
  let finalString = '';
  let i = newString.length - 1;
  while (i >= 0) {
    finalString += newString[i];
    i--;
  }
  return 'Является ли строка палиндромом - ' + (finalString === newString);
}

console.log(checkPalindrome('топот'));
console.log(checkPalindrome('А роза упала на лапу Азора'));
console.log(checkPalindrome('Аня на полке клопа нашла'));

function findNumbers(primalString) {
  let newString = primalString.toString();
  newString = newString.replaceAll(' ', '');
  let i = 0;
  let finalNumbers = '';
  while (i < newString.length) {
    let isNumber = newString[i];
    isNumber = parseInt(isNumber);
    if (!isNaN(isNumber)) {
      finalNumbers += isNumber.toString() }
    i++;
  }
  return 'Полученное число = ' + parseInt(finalNumbers);
}

console.log(findNumbers('2023 год 15 число'));
console.log(findNumbers(25));
console.log(findNumbers('число один'));

function checkMeeting(workStart, workEnd, timeStart, meetingDuration) {

  let dayStart = workStart.split(':').map(Number);
  let dayStartMinutes = dayStart[0] * 60 + dayStart[1];
  let dayEnd = workEnd.split(':').map(Number);
  let dayEndMinutes = dayEnd[0] * 60 + dayEnd[1];
  let meetingStart = timeStart.split(':').map(Number);
  let meetingStartMinutes = meetingStart[0] * 60 + meetingStart[1];
  let meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return (meetingStartMinutes >= dayStartMinutes && meetingEndMinutes <= dayEndMinutes);
}

console.log(checkMeeting('08:00', '17:30', '14:00', 90));
console.log(checkMeeting('8:0', '10:0', '8:0', 120));
console.log(checkMeeting('08:00', '14:30', '14:00', 90));
console.log(checkMeeting('14:00', '17:30', '08:0', 90));
console.log(checkMeeting('8:00', '17:30', '08:00', 900));

