(function($) {
    var cacheBust = "2016-10-13-v4",
        gameList,
        gameListTix,
        gameCode,
        date,
        tense,
        gameMonth,
        gameDOW,
        gameOppCity,
        gameOppAbbv,
        gameOppName,
        gameDateDay,
        gameDateDayNumber,
        tixLink,
        vipLink,
        vipStatus,
        flashseats,
        promotions,
        presale1,
        tixStatus,
        flashSeatsStatus,
        vsOrAt,
        urlTag = "&utm_source=cavs&utm_medium=link&utm_campaign=cavs-individual-tickets",

        tixDateCheck = new moment().format('YYYY-MM-DDTHH:mm:ss');

    var request1 = $.getJSON(myFeed, function(data) {
        gameList = data.gscd.g;


    });

    var request2 = $.getJSON('http://i.cdn.turner.com/nba/nba/.element/media/2.0/teamsites/cavaliers/json/ctx.json?' + cacheBust, function(data) {
        gameListTix = data;
    });

    function displayGames(list, divLocation) {
        for (var i = 0; i < list.length; i++) {
            var tixVisibility = list[i].etm
            var tixOffSale = moment(tixVisibility).add(3, 'hours').format('YYYY-MM-DDTHH:mm:ss');
            if (tixOffSale >= tixDateCheck) {
                tense = 'future-game';
            } else {
                tense = 'past-game';
            }
            date = list[i].gdte;
            if (list[i].h.tn != 'Cavaliers') {
                gameOppCity = list[i].h.tc.toUpperCase();
                gameOppName = list[i].h.tn.toUpperCase();
                gameOppAbbv = list[i].h.ta.toLowerCase();
                vsOrAt = '@';
            } else {
                gameOppCity = list[i].v.tc.toUpperCase();
                gameOppName = list[i].v.tn.toUpperCase();
                gameOppAbbv = list[i].v.ta.toLowerCase();
                vsOrAt = 'vs';
            }
            gameCode = list[i].gcode;
            jersey = list[i].jersey;
            gameMonth = moment(date).format('MMM').toUpperCase();
            gameDOW = moment(date).format('dddd');
            gameDateDayNumber = moment(date).format('Do');
            var gameDateDay = moment(date).format('D');

            var fdate = moment(date).format('dddd, MMMM Do');




            $(divLocation).append('<div class="col-sm-6 col-md-4 ' + tense + '"><div class="game-block row">\
                                    <div class="col-xs-2">\
                                    <p class="game-opp ' + gameOppAbbv + '">'+ vsOrAt + ' ' + gameOppName + '</p>\
                                    </div>\
                                    <div class="col-xs-6">\
                                    <p class="date-dow">' + gameDOW + '</p>\
                                    <p class="date-month">' + gameMonth + '</p>\
                                    <p class="date-day">' + gameDateDayNumber + '</p>\
                                    </div>\
                                    <div class="col-xs-4">\
                                    <img class="img-responsive team-logo-svg" src="' + jersey + '" />\
                                    </div>\
                                    </div>\
                                    <div class="row ticket-block">\
                                    </div></div>');
        }

    }

//<div class="col-xs-12 buy-jersey text-center"><p>SHOP &nbsp;&nbsp;<a href="#" class="btn btn-story ticket-prem" role="button">Mens</a><a href="#" class="ticket-prem btn btn-story" role="button">Womens</a><a href="#" class="ticket-prem btn btn-story" role="button">Kids</a></p></div>

    $.when(request1, request2).done(function(request1Data, request2Data) {
        $.extend(true, gameList, gameListTix);

        displayGames(gameList, '.regseason');
        $(".past-game").hide();
        
        $(".slider").click(function() {
            $(".past-game").toggle('slow');
        });

    })


})(jQuery);
