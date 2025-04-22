function compress(input) {
  if (!(input instanceof Buffer)) {
    input = Buffer.from(input);
  }

  const windowSize = 255; 
  const lookAheadSize = 255; 
  const compressed = [];
  let pos = 0;

  while (pos < input.length) {
    let bestLength = 0;
    let bestOffset = 0;
    const maxSearchLength = Math.min(lookAheadSize, input.length - pos);
    const searchStart = Math.max(0, pos - windowSize);

    for (let i = searchStart; i < pos; i++) {
      let length = 0;
      while (
        length < maxSearchLength &&
        input[i + length] === input[pos + length]
      ) {
        length++;
      }
      if (length > bestLength) {
        bestLength = length;
        bestOffset = pos - i;
      }
    }

    if (bestLength < 3) {
      compressed.push(0);
      compressed.push(0);
      compressed.push(input[pos]);
      pos++;
    } else {
      compressed.push(bestOffset);
      compressed.push(bestLength);
      compressed.push(input[pos + bestLength]);
      pos += bestLength + 1;
    }
  }

  return Buffer.from(compressed);
}

function decompress(input) {
  if (!(input instanceof Buffer)) {
    input = Buffer.from(input);
  }

  const decompressed = [];
  let pos = 0;

  while (pos < input.length) {
    const offset = input[pos];
    const length = input[pos + 1];
    const nextByte = input[pos + 2];

    if (offset === 0 && length === 0) {
      decompressed.push(nextByte);
    } else {
      const start = decompressed.length - offset;
      for (let i = 0; i < length; i++) {
        decompressed.push(decompressed[start + i]);
      }
      decompressed.push(nextByte);
    }
    pos += 3;
  }

  return Buffer.from(decompressed);
}

module.exports = {
  compress,
  decompress,
};
