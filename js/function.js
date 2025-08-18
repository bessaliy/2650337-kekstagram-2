
function checkStringLength(theString, stringLength) {
  let isOk = false;
  if (theString.length <= stringLength) {
  isOk = true;
}
return 'Длина строки соответствует - ' + isOk;
}
console.log(checkStringLength('Проверяемая строка', 20));
console.log(checkStringLength('Очень длинная проверяемая строка, которая не пройдет проверку', 20));

function checkPalindrome(primalString) {
  let newString = primalString.replaceAll(' ', '');
  newString = newString.toLowerCase();
  let finalString = '';
  let isPalindrome = false;
  let i = newString.length - 1;
  while (i >= 0) {
    finalString += newString[i];
    i --;
  }
  console.log(finalString);
  if (finalString === newString) {
    isPalindrome = true;
  }
  return 'Является ли строка палиндромом - ' + isPalindrome;
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
      finalNumbers += isNumber.toString()
    }
    i ++;
  }
  console.log(finalNumbers);
  return 'Полученное число = ' + parseInt(finalNumbers);
}
console.log(findNumbers('2023 год 15 число'));
console.log(findNumbers(25));
console.log(findNumbers('число один'));
