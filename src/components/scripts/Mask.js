class Mask {

  // Apply globam pattern date mask to a string.
  static dateToGlobal(param) {
    var d = param.split("/")[0];
    var m = param.split("/")[1];
    var y = param.split("/")[2];

    return y + '-' + ("0" + m).slice(-2) + '-' + ("0" + d).slice(-2);
  }

  // Apply a lenght limit to a string.
  static limitMask(param, limit) {
    var value = String(param);

    if (value.length > limit) return value.substr(0, limit);

    return value;
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

    temp = this.removeNonNumeric(value);
    if (temp.length > 8) return value.substr(0, 10);
    value = temp;

    // normalize
    value = this.completeLeftWithChar(value, '_', 8);

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

    if (value === '') value = '0';

    value += ' un';

    return value;
  }

  static removeNonLetter(value) {
    var temp = String();
    for (var i = 0; i < value.length; ++i) {
      if ((value[i] >= 'a' && value[i] <= 'z') || (value[i] >= 'A' && value[i] <= 'Z') || value[i] === ' ')
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
    value = this.completeLeftWithChar(value, '0', n);
    return value;
  }

  static completeLeftWithChar(value, c, n) {
    var s = value.length;
    for (var i = 0; i < n - s; ++i) {
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