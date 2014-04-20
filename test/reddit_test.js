(function () {
  "use strict";

  describe("Reddit", function () {
    var xhr, requests;
    var expect = chai.expect;

    beforeEach(function () {
      xhr = sinon.useFakeXMLHttpRequest();
      requests = [];
      xhr.onCreate = function (req) {
        requests.push(req);
      };
    });

    afterEach(function () {
      xhr.restore();
    });

    describe("Listing endpoints (hot & new)", function () {
      var endpoints = ["hot", "new"];
      var filters = ["after", "before", "count", "limit", "show"];

      it("should be filterable", function () {
        for (var i = 0; i < endpoints.length; i++) {
          expect(reddit[endpoints[i]].call()).to.include.keys(filters);
        }
      });

      it("should correctly filter", function () {
        for (var i = 0; i < endpoints.length; i++) {
          for (var j = 0; j < filters.length; j++) {
            var re = reddit[endpoints[i]].call(re);
            re[filters[j]].call(re, "filter").fetch();
            if (filters[j] === "show") {
              expect(requests[j].url).to.match(/show\=all/);
            } else {
              expect(requests[j].url).to.match(new RegExp(filters[j] + "=" + "filter"));
            }
          }
        }
      });

      it("should be chainable", function () {
        reddit.hot().after("t3_15bfi0").limit(1).fetch();
        expect(requests.length).to.be.eql(1);
        expect(requests[0].url).to.be.eql("http://www.reddit.com/hot.json?after=t3_15bfi0&limit=1");
      });
    });

    describe("filters", function () {
      it("should not be applicable more than once", function () {
        var re = reddit.info().id("21234");
        expect(re).not.to.include.keys(["id"]);
      });
    });

    describe("hot", function () {
      it("should hit the right endpoint", function () {
        reddit.hot().fetch();
        expect(requests.length).to.be.eql(1);
        expect(requests[0].url).to.be.eql("http://www.reddit.com/hot.json");
      });
      it("should take a subreddit and be filterable", function () {
        reddit.hot("programming").limit(5).fetch();
        expect(requests.length).to.be.eql(1);
        expect(requests[0].url).to.be.eql("http://www.reddit.com/r/programming/hot.json?limit=5");
      });
    });

    describe("new", function () {
      it("should hit the right endpoint", function () {
        reddit.new().fetch();
        expect(requests.length).to.be.eql(1);
        expect(requests[0].url).to.be.eql("http://www.reddit.com/new.json");
      });
      it("should take a subreddit and be filterable", function () {
        reddit.new("programming").limit(5).fetch();
        expect(requests.length).to.be.eql(1);
        expect(requests[0].url).to.be.eql("http://www.reddit.com/r/programming/new.json?limit=5");
      });
    });

    describe("about", function () {
      it("should hit the right endpoint", function () {
        reddit.about().fetch();
        expect(requests.length).to.be.eql(1);
        expect(requests[0].url).to.be.eql("http://www.reddit.com/about.json");
      });

      it("should take a subreddit", function () {
        reddit.about("pics").fetch();
        expect(requests.length).to.be.eql(1);
        expect(requests[0].url).to.be.eql("http://www.reddit.com/r/pics/about.json");
      });
    });

    describe("random", function () {
      it("should hit the right endpoint", function () {
        reddit.random().fetch();
        expect(requests.length).to.be.eql(1);
        expect(requests[0].url).to.be.eql("http://www.reddit.com/random.json");
      });

      it("should take a subreddit", function () {
        reddit.random("pics").fetch();
        expect(requests.length).to.be.eql(1);
        expect(requests[0].url).to.be.eql("http://www.reddit.com/r/pics/random.json");
      });
    });

    describe("info", function () {
      var filters = ["id", "limit", "url"];
      it("should be filterable", function () {
        for (var i = 0; i < filters.length; i++) {
          var re = reddit.info();
          re[filters[i]].call(re, "filter").fetch();
          expect(requests[i].url).to.match(new RegExp(filters[i] + "=" + "filter"));
        }
      });
      it("should hit the right endpoint", function () {
        reddit.info().url("http://www.reddit.com").fetch();
        expect(requests.length).to.be.eql(1);
        expect(requests[0].url).to.be.eql("http://www.reddit.com/api/info.json?url=http%3A%2F%2Fwww.reddit.com");
      });
      it("should take a subreddit", function () {
        reddit.info("pics").limit(25).fetch();
        expect(requests.length).to.be.eql(1);
        expect(requests[0].url).to.be.eql("http://www.reddit.com/r/pics/api/info.json?limit=25");
      });
    });

    describe("comments", function () {
      var filters = ["comment", "context", "depth", "limit", "sort"];
      it("should be filterable", function () {
        for (var i = 0; i < filters.length; i++) {
          var re = reddit.comments();
          re[filters[i]].call(re, "filter").fetch();
          expect(requests[i].url).to.match(new RegExp(filters[i] + "=" + "filter"));
        }
      });
      it("should hit the right endpoint", function () {
        reddit.comments("23ha0a").limit(1).sort("hot").fetch();
        expect(requests.length).to.be.eql(1);
        expect(requests[0].url).to.be.eql("http://www.reddit.com/comments/23ha0a.json?limit=1&sort=hot");
      });
      it("should take a subreddit", function () {
        reddit.comments("23ha0a", "pics").limit(1).sort("hot").fetch();
        expect(requests.length).to.be.eql(1);
        expect(requests[0].url).to.be.eql("http://www.reddit.com/r/pics/comments/23ha0a.json?limit=1&sort=hot");
      });
    });
  });
})();