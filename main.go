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

func loginHandler(w http.ResponseWriter, r *http.Request) {
    body, _ := ioutil.ReadAll(r.Body)

    var stringUrl string = "http://127.0.0.1:4984/todos/_session"
    res, err := http.Post(stringUrl, "application/json", bytes.NewBuffer(body))
    defer r.Body.Close()

    if err != nil {
        fmt.Print(err)
        http.Error(w, "invalid credentials", http.StatusUnauthorized)
        return
    }

    if res != nil {
        body, _ = ioutil.ReadAll(res.Body)
        w.Header().Set("Content-Type", "application/json")

        cookieString := res.Header.Get("Set-Cookie")
        cookieString = strings.Replace(cookieString, "/todos/", "/", -1)
        w.Header().Set("Set-Cookie", cookieString)
        w.Write(body)
        return
    }
}

type Change struct {
    Id string
    Doc map[string]string
}

func listsHandler(w http.ResponseWriter, r *http.Request) {
    // request all docs the user has access to
    var stringUrl string = "http://127.0.0.1:4984/todos/_changes?include_docs=true"
    client := &http.Client{}
    req, _ := http.NewRequest("GET", stringUrl, nil)
    req.Header.Set("Cookie", r.Header.Get("Cookie"))
    res, err := client.Do(req)

    if err != nil {
        fmt.Print(err)
        return
    }

    if res != nil {
        body, _ := ioutil.ReadAll(res.Body)

        data := map[string]interface{}{}
        json.Unmarshal(body, &data)

        results := data["results"]
        resultsMap := results.([]interface{})

        lists := make([]interface{}, 0)

        for _, result := range resultsMap {

            resultMap := result.(map[string]interface{})
            document := resultMap["doc"]

            if document != nil {
                documentMap := document.(map[string]interface{})
                if documentMap["type"] == "list" {
                    lists = append(lists, documentMap)
                }
            }

        }

        json, _ := json.Marshal(lists)

        w.Header().Set("Content-Type", "application/json")
        w.Write(json)
        return
    }
}

func listHandler(w http.ResponseWriter, r *http.Request) {
    id := r.URL.Path[len("/list/"):]
    stringUrl := "http://127.0.0.1:4984/todos/_changes?include_docs=true&filter=sync_gateway/bychannel&channels=list-" + id
    client := &http.Client{}
    req, _ := http.NewRequest("GET", stringUrl, nil)
    req.Header.Set("Cookie", r.Header.Get("Cookie"))
    res, err := client.Do(req)

    if err != nil {
        fmt.Print(err)
        return
    }

    if res != nil {
        body, _ := ioutil.ReadAll(res.Body)

        data := map[string]interface{}{}
        json.Unmarshal(body, &data)

        results := data["results"]
        resultsMap := results.([]interface{})

        lists := make([]interface{}, 0)

        for _, result := range resultsMap {

            resultMap := result.(map[string]interface{})
            document := resultMap["doc"]

            if document != nil {
                documentMap := document.(map[string]interface{})
                if documentMap["type"] == "task" {
                    lists = append(lists, documentMap)
                }
            }

        }

        json, _ := json.Marshal(lists)

        w.Header().Set("Content-Type", "application/json")
        w.Write(json)
        return

    }

}

func newTaskHandler(w http.ResponseWriter, r *http.Request) {
    var stringUrl string = "http://127.0.0.1:4984/todos/"
    client := &http.Client{}
    req, _ := http.NewRequest("POST", stringUrl, r.Body)
    req.Header.Set("Cookie", r.Header.Get("Cookie"))
    res, err := client.Do(req)

    if err != nil {
        fmt.Print(err)
        return
    }

    if res != nil {
        body, _ := ioutil.ReadAll(res.Body)

        w.Header().Set("Content-Type", "application/json")
        w.Write(body)
        return

    }
}

func newListHandler(w http.ResponseWriter, r *http.Request) {
    var stringUrl string = "http://127.0.0.1:4984/todos/"
    client := &http.Client{}
    req, _ := http.NewRequest("POST", stringUrl, r.Body)
    req.Header.Set("Cookie", r.Header.Get("Cookie"))
    res, err := client.Do(req)

    if err != nil {
        fmt.Print(err)
        return
    }

    if res != nil {
        body, _ := ioutil.ReadAll(res.Body)

        w.Header().Set("Content-Type", "application/json")
        w.Write(body)
        return

    }
}

func main() {
    http.HandleFunc("/signup", signupHandler)
    http.HandleFunc("/login", loginHandler)
    http.HandleFunc("/lists", listsHandler)
    http.HandleFunc("/list/", listHandler)

    http.HandleFunc("/newtask", newTaskHandler)
    http.HandleFunc("/newlist", newListHandler)

    fs := http.FileServer(http.Dir("build"))
    http.Handle("/", fs)

    http.ListenAndServe(":9001", nil)
}