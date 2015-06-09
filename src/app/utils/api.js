var api = {
    url: 'http://localhost:4984/todos',
    getTasksForList: function(listId) {
        return fetch(this.url + `/_changes?include_docs=true&filter=sync_gateway/bychannel&channels=list-${listId}`, {
            credentials: 'include'
        })
          .then((res) => res.json())
          .then((res) => {
              return res.results.filter((row) => {
                  if (row.doc && row.doc.type == 'task') {
                      console.log(row.doc);
                      return true;
                  }
                  return false;
              }).map((row) => row.doc);
          });
    },
    getProfiles: function() {
        return fetch(this.url + '/_changes?include_docs=true&filter=sync_gateway/bychannel&channels=profiles', {
            credentials: 'include'
        })
          .then((res) => res.json())
          .then((res) => {
              return res.results.filter((row) => {
                  if (row.doc && row.doc.type == 'profile') {
                      return true;
                  }
                  return false;
              }).map((row) => row.doc);
          });
    },
    getDocumentsWithIds: function(ids) {
        return fetch(this.url + '/_all_docs?include_docs=true', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                keys: ids
            }),
            credentials: 'include'
        })
          .then((res) => res.json());
    },
    getLists: function() {
        return fetch(this.url + '/_session', {
            credentials: 'include'
        }).then((res) => res.json())
          .then((res) => {
              return Object.keys(res.userCtx.channels).filter((channel) => {
                  if (channel.indexOf('-') > -1) {
                      return true;
                  }
                  return false;
              }).map((channel) => {
                  return channel.substring(channel.indexOf('-') + 1);
              });
          });
    },
    updateDocument: function(document) {
        return fetch(this.url + '/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(document),
            credentials: 'include'
        }).then((res) => res.json());
    },
    updateDoc: function(document) {
        return fetch(this.url + '/' + document._id, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(document),
            credentials: 'include'
        }).then((res) => res.json());
    }
};

module.exports = api;