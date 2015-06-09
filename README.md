### ToDoLite Web

![screenshot](http://cl.ly/image/1s0r120T0h2R/Desktop.png)

A shared todo app to show how to build web applications against the Sync Gateway REST API.

<img src="http://cl.ly/image/073K331o1G2T/Screen%20Shot%202015-05-25%20at%2023.16.58.png" style="max-width: 100%;" />

The app is a simple shared to-do list manager. Users can create multiple lists, each with its own items that can be checked off when done. Lists are private by default but can be shared with other users.

The app is also available on other platforms: ToDoLite-iOS, ToDoLite-Android and ToDoLite-PhoneGap.

## Getting Started

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `gulp` to build the app
4. Start the web server with `go run main.go`
5. Open the app in your browser `http://localhost:3000`
                                                                                         
Note: the web server will attempt to connect to a Sync Gateway running locally with a `todos` database: `http://127.0.0.1:4984/todos`.

**This is a work in progress** and will eventually be a public repo once the missing features are added and the readme has more info to get started.
                                                                                         
### Routes

<img src="http://f.cl.ly/items/0Y3H0m0v1C1K0w2m0E1O/spec.png" />