class Mask {

  // Apply currency mask to a string.
  static currencyMask(value) {
    var value = String(value);
    var temp = String();

    // initial characters remove
    value = value.replace('R', '');
    value = value.replace('$', '');
    value = value.replace(' ', '');
    value = value.replace(',', '');
    value = value.replace('.', '');

    // removes left zeros
    while (value.startsWith('0') && value.length > 3) {
      value = value.substring(1, value.length);
    }

    // removes non numerics
    for (var i = 0; i < value.length; ++i) {
      if (value[i] >= '0' && value[i] <= '9')
        temp += value[i];
    }
    value = temp;

    // complete with zeros
    if (value.length < 1) {
      value = '000';
    } else if (value.length < 2) {
      value = '00' + value;
    } else if (value.length < 3) {
      value = '0' + value;
    }

    // adds the comma and money character
    value = value.substr(0, value.length - 2) + ',' + value.substr(value.length - 2, 2);
    value = 'R$ ' + value;

    return value;
  }

  // Apply date mask to a string.
  static dateMask(value) {
    var value = String(value);
    var temp = String();

    // initial characters remove
    value = value.replace('R', '');
    value = value.replace('$', '');
    value = value.replace(' ', '');
    value = value.replace(',', '');
    value = value.replace('.', '');

    // removes left zeros
    while (value.startsWith('0') && value.length > 3) {
      value = value.substring(1, value.length);
    }

    // removes non numerics
    for (var i = 0; i < value.length; ++i) {
      if (value[i] >= '0' && value[i] <= '9')
        temp += value[i];
    }
    value = temp;

    // complete with zeros
    if (value.length < 1) {
      value = '000';
    } else if (value.length < 2) {
      value = '00' + value;
    } else if (value.length < 3) {
      value = '0' + value;
    }

    // adds the comma and money character
    value = value.substr(0, value.length - 2) + ',' + value.substr(value.length - 2, 2);
    value = 'R$ ' + value;

    return value;
  }

}

export default Mask;
