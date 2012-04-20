/*jshint plusplus:false */
/*global jQuery, document, window, setInterval, setTimeout */

/*
 * jQuery Tweet Hash Tag Poll
 * Licensed under the MIT license
 */

// ; - safety against script concatenation
// window / document - small perf., helps min if referenced
// undefined - mutable in ECMAScript 3 ensure undefined
;(function ($, window, document, undefined) {

  // plugin constructor
  var Plugin = function (el, options) {
    this.el = el;
    this.$el = $(el);
    this.options = options;
  };

  // the plugin prototype
  Plugin.prototype = {
    defaults : {
      pollInterval     : 60,
      hashTag          : "jsu",
      resultType       : "recent",
      tweetsPerRequest : 50
    },

    init : function () {
      this.config = $.extend({}, this.defaults, this.options);
      this.first = true;
      this.tweets = [];
      this.maxId = 0;
      //Get Some Tweets
      this.getTweets();
      return this;
    }
  };

  Plugin.prototype.getTweets = function () {
    var self = this,
      interval = self.config.pollInterval * 100;

    if (this.first) {
      //Flag First as Done
      this.first = false;
      //Perform First Query To Twitter
      this.queryTwitterApi();
    }
    setInterval(function () {
      self.queryTwitterApi();
    }, interval);
  };

  Plugin.prototype.queryTwitterApi = function () {
    var self = this,
      config = self.config,
      sinceId = self.maxId === 0 ? '' : "&since_id=" + self.maxId ;

    $.getJSON("http://search.twitter.com/search.json?q=" + config.hashTag +
      " OR @" + config.hashTag +
      "&result_type=" + config.resultType +
      "&rpp=" + config.tweetsPerRequest +
      sinceId +
      "&callback=?", {},
      function (response) {
        //Set The Since ID
        self.setMaxId(response.max_id_str);
        self.handleResults(response.results.reverse());
      });
  };

  Plugin.prototype.setMaxId = function (id) {
    //Set The Max Id For Future Queries
    this.maxId = id;
  };

  Plugin.prototype.handleResults = function (tweets) {
    var len = tweets.length,
      i = 0;

    //Loop through and add each
    for (i; i < len; i++) {
      this.tweets.push(tweets[i]);
      //Add Tweet To Dom
      this.buildTweet(tweets[i]);
    }
  };

  Plugin.prototype.buildTweet = function (tweet) {
    var tweetText = tweet.text,
      idStr = tweet.id_str,
      postAuthor = tweet.from_user,
      postAuthorId = tweet.from_user_id,
      postAuthorImg = tweet.profile_image_url,
      createdAt = tweet.created_at,
      //Set Up Base Element
      tweetEl = $("<div class='tweet new'>");

    //@todo Replace Links

    //Build the HTML Tweet String
    var htmlString = "<a href='http://www.twitter.com/'" + postAuthor + " target='_blank'><img src='" + postAuthorImg + "' width='48' height='48' /></a>";
    htmlString += "<div class='content'>" + tweetText + "</br>";
    htmlString += "<a href='http://www.twitter.com/" + postAuthor + "/status/" + idStr + "' class='view' target='_blank'>" + createdAt + "</a>";
    htmlString += "</div>";
    tweetEl.html(htmlString);

    //Call The Add Method
    this.add(tweetEl);
  };

  Plugin.prototype.add = function (tweet) {
    //Prepend The Tweet To Container
    var self = this;
    this.$el.prepend(tweet);
    $(tweet).fadeIn("slow", function() {
      var self = $(this);
      setTimeout(function () {
        self.removeClass('new');
      }, 500);
    });
  };

  //Set The Public Plugin Defaults
  Plugin.defaults = Plugin.prototype.defaults;

  $.fn.tweetHash = function (options) {
    return this.each(function () {
      new Plugin(this, options).init();
    });
  };

})(jQuery, window, document);
