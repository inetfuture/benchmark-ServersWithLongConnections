package main

import (
	"bufio"
	"net"
	"os"
)

const (
	RECV_BUF_LEN = 1024
)

func main() {
	listener, err := net.Listen("tcp", "0.0.0.0:6666")
	if err != nil {
		println("Listen error:", err.Error())
		os.Exit(1)
	}

	println("Go server is listening on port:", 6666)

	for {
		conn, err := listener.Accept()
		if err != nil {
			println("Accept error :", err.Error())
			return
		}
		go handler(conn)
	}
}

func handler(conn net.Conn) {
	b := bufio.NewReader(conn)
	for {
		line, err := b.ReadBytes('\n')
		if err != nil { // EOF, or worse
			break
		}
		conn.Write(line)
	}
}
