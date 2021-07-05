class Mask {

  // Trasnforma uma string de data pt-br para internacional.
  static dateToGlobal(param) {
    if (param === '') return param;
    var sDate = param.split('/');
    var d = sDate[0];
    var m = sDate[1];
    var y = sDate[2];
    return y + '-' + m + '-' + d;
  }

  // Trasnforma uma string de data pt-br para internacional.
  static dateToPtBr(param) {
    if (param === '') return param;
    var sDate = param.split('-');
    var y = sDate[0];
    var m = sDate[1];
    var d = sDate[2];
    return d + '/' + m + '/' + y;
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

  // Remove a máscara de litro.
  static removeLiterMask(param) {
    var value = String(param);
    value = this.removeNonNumeric(value);
    value = this.removeLeftZeros(value);
    value = this.completeLeftWithZeros(value, 4);
    value = value.substr(0, value.length - 3) + '.' + value.substr(value.length - 3, 3);
    return value;
  }

  // Remove a máscara de quilograma.
  static removeKiloMask(param) {
    return this.removeLiterMask(param);
  }

  // Remove a máscara de unidade.
  static removeUnityMask(param) {
    var value = String(param);
    value = this.removeNonNumeric(value);
    value = this.removeLeftZeros(value);
    return value;
  }

  // Remove a máscara monetária.
  static removeCurrencyMask(param) {
    var value = String(param);
    value = this.removeNonNumeric(value);
    value = this.removeLeftZeros(value);
    value = this.completeLeftWithZeros(value, 3);
    value = value.substr(0, value.length - 2) + '.' + value.substr(value.length - 2, 2);
    return value;
  }

  // Remove a máscara monetária.
  static removeCurrencyMask(param) {
    var value = String(param);
    value = this.removeNonNumeric(value);
    value = this.removeLeftZeros(value);
    value = this.completeLeftWithZeros(value, 3);
    value = value.substr(0, value.length - 2) + '.' + value.substr(value.length - 2, 2);
    return value;
  }

  // Normaliza valor float para 3 casas decimais.
  static normalizeMeas(param) {
    var value = String(param);
    value = value.replace('.', ',');
    // se não há vírgula, completa a máscara
    if (!value.includes(',')) {
      return value += ',000';
    } else if (value.split(',')[1].length === 2) {
      // se já existem 2 caracteres após a vírgula, adiciona apenas 1 zero
      value += '0';
    } else if (value.split(',')[1].length === 1) {
      // se existe apenas 1 caractere após a vírgula, adiciona 2 zeros
      value += '00';
    }
    return value;
  }

  // Normaliza valor float para litro.
  static normalizeLiter(param) {
    return this.normalizeMeas(param) + ' lt';
  }

  // Normaliza valor float para quilograma.
  static normalizeKilo(param) {
    return this.normalizeMeas(param) + ' kg';
  }

  // Normaliza valor float para monetário.
  static normalizeCurrency(param) {
    var value = String(param);
    // se não há vírgula, completa a máscara
    if (!value.includes('.')) {
      return value += ',00';
    }
    value = value.replace('.', ',');
    // se existe apenas 1 caractere após a vírgula, completa o zero
    if (value.split(',')[1].length === 1) {
      value += '0';
    }
    return value;
  }

  // Remove não letras de uma string.
  static removeNonLetter(value) {
    var temp = String();
    var validChars = String('áàâãéèêíìóòôúùçÁÀÂÃÉÈÊÉÈÓÒÔÚÙÇ');
    for (var i = 0; i < value.length; ++i) {
      if ((value[i] >= 'a' && value[i] <= 'z') || (value[i] >= 'A' && value[i] <= 'Z') || value[i] === ' ' || validChars.includes(value[i]))
        temp += value[i];
    }
    return temp;
  }

  // Remove não numéricos de uma string.
  static removeNonNumeric(value) {
    var temp = String();
    for (var i = 0; i < value.length; ++i) {
      if (value[i] >= '0' && value[i] <= '9')
        temp += value[i];
    }
    return temp;
  }

  // Completa uma string com (n - tamanho) zeros.
  static completeLeftWithZeros(value, n) {
    value = this.completeWithChar(value, '0', n);
    return value;
  }

  // Completa uma string com (n - tamanho) -> (caractere passado).
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

  // Remove zeros da esquerda.
  static removeLeftZeros(value) {
    while (value.startsWith('0')) {
      value = value.substring(1, value.length);
    }
    return value;
  }

}

export default Mask;
