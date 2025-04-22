FROM rust:1.75 AS builder

WORKDIR /app
COPY . .

RUN cargo build --release

FROM debian:bullseye-slim

COPY --from=builder /app/target/release/compressor /usr/local/bin/compressor

ENTRYPOINT ["/usr/local/bin/compressor"]

CMD ["--help"]
