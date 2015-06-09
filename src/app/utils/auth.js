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
              if (jsonRes.ok) {
                  localStorage.userId = jsonRes.userCtx.name;
              }
              return jsonRes;
          })
          .catch(function (error) {
              console.log('Request failed', error);
          });
    },

    getToken: function () {
        return localStorage.token;
    },

    logout: function (cb) {
        delete localStorage.token;
        this.deleteCookie('SyncGatewaySession');
        if (cb) cb();
        this.onChange(false);
    },

    loggedIn: function () {
        return !!localStorage.token;
    },

    onChange: function () {},

    deleteCookie: function(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
};

module.exports = Auth;