//DOM 
const characterAmountRange = document.getElementById('characterAmountRange');
const characterAmountNumber = document.getElementById('characterAmountNumber');
const includeUppercaseElement = document.getElementById('includeUppercase');
const includeLowercaseElement = document.getElementById('includeLowercase');
const includeNumbersElement = document.getElementById('includeNumbers');
const includeSymbolsElement = document.getElementById('includeSymbols');
const form = document.getElementById('passwordGeneratorForm');
const passwordDisplay = document.getElementById('passwordDisplay');

//password checker
const checker = document.querySelector('.strength-bar');
const strengthText = document.getElementById('strength-text');

//Getting char codes from ascii
const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65,90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97,122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48,57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
    arrayFromLowToHigh(58, 64)
  ).concat(
    arrayFromLowToHigh(91, 96)
  ).concat(
    arrayFromLowToHigh(123, 126)
  )

characterAmountNumber.addEventListener('input' , syncCharacterAmount);
characterAmountRange.addEventListener('input' , syncCharacterAmount);


//FORM SUBMIT
form.addEventListener('submit' , e => {
    e.preventDefault()
    const characterAmount = characterAmountNumber.value ;
    const includeUppercase = includeUppercaseElement.checked ;
    const includeLowercase = includeLowercaseElement.checked ;
    const includeNumbers = includeNumbersElement.checked ;
    const includeSymbols = includeSymbolsElement.checked ;

    if(includeLowercase || includeUppercase || includeNumbers || includeSymbols){
         const password = generatePassword(characterAmount , includeLowercase , includeUppercase , includeNumbers , includeSymbols);
         passwordDisplay.innerText = password;
        }
     else{
        passwordDisplay.innerText = "Please select an option !";
        passwordDisplay.classList.add('warning');
     }


})


//GENERATE PASSWORD
function generatePassword(characterAmount , includeLowercase , includeUppercase , includeNumbers , includeSymbols){
    let charCodes = [];
    if(includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
    if(includeLowercase) charCodes = charCodes.concat(LOWERCASE_CHAR_CODES);
    if(includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
    if(includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);

    const passwordCharacters = [];
    for(let i = 0; i < characterAmount ; i++){
        const characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
        passwordCharacters.push(String.fromCharCode(characterCode))
    }

   checkPassword(passwordCharacters);

    return passwordCharacters.join('');
}

//RANGE FOR CHAR CODES
function arrayFromLowToHigh(low,high){
    const array = [];
    for(let i = low ; i <= high; i++){
        array.push(i);
    }
    return array;
}

//SYNC FUNCTION 
function syncCharacterAmount(e){
    const value = e.target.value;
    characterAmountNumber.value = value;
    characterAmountRange.value = value;
}


function checkPassword(passwordCharacters){
      if(passwordCharacters.length <= 5 ){
        checker.classList.add('tooweak');
        strengthText.textContent = "Too weak"
        checker.classList.remove('weak');  
        checker.classList.remove('medium');  
        checker.classList.remove('strong');  
      } else if(passwordCharacters.length > 5 && passwordCharacters.length <=10 ){
        checker.classList.add('weak');
        strengthText.textContent = "weak"
        checker.classList.remove('tooweak');  
        checker.classList.remove('medium');  
        checker.classList.remove('strong');  
      } else if(  passwordCharacters.length > 10 && passwordCharacters.length <=15 && includeLowercase && includeNumbers && includeSymbols && includeUppercase) {
        checker.classList.add('medium');
        strengthText.textContent = "medium"     
        checker.classList.remove('weak');  
        checker.classList.remove('tooweak');  
        checker.classList.remove('strong');          
      } else if( passwordCharacters.length > 15 && passwordCharacters.length <=20 && includeLowercase && includeNumbers && includeSymbols && includeUppercase){
        checker.classList.add('strong');
        strengthText.textContent = "strong"
        checker.classList.remove('weak');  
        checker.classList.remove('medium');  
        checker.classList.remove('tooweak');  
      }

}