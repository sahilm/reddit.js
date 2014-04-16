(function (window) {
  "use strict";
  var reddit = window.reddit = {};

  reddit.hot = function (subreddit) {
    return listing({
      subreddit: subreddit,
      resource: "hot"
    });
  };

  reddit.new = function (subreddit) {
    return listing({
      subreddit: subreddit,
      resource: "new"
    });
  };

  reddit.about = function (subreddit) {
    return fetch({
      subreddit: subreddit,
      resource: "about"
    });
  };

  reddit.random = function (subreddit) {
    return fetch({
      subreddit: subreddit,
      resource: "random"
    });
  };

  var listing = function (on) {
    on.params = {};
    return {
      after: function (fullname) {
        on.params.after = fullname;
        return without(this, "after");
      },
      before: function (fullname) {
        on.params.before = fullname;
        return without(this, "before");
      },
      count: function (count) {
        on.params.count = count;
        return without(this, "count");
      },
      limit: function (limit) {
        on.params.limit = limit;
        return without(this, "limit");
      },
      show: function () {
        on.params.show = "all";
        return without(this, "show");
      },
      fetch: function (res, err) {
        getJSON(redditUrl(on), res, err);
      }
    };
  };

  var fetch = function (on) {
    return {
      fetch: function (res, err) {
        getJSON(redditUrl(on), res, err);
      }
    };
  };

  function redditUrl(on) {
    var url = "http://www.reddit.com/";

    if (on.subreddit !== undefined) {
      url += "r/" + on.subreddit + "/";
    }
    url += on.resource + ".json";
    if (on.params !== undefined) {
      var qs = [];
      for (var param in on.params) {
        if (on.params.hasOwnProperty(param)) {
          qs.push(encodeURIComponent(param) + "=" +
            encodeURIComponent(on.params[param]));
        }
      }
      url += "?" + qs.join("&");
    }
    return url;
  }

  function without(object, key) {
    var ret = {};
    for (var prop in object) {
      if (object.hasOwnProperty(prop) && prop !== key) {
        ret[prop] = object[prop];
      }
    }
    return ret;
  }

  function getJSON(url, res, err) {
    get(url, function (data) {
      res(JSON.parse(data));
    }, err);
  }

  function get(url, res, err) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function () {
      return res(xhr.response);
    };
    xhr.onerror = function () {
      if (err !== undefined) {
        return err(xhr.response);
      }
    };
    xhr.send();
  }
})(window);