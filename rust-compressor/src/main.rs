use clap::Parser;
use std::{env, fs};

#[derive(Parser)]
#[command(name = "compressor")]
#[command(about = "Compress or decompress files using RLE or Simplified LZ77", long_about = None)]
struct Cli {
    #[arg(value_enum)]
    action: Action,

    input: String,
    output: String,

    #[arg(short, long, value_enum)]
    algorithm: Algorithm,
}

#[derive(clap::ValueEnum, Clone, Copy)]
enum Algorithm {
    Rle,
    Lz,
}

#[derive(clap::Subcommand, clap::ValueEnum, Clone, Copy)]
enum Action {
    Compress,
    Decompress,
}

fn main() {
    let args = Cli::parse();

    let input_data = fs::read(&args.input).expect("Failed to read input file");

    let processed_data = match args.algorithm {
        Algorithm::Rle => match args.action {
            Action::Compress => rle::compress(&input_data),
            Action::Decompress => rle::decompress(&input_data),
        },
        Algorithm::Lz => match args.action {
            Action::Compress => lz::compress(&input_data),
            Action::Decompress => lz::decompress(&input_data),
        },
    };

    fs::write(&args.output, processed_data).expect("Failed to write output file");
}

mod rle {
    pub fn compress(data: &[u8]) -> Vec<u8> {
        let mut compressed = Vec::new();
        let mut count = 1;

        for i in 1..data.len() {
            if data[i] == data[i - 1] {
                count += 1;
            } else {
                compressed.push(data[i - 1]);
                compressed.push(count);
                count = 1;
            }
        }
        compressed.push(data[data.len() - 1]);
        compressed.push(count);

        compressed
    }

    pub fn decompress(data: &[u8]) -> Vec<u8> {
        let mut decompressed = Vec::new();
        let mut i = 0;

        while i < data.len() {
            let byte = data[i];
            let count = data[i + 1] as usize;
            decompressed.extend(vec![byte; count]);
            i += 2;
        }

        decompressed
    }
}

mod lz {
    pub fn compress(data: &[u8]) -> Vec<u8> {
        // Implement Simplified LZ77 compression here
        vec![]
    }

    pub fn decompress(data: &[u8]) -> Vec<u8> {
        // Implement Simplified LZ77 decompression here
        vec![]
    }
}

mod rlef;
mod lzf;