function checkPasswordStrength(password, minLength, minDigit, minSpecial) {
  // Sprawdź minimalną długość hasła
  if (password.length < minLength) {
    return false;
  }

  // Sprawdź obecność co najmniej jednej cyfry
  const digitRegex = /\d/;
  if (!digitRegex.test(password) || password.match(digitRegex).length < minDigit) {
    return false;
  }

  // Sprawdź obecność co najmniej jednego znaku specjalnego
  const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  if (!specialCharRegex.test(password) || password.match(specialCharRegex).length < minSpecial) {
    return false;
  }

  // Hasło spełnia wszystkie kryteria
  return true;
}

module.exports = { checkPasswordStrength };
