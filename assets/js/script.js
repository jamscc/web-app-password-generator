var generateBtn = document.querySelector("#generate");

// key-value pairs for various character types
var characterTypes = {
  typeLowercase: "abcdefghijklmnopqrstuvwxyz",
  typeUppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  typeNumeric: "0123456789",
  typeSpecial: "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
  // Password Special Characters - source: the OWASP Foundation https://owasp.org/www-community/password-special-characters; excluded 'Space' character 
};

// to store inputs/confirmations from prompt and confirmation boxes
var lengthPwd = 0;
var lowercase;
var uppercase;
var numeric;
var special;

var totalPossible = [];

function writePassword() {
  // a prompt box for password length
  lengthPwd = Number(prompt("Choose the number of characters for the password: \n \nminimum of 8 characters and maximum of 128 characters; must be an integer"));

  // validates user's input for the first prompt; added alert
  if (isNaN(lengthPwd) || lengthPwd < 8 || lengthPwd > 128 || !(Number.isInteger(lengthPwd))) {
    alert("Please start over. The input for length needs to be an integer that is greater than or equal to 8 and less than or equal to 128");
    return;
  }

  // confirmation boxes seeking confirmation on whether to include the various character types
  lowercase = confirm("Include lowercase characters? \n \n (Press 'Ok' for yes; 'Cancel' for no)");
  uppercase = confirm("Include uppercase characters? \n \n (Press 'Ok' for yes; 'Cancel' for no)");
  numeric = confirm("Include numeric characters? \n \n (Press 'Ok' for yes; 'Cancel' for no)");
  special = confirm("Include special characters? \n \n (Press 'Ok' for yes; 'Cancel' for no)");

  // validates user's responses; alert message if no character type was chosen
  if (!(lowercase) && !(uppercase) && !(numeric) && !(special)) {
    alert("Please start over. No character type was chosen. Please choose at least 1 character type to generate a password.");
    return;
  }

  // arrays for the various character types; see conditional statements below
  const lowercaseArray = [];
  const uppercaseArray = [];
  const numericArray = [];
  const specialArray = [];

  // conditional statement on whether to add lowercase characters to the 'lowercase' array
  if (lowercase) {
    for (var i = 0; i < characterTypes.typeLowercase.length; i++) {
      lowercaseArray.push((characterTypes.typeLowercase.charAt(i)));
    };
  }

  // conditional statement on whether to add uppercase characters to the 'uppercase' array
  if (uppercase) {
    for (var i = 0; i < characterTypes.typeUppercase.length; i++) {
      uppercaseArray.push((characterTypes.typeUppercase.charAt(i)));
    };
  }

  // conditional statement on whether to add numeric characters to the 'numeric' array
  if (numeric) {
    for (var i = 0; i < characterTypes.typeNumeric.length; i++) {
      numericArray.push((characterTypes.typeNumeric.charAt(i)));
    };
  }

  // conditional statement on whether to add special characters to the 'special' array
  if (special) {
    for (var i = 0; i < characterTypes.typeSpecial.length; i++) {
      specialArray.push((characterTypes.typeSpecial.charAt(i)));
    };
  }

  // total possible characters (given conditional statements above) for password generation
  totalPossible = lowercaseArray.concat(uppercaseArray, numericArray, specialArray);

  // generate password
  var password = generatePassword();

  // the generated password is displayed
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// generate password function
function generatePassword() {

  // to continue generating a random password using the characters in the totalPossible array until the password matches the criteria based on what was received via the prompt and confirmation boxes
  do {
    var getPasswordArray = [];
    var getPassword = "";
    var passwordLength = lengthPwd;

    for (var i = 0; i < passwordLength; i++) {
      var numSelected = Math.floor(Math.random() * totalPossible.length);
      getPasswordArray.push(totalPossible[numSelected]);

      getPassword = getPasswordArray.join("");
    };
  }

  while (
    ((lowercase && getPassword.match(/[a-z]/) == null) || (uppercase && getPassword.match(/[A-Z]/) == null) || (numeric && getPassword.match(/[0-9]/) == null) || (special && ((passwordLength - (Array.from(getPassword.matchAll(/[a-z]/g)).length + Array.from(getPassword.matchAll(/[A-Z]/g)).length + Array.from(getPassword.matchAll(/[0-9]/g)).length)) <= 0)))
  );

  return getPassword;
}

// event listener
generateBtn.addEventListener("click", writePassword);