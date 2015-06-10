### ToDoLite Web

A shared todo app to show how to build web applications against the [Sync Gateway REST API](http://developer.couchbase.com/mobile/develop/references/sync-gateway/rest-api/index.html).

![screenshot](http://cl.ly/image/1s0r120T0h2R/Desktop.png)

The app is a simple shared to-do list manager. Users can create multiple lists, each with its own items that can be checked off when done. Lists are private by default but can be shared with other users.

The app is also available on other platforms: [ToDoLite-iOS](https://github.com/couchbaselabs/ToDoLite-iOS/), [ToDoLite-Android](https://github.com/couchbaselabs/ToDoLite-Android/).

## Getting Started

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `gulp` to build the app
4. Start Sync Gateway locally with the configuration file in the root of this repo.
Opening `http://localhost:4984/todos/` in your browser should show information about the the `todos` database.

For most endpoints, the web app will send requests with credentials to Sync Gateway
directly. The config file uses [CORS config](http://developer.couchbase.com/mobile/develop/guides/sync-gateway/administering-sync-gateway/command-line-tool/index.html#cors-configuration) to make cross origin requests.

For signing up a new user, you can use the demo app server in `main.go`.

1. Start the web server:
  
  ```
  $ go run main.go
  ```
2. Create a new user through the web app:

  ```
  http://localhost:3000/signup
  ```
  The app server will attempt to connect to the Sync Gateway admin REST API on `http://localhost:4985`.
3. Login with the credentials of the user created

  ```
  http://localhost:3000/login
  ```
                                                                                         
### App server routes

<img src="http://cl.ly/image/1u2X2s372v0U/spec.png" />