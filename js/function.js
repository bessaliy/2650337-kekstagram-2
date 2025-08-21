
function checkStringLength(theString, stringLength) {
return 'Длина строки соответствует - ' + (theString.length <= stringLength);
}
console.log(checkStringLength('Проверяемая строка', 20));
console.log(checkStringLength('Очень длинная проверяемая строка, которая не пройдет проверку', 20));

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
