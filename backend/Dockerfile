FROM golang:1.21-alpine AS builder

RUN apk add --no-cache git ca-certificates

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /bianqing-server ./...

FROM alpine:3.19

RUN apk add --no-cache ca-certificates tzdata

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY --from=builder /bianqing-server /bianqing-server
COPY configs/ /app/configs/

WORKDIR /app

EXPOSE 8080
EXPOSE 6060

CMD ["/bianqing-server"]
