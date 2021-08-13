FROM golang:1.16-alpine

COPY src /app

WORKDIR /app

RUN go build main.go

ENTRYPOINT ./main
