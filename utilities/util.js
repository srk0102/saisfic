const parse = require("nodemon/lib/cli/parse");

const removeDuplicates = (arr) => {
  Array.prototype.getDuplicates = function () {
    var duplicatesId = {};
    var duplicatesEmail = {};
    var dup = []
    for (var i = 0; i < this.length; i++) {
      if (duplicatesId.hasOwnProperty(this[i].id)) {
        duplicatesId[this[i].id].push(i);
      } else if (this.lastIndexOf(this[i].id) !== i) {
        duplicatesId[this[i].id] = [i];
      }
      if (duplicatesEmail.hasOwnProperty(this[i].email)) {
        duplicatesEmail[this[i].email].push(i);
      } else if (this.lastIndexOf(this[i].email) !== i) {
        duplicatesEmail[this[i].email] = [i];
      }
    }
    return [duplicatesId, duplicatesEmail];
  };
  let res = arr.getDuplicates();
  res = [...res]
  res = [...Object.values(res[0]), ...Object.values(res[1])]
  let dup = []
  let original = []
  for (let i of Object.values(res)) {
    if (i.length > 1) {
      for (let j of i) {
        dup.push(arr[j])
      }
    } else if (i.length === 1) {
      for (let k of i) {
        original.push(arr[k])
      }
    }
  }
  dup = [...new Set(dup)];
  original = [...new Set(original)];
  return [original, dup]
}

const removeErrors = (arr) => {
  let good = []
  let bad = []
  for (let i of arr) {
    if (i.hasOwnProperty('id' && 'email' && 'title' && 'firstName' && 'lastName')) {
      if (i.id !== '' && i.email !== '' && i.title !== '' && i.firstName !== '' && i.lastName !== '') {
        good.push(i)
      } else {
        bad.push(i)
      }
    } else {
      bad.push(i)
    }
  }
  return [good, bad]
}

const compareData = (data, DbData) => {
  const dups = DbData.filter((el) => {
    return data.every((f) => {
      return f.id === el.id || f.email === el.email;
    });
  });
  const original = data.filter((el) => {
    return DbData.every((f) => {
      return f.id !== el.id && f.email !== el.email;
    });
  });
  return [original, dups]
}

const dataBeautify = (data, DBData) => {
  const head = data.shift();
  const body = data
  let res = []
  for (let i = 0; i < body.length; i++) {
    let temp = {}
    for (let j = 0; j < body[i].length; j++) {
      let value = body[i][j]
      if (value == parseInt(value)) {
        value = parseInt(value)
      }
      temp[head[j]] = value
    }
    res.push(temp)
  }
  let raw = compareData(res, DBData)
  let cleanData = removeErrors(raw[0])
  let sol = removeDuplicates(cleanData[0])
  let returnArray = [...sol, cleanData[1], raw[1]]
  return returnArray;
}

module.exports = { dataBeautify }