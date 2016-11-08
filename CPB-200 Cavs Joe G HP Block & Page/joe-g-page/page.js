(function($) {
    var cacheBust = "2016-10-13-v4",
        joeDate,
        joeTitle,
        joeLink,
        joegList,
        joegImage,
        joegTeaser,
        request,
        pubDate,
        timeAgo;
    runthis();

    function runthis() {
        var jqxhr = $.getJSON(feed1, function(data) {
                console.log("success");
                joegList = data.content;
            })
            .done(function() {
                console.log('done');
                for (var i = 0; i < joegList.length; i++) {
                    joeTitle = joegList[i].title;
                    joeLink = joegList[i].url;
                    joeImage = joegList[i].images.large;
                    joeTeaser = joegList[i].teaser;
                    pubDate = joegList[i].changed;
                    pubDateClean = moment(pubDate).format('MMM Do, YYYY');
                    timeAgo = moment(pubDate).fromNow();
                    $('.joeg-list').append('<div class="row joeg-block">\
                    <div class="col-sm-3">\
                        <img src="' + joeImage + '" class="joe-image img-responsive"/>\
                    </div>\
                    <div class="col-sm-9">\
                        <h3 class="joeg-title row' + i + '"><a class="joeg-link" href="' + joeLink + '">' + joeTitle + '</a>\
                        <span class="time-ago small pull-right">' + pubDateClean + '</span></h3>\
                        <p class="joeg-teaser-text">' + joeTeaser + ' <a href="' + joeLink + '" class="more small pull-right">Read More</span></p>\
                    </div>\
                    </div>');
                }
                $('#load').hide();
                $('#joeg-more').prop('disabled', false);
                $('#joeg-more').removeClass('disabled');
                joegOffset += 10;
                console.log(feed1)
            })
            .fail(function() {
                $('.joeg-list').append('<div class="col-xs-12">An Error Occurred</div>');
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
    }
    document.getElementById("joeg-more").addEventListener("click", joegMore, false);

    function joegMore() {
        $('#load').show();
        $('#joeg-more').prop('disabled', true);
        $('#joeg-more').blur();
        $('#joeg-more').addClass('disabled');
        feed1 = feed + joegOffset;
        console.log('offset: ' + joegOffset + ' | Feed: ' + feed1);
        runthis();
    }
})(jQuery);
