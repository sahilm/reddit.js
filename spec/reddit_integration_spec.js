(function () {
  "use strict";

  describe("Reddit Integration", function () {
    var expect = require("chai").expect;

    it("fetches JSON data", function () {
      reddit.top("funny").limit(5).fetch(function (res) {
        expect(res.data.children.length).to.eql(5);
      });
    });

  });
})();
