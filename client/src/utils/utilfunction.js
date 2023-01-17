export function indexOfAll(array, searchItem) {
    var i = array.indexOf(searchItem),
        indexes = [];
    while (i !== -1) {
      indexes.push(i);
      i = array.indexOf(searchItem, ++i);
    }
    return indexes;
  }