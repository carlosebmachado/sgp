class Mask {

  // Apply global date pattern mask to a pt-br date (string).
  static dateToGlobal(param) {
    var d = param.split("/")[0];
    var m = param.split("/")[1];
    var y = param.split("/")[2];

    return y + '-' + ("0" + m).slice(-2) + '-' + ("0" + d).slice(-2);
  }

  // Apply a lenght limit to a string.
  static limitMask(param, limit) {
    var value = String(param);
    return value.substr(0, limit);
  }

  // Apply currency mask to a string.
  static currencyMask(param) {
    var value = String(param);

    value = this.removeNonNumeric(value);
    value = this.removeLeftZeros(value);
    value = this.completeLeftWithZeros(value, 3);

    // adds the comma and money character
    value = value.substr(0, value.length - 2) + ',' + value.substr(value.length - 2, 2);
    value = 'R$ ' + value;

    return value;
  }

  // Apply date mask to a string.
  static dateMask(param) {
    var value = String(param);
    var temp = String();
    var del = value.length < 10;

    temp = this.removeNonNumeric(value);
    // if there are more than eigth numbers, it reach at limit
    if (temp.length > 8) return value.substr(0, 10);
    value = temp;

    if (del) {
      value = value.substring(0, value.length - 1);
    }

    // normalize
    value = this.completeWithChar(value, '_', 8, true);

    // add slashes
    value = value.substr(0, 2) + '/' + value.substr(2, 2) + '/' + value.substr(4, 4);

    return value;
  }

  // Apply liter mask to a string.
  static literMask(param) {
    var value = String(param);
    var del = value[value.length - 2] !== 't' && value[value.length - 1] === 'l';

    value = this.removeNonNumeric(value);
    value = this.removeLeftZeros(value);

    if (del) {
      value = value.substring(0, value.length - 1);
    }

    value = this.completeLeftWithZeros(value, 4);

    // adds the comma and liter character
    value = value.substr(0, value.length - 3) + ',' + value.substr(value.length - 3, 3);
    value += ' lt';

    return value;
  }

  // Apply kilo mask to a string.
  static kiloMask(param) {
    var value = String(param);
    var del = value[value.length - 2] !== 'g' && value[value.length - 1] === 'k';

    value = this.removeNonNumeric(value);
    value = this.removeLeftZeros(value);

    if (del) {
      value = value.substring(0, value.length - 1);
    }

    value = this.completeLeftWithZeros(value, 4);

    // adds the comma and kilo character
    value = value.substr(0, value.length - 3) + ',' + value.substr(value.length - 3, 3);
    value += ' kg';

    return value;
  }

  // Apply unity mask to a string.
  static unityMask(param) {
    var value = String(param);
    var del = value[value.length - 2] !== 'n' && value[value.length - 1] === 'u';

    value = this.removeNonNumeric(value);
    value = this.removeLeftZeros(value);

    if (del) {
      value = value.substring(0, value.length - 1);
    }

    // put zero if nothing
    if (value === '') value = '0';

    // adds unit character
    value += ' un';

    return value;
  }

  static removeNonLetter(value) {
    var temp = String();
    var validChars = String('áàâãéèêíìóòôúùçÁÀÂÃÉÈÊÉÈÓÒÔÚÙÇ');
    for (var i = 0; i < value.length; ++i) {
      if ((value[i] >= 'a' && value[i] <= 'z') || (value[i] >= 'A' && value[i] <= 'Z') || value[i] === ' ' || validChars.includes(value[i]))
        temp += value[i];
    }
    return temp;
  }

  static removeNonNumeric(value) {
    var temp = String();
    for (var i = 0; i < value.length; ++i) {
      if (value[i] >= '0' && value[i] <= '9')
        temp += value[i];
    }
    return temp;
  }

  static completeLeftWithZeros(value, n) {
    value = this.completeWithChar(value, '0', n);
    return value;
  }

  static completeWithChar(value, c, n, right = false) {
    var s = value.length;
    for (var i = 0; i < n - s; ++i) {
      if (right)
        value = value + c;
      else
        value = c + value;
    }
    return value;
  }

  static removeLeftZeros(value) {
    while (value.startsWith('0')) {
      value = value.substring(1, value.length);
    }
    return value;
  }

}

export default Mask;
