$("#user").russiandolls({
    url: "http://api.twitter.com/1/statuses/friends.json",
    paramName: "screen_name",
    child: jQuery("#friends"),
    labelName: "screen_name",
    dataType: "jsonp",
    emptyMsg: "No friends found for this user :("
});
