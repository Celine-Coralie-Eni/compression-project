const fs = require("fs");
const process = require("process");

const [, , action, inputFile, outputFile, algorithm] = process.argv;

if (
  !["compress", "decompress"].includes(action) ||
  !["--rle", "--lz"].includes(algorithm)
) {
  console.error(
    "Usage: compress|decompress <input_file> <output_file> --rle|--lz"
  );
  process.exit(1);
}

const inputData = fs.readFileSync(inputFile);

let processedData;
if (algorithm === "--rle") {
  processedData =
    action === "compress" ? rleCompress(inputData) : rleDecompress(inputData);
} else if (algorithm === "--lz") {
  processedData =
    action === "compress" ? lzCompress(inputData) : lzDecompress(inputData);
}

fs.writeFileSync(outputFile, Buffer.from(processedData));

function rleCompress(data) {
  const compressed = [];
  let count = 1;

  for (let i = 1; i <= data.length; i++) {
    if (data[i] === data[i - 1]) {
      count++;
    } else {
      compressed.push(data[i - 1]);
      compressed.push(count);
      count = 1;
    }
  }

  return compressed;
}

function rleDecompress(data) {
  const decompressed = [];
  for (let i = 0; i < data.length; i += 2) {
    const byte = data[i];
    const count = data[i + 1];
    for (let j = 0; j < count; j++) {
      decompressed.push(byte);
    }
  }

  return decompressed;
}

function lzCompress(data) {
  // Implement Simplified LZ77 compression here
  return [];
}

function lzDecompress(data) {
  // Implement Simplified LZ77 decompression here
  return [];
}
