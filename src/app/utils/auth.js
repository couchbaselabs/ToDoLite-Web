var Auth = {

    url: 'http://localhost:4984/todos',

    login: function(name, password) {
        return fetch(this.url + '/_session', {
            method: 'post',
            mode: 'cors',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                password: password
            }),
            credentials: 'include'
        }).then((res) => res.json())
          .then(function (jsonRes) {

              /*
              Set the userId in LocalStorage as a way to identify if
              the user is logged in in the loggedIn method.
               */
              if (jsonRes.ok) {
                  localStorage.userId = jsonRes.userCtx.name;
              }
              return jsonRes;
          })
          .catch(function (error) {
              console.log('Request failed', error);
          });
    },

    getUserId: function () {
        return localStorage.userId;
    },

    logout: function (cb) {
        delete localStorage.token;
        this.deleteCookie('SyncGatewaySession');
        if (cb) cb();
        this.onChange(false);
    },

    loggedIn: function () {
        return !!localStorage.userId;
    },

    onChange: function () {},

    deleteCookie: function(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
};

module.exports = Auth;