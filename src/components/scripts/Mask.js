class Mask {

  // Trasnforma uma string de data pt-br para internacional.
  static dateToGlobal(param) {
    var sDate = param.split("/");
    var d = sDate[0];
    var m = sDate[1];
    var y = sDate[2];

    return y + '-' + ("0" + m).slice(-2) + '-' + ("0" + d).slice(-2);
  }

  // Aplica um limite de caracteres em uma string.
  static limitMask(param, limit) {
    var value = String(param);
    return value.substr(0, limit);
  }

  // Aplica uma máscara monetária para uma string.
  static currencyMask(param) {
    var value = String(param);

    value = this.removeNonNumeric(value);
    value = this.removeLeftZeros(value);
    value = this.completeLeftWithZeros(value, 3);

    // adiciona a vírgula e o símbolo de real
    value = value.substr(0, value.length - 2) + ',' + value.substr(value.length - 2, 2);
    value = 'R$ ' + value;

    return value;
  }

  // Aplica uma máscara de data para uma string.
  static dateMask(param) {
    var value = String(param);
    var temp = String();
    var del = value.length < 10;

    temp = this.removeNonNumeric(value);
    // se tem mais de 8 caracteres, então chegou ao limite
    if (temp.length > 8) return value.substr(0, 10);
    value = temp;

    if (del) {
      value = value.substring(0, value.length - 1);
    }

    // normaliza
    value = this.completeWithChar(value, '_', 8, true);

    // adiciona as barras
    value = value.substr(0, 2) + '/' + value.substr(2, 2) + '/' + value.substr(4, 4);

    return value;
  }

  // Aplica uma máscara de medida de litro para uma string.
  static literMask(param) {
    var value = String(param);
    var del = value[value.length - 2] !== 't' && value[value.length - 1] === 'l';

    value = this.removeNonNumeric(value);
    value = this.removeLeftZeros(value);

    if (del) {
      value = value.substring(0, value.length - 1);
    }

    value = this.completeLeftWithZeros(value, 4);

    // adiciona a vírgula e o símbolo de litro
    value = value.substr(0, value.length - 3) + ',' + value.substr(value.length - 3, 3);
    value += ' lt';

    return value;
  }

  // Aplica uma máscara de medida de peso para uma string.
  static kiloMask(param) {
    var value = String(param);
    var del = value[value.length - 2] !== 'g' && value[value.length - 1] === 'k';

    value = this.removeNonNumeric(value);
    value = this.removeLeftZeros(value);

    if (del) {
      value = value.substring(0, value.length - 1);
    }

    value = this.completeLeftWithZeros(value, 4);

    // adiciona a vírgula e o símbolo de quilo
    value = value.substr(0, value.length - 3) + ',' + value.substr(value.length - 3, 3);
    value += ' kg';

    return value;
  }

  // Aplica uma máscara de unidade para uma string.
  static unityMask(param) {
    var value = String(param);
    var del = value[value.length - 2] !== 'n' && value[value.length - 1] === 'u';

    value = this.removeNonNumeric(value);
    value = this.removeLeftZeros(value);

    if (del) {
      value = value.substring(0, value.length - 1);
    }

    // se não tiver valor, um zero é adicionado
    if (value === '') value = '0';

    // adiciona o símbolo de unidade
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
