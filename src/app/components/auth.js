var Auth = {
    login (name, password, cb) {
        cb = arguments[arguments.length - 1];
        if (localStorage.token) {
            if (cb) cb(true);
            this.onChange(true);
            return;
        }
        var json = JSON.stringify({
            name: name,
            password: password
        });
        fetch('/login', {
            method: 'post',
            headers: {
                "Content-type": "application/json"
            },
            body: json,
            credentials: 'include'
        })
          .then(function(res) {
              return res.json();
          })
          .then(function (jsonRes) {
              if (jsonRes.ok) {
                  localStorage.userId = jsonRes.userCtx.name;
              }
          })
          .catch(function (error) {
              console.log('Request failed', error);
          });
        //pretendRequest(email, pass, (res) => {
        //    if (res.authenticated) {
        //        localStorage.token = res.token;
        //        if (cb) cb(true);
        //        this.onChange(true);
        //    } else {
        //        if (cb) cb(false);
        //        this.onChange(false);
        //    }
        //});
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