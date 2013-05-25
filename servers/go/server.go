package main

import (
  "net"
  "os"
  "time"
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
  for  {
    towrite := []byte("Welcome to the Server!!")
    _, err := conn.Write(towrite[:])
    if err != nil {
        println("Write error: ",err.Error())
    }

    time.Sleep(3 * time.Second)
  }
}