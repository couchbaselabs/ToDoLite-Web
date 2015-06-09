### ToDoLite Web

A shared todo app to show how to build web applications against the Sync Gateway REST API.

![screenshot](http://cl.ly/image/1s0r120T0h2R/Desktop.png)

The app is a simple shared to-do list manager. Users can create multiple lists, each with its own items that can be checked off when done. Lists are private by default but can be shared with other users.

The app is also available on other platforms: ToDoLite-iOS, ToDoLite-Android and ToDoLite-PhoneGap.

## Getting Started

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `gulp` to build the app
4. Start Start Gateway running locally on `http://localhost:4984/todos/`

For most endpoints, the web app will send requests with credentials to Sync Gateway
directly.

For signing up new user, you can use the demo app server in `main.go`.

1. Start the web server:
  
  ```
  $ go run main.go
  ```
2. Create a new user through the web app:

  ```
  http://localhost:3000/login
  ```
  The app server will attempt to connect to the Sync Gateway admin REST API on `http://localhost:4985`.
3. Login with the credentials of the new user
                                                                                         
### Routes

<img src="http://f.cl.ly/items/0Y3H0m0v1C1K0w2m0E1O/spec.png" />