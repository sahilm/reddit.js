# Reddit.js
Reddit.js is a browser based wrapper on most of the read-only [Reddit API](https://www.reddit.com/dev/api/oauth#scope_read).
It makes [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) requests to the
[Reddit API](https://www.reddit.com/r/changelog/comments/1r0u3v/reddit_change_third_party_websites_can_now_make/).
Thus only unauthenicated (logged-out) requests are allowed.

Latest versions of Chrome, Firefox, Internet Explorer and Safari are supported.

[![npm version](https://badge.fury.io/js/reddit.js.svg)](https://badge.fury.io/js/reddit.js) [![bower version](https://badge.fury.io/bo/reddit.js.svg)](https://badge.fury.io/bo/reddit.js)

# Usage

Reddit.js is a lightweight dependency-free library which comes with minified source.

* Install via `npm install reddit.js`
* Or `bower install reddit.js`
* Or include a link from the jsdelivr CDN.
* Or download the `reddit.min.js` file from here.

Include the minfied source via `script` tag like so
```html
  <script src="//cdn.jsdelivr.net/reddit.js/0.1.4/reddit.min.js"></script>
```

The `reddit` variable is exported which can be used to talk to the Reddit API. The `examples` directory includes usage with pure DOM API. More sophisticated examples are on the way!

```javascript
  // Fetch the 5 hottest posts on /r/awww
  reddit.hot('aww').limit(5).fetch(function(res) {
    // res contains JSON parsed response from Reddit
    console.log(res);
  });
```

```javascript
  // Errors (if any) will be passed to the 2nd argument of fetch()
  reddit.hot('aww').limit(5).fetch(function(res) {}, function(err) {
    // err contains the error from Reddit
  });
```

```javascript
  // All Reddit API filters are supported and chainable
  reddit.hot('aww').limit(1).after("t3_23jf8n").fetch(function(res) {
    // res contains JSON parsed response from Reddit
    console.log(res);
  });
```

```javascript
  // Subreddits may be omitted
  // Fetch the hottest posts from Reddit
  reddit.hot().fetch(function(res) {
    console.log(res);
  });
```

# Supported API Endpoints

* [Hot](https://www.reddit.com/dev/api/oauth#GET_hot)

Fetch the hottest posts on Reddit or on a subreddit. All filters such as `after`, `before`, `limit` are supported.

```javascript
  reddit.hot('aww').limit(1).after("t3_23jf8n").fetch(function(res) {
    // res contains JSON parsed response from Reddit
    console.log(res);
  });
```

* [New](https://www.reddit.com/dev/api/oauth#GET_new)

Fetch the newest posts on Reddit or on a subreddit. Again all filters are supported.

```javascript
  reddit.new('programming').before("t3_23jf8n").fetch(function(res) {
    // res contains JSON parsed response from Reddit
    console.log(res);
  });
```

* [Top](https://www.reddit.com/dev/api/oauth#GET_top)

Fetch the top posts on Reddit or on a subreddit. As usual all filters are supported. The `t` filter allows filtering by top posts of the day, week, month, year or all-time.

```javascript
  // Fetch the top 5 funniest posts of all time from /r/funny
  reddit.top('funny').t('all').limit(5).fetch(function(res) {
    console.log(res);
  });
```

* [Controversial](https://www.reddit.com/dev/api/oauth#GET_controversial)

Fetch the top posts on Reddit or on a subreddit As usual all filters are supported.. The `t` filter allows filtering by top posts of the day, week, month, year or all-time.

```javascript
  // Fetch the 25 most controversial posts from this month
  reddit.controversial().t('month').limit(25).fetch(function(res) {
    console.log(res);
  });
```

* [Comments](https://www.reddit.com/dev/api/oauth#GET_comments_{article})

Fetch comments on a link. As usual all filters are supported. Context and depth are useful filters to narrow or highlight comments.

```javascript
  // Fetch the hottest comment on article 23ha0a from /r/pics
  reddit.comments("23ha0a", "pics").limit(1).sort("hot").fetch(function(res) {
    console.log(res);
  });
```

* [Search](https://www.reddit.com/dev/api/oauth#GET_search)

Search everything. All filters including `syntax` and `t` are supported.

```javascript
  reddit.search("programming").t('month').limit(1).sort("hot").fetch();
```

* [Search subreddits](https://www.reddit.com/dev/api/oauth#GET_subreddits_search)

Search subreddits by title and description. Filter away.

```javascript
  // Fetch 5 subreddits related to gardening
  reddit.searchSubreddits("gardening").limit(5).fetch();
```

* [About](https://www.reddit.com/dev/api/oauth#GET_r_{subreddit}_about)

Fetch information about Reddit or a subreddit.

```javascript
  // Fetch information about /r/pics
  reddit.about("pics").fetch(function(res) {
    console.log(res);
  });
```

* [Random](https://www.reddit.com/dev/api/oauth#GET_random)

The Serendipity button.

```javascript
  // Fetch random articles from /r/funny
  reddit.random("funny").fetch(function(res) {
    console.log(res);
  });
```

* [Info](https://www.reddit.com/dev/api/oauth#GET_api_info)

Fetch a link by fullname or a list of links by URL. Can be filtered by a subreddit.

```javascript
  // Fetch info about reddit itself
  reddit.info().url("https://www.reddit.com/").fetch(function(res) {
    console.log(res);
  });
```

* [Recommended subreddits](https://www.reddit.com/dev/api/oauth#GET_api_recommend_sr_{srnames})

Fetch a list of recommended subreddits based on the comma separated list of subreddits supplied. Can be filtered by the `omit` param.

```javascript
 reddit.recommendedSubreddits("programming").omit("leapmotion,CFD").fetch(function(res) {
    console.log(res);
  });
```

* [Subreddits by topic](https://www.reddit.com/dev/api/oauth#GET_api_subreddits_by_topic)

Fetch list of subreddits that are relevant to a search query.

```javascript
 reddit.subredditsByTopic("programming").fetch();
```

* [Popular subreddits](https://www.reddit.com/dev/api/oauth#GET_subreddits_{where})

Fetch subreddits ordered by activity.

```javascript
  // Fetch the 25 most popular subreddits
  reddit.popularSubreddits().limit(25).fetch();
```

* [New subreddits](https://www.reddit.com/dev/api/oauth#GET_subreddits_{where})

Fetch newest subreddits.

```javascript
  // Fetch the 25 newest subreddits.
  reddit.newSubreddits().limit(25).fetch();
```

* [About user](https://www.reddit.com/dev/api/oauth#GET_user_{username}_about.json)

Fetch information about the user, including karma and gold status.

```javascript
  reddit.aboutUser("chromakode").fetch();
```
# Contributing

Pull requests are welcome. Reddit.js is built using `node` and `npm`. Once you have them installed you can run all tests with:
```
$ npm install
$ npm test
```

To build the minified source
```
 $ npm run minify
```

# License

The MIT License (MIT)

Copyright (c) 2014 Sahil Muthoo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
