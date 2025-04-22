function compress(input) {
  if (!input || input.length === 0) return "";

  let compressed = "";
  let count = 1;
  let currentChar = input[0];

  for (let i = 1; i < input.length; i++) {
    if (input[i] === currentChar) {
      count++;
    } else {
      compressed += count + currentChar;
      currentChar = input[i];
      count = 1;
    }
  }


  compressed += count + currentChar;

  return compressed.length < input.length ? compressed : input;
}


function decompress(compressed) {
  if (!compressed || compressed.length === 0) return "";

  let decompressed = "";
  let count = "";

  for (let i = 0; i < compressed.length; i++) {
    if (isNaN(compressed[i])) {
      decompressed += compressed[i].repeat(parseInt(count));
      count = "";
    } else {
      count += compressed[i];
    }
  }

  return decompressed;
}

