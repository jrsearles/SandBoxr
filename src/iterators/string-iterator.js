function* ascIterator (stringValue, start, length) {
  for (let key = start; key < length; key++) {
    let value = stringValue.getValue(key);
    yield { value, key };
  }
}

function* descIterator (stringValue, start) {
  for (let key = start; key >= 0; key--) {
    let value = stringValue.getValue(key);
    yield { value, key };
  }
}

const StringIterator = {
  create (value, start, desc) {
    let length = value.toNative().length;
    return (desc ? descIterator : ascIterator)(value, start, length);
  }
};

export default StringIterator;
