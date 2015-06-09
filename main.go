package main

import (
    "fmt"
    "io/ioutil"
    "net/http"
    "bytes"
    "strings"
    "encoding/json"
)

type User struct {
    Username string
    Password string
}

/*
Handler to create a new user. Check if the user already exists
in Sync Gateway.
 */
func signupHandler(w http.ResponseWriter, r *http.Request) {
    // parse json as User object
    body, _ := ioutil.ReadAll(r.Body)

    // check if the user exists
    var stringUrl string = "http://127.0.0.1:4985/todos/_user/"
    res, err := http.Post(stringUrl, "application/json", bytes.NewBuffer(body))
    defer r.Body.Close()

    if err != nil {
        fmt.Print(err)
        http.Error(w, "user already exists", http.StatusConflict)
        return
    }

    if res != nil {
        body, _ = ioutil.ReadAll(res.Body)
        w.Header().Set("Content-Type", "application/json")
        w.Write(body)
        return
    }
}

type Change struct {
    Id string
    Doc map[string]string
}

func main() {
    http.HandleFunc("/signup", signupHandler)

    fs := http.FileServer(http.Dir("build"))
    http.Handle("/", fs)

    http.ListenAndServe(":8080", nil)
}