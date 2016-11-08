(function($) {
    var cacheBust = "2016-10-13-v4",
        joeDate,
        joeTitle,
        joeLink,
        joegList,
        request,
        pubDate,
        timeAgo;
    var jqxhr = $.getJSON(joegfeed, function(data) {
            console.log("success");
            joegList = data.content;
            console.log(joegList);
        })
        .done(function() {
            console.log('done');
            for (var i = 0; i < joegList.length; i++) {
                joeTitle = joegList[i].title;
                joeLink = joegList[i].url;
                pubDate = joegList[i].created;
                timeAgo = moment(pubDate).fromNow();
                $('.joeg-list').append('<p class="joeg-title row' + i + '"><a class="joeg-link" href="' + joeLink + '">' + joeTitle + '</a><span class="time-ago small pull-right">' + timeAgo + '</span></p>');
            }
        })
        .fail(function() {
        	$('.joeg-list').append('<div class="col-xs-12">An Error Occurred</div>');
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });

})(jQuery);
