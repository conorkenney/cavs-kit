(function($) {
    var cacheBust = "2016-10-13-v2",
        gameList,
        preseasonGameList,
        gameListTix,
        preseasonGameListTix,
        gameCode,
        date,
        startingPrice,
        arena,
        starttime,
        hname,
        hcity,
        habv,
        vname,
        vcity,
        vabv,
        arenacity,
        arenastate,
        tixLink,
        vipLink,
        vipStatus,
        flashseats,
        promotions,
        presale1,
        tixStatus,
        flashSeatsStatus,
        urlTag = "&utm_source=cavs&utm_medium=link&utm_campaign=cavs-individual-tickets",

        tixDateCheck = new moment().format('YYYY-MM-DDTHH:mm:ss');

    var request1 = $.getJSON(feedtypereg, function(data) {
        gameList = data.gscd.g;

    });

    var request2 = $.getJSON('mock.json?' + cacheBust, function(data) {
        gameListTix = data;
    });

    var preseasonRequest1 = $.getJSON(feedtypepre, function(data) {
        preseasonGameList = data.gscd.g;

    });
    var preseasonRequest2 = $.getJSON('http://i.cdn.turner.com/nba/nba/.element/media/2.0/teamsites/cavaliers/json/cpretx.json?' + cacheBust, function(data) {
        preseasonGameListTix = data;
    });

    function displayGames(list, divLocation, ticketButtonText) {
        for (var i = 0; i < list.length; i++) {
            var tixVisibility = list[i].etm
            var tixOffSale = moment(tixVisibility).add(1, 'hours').format('YYYY-MM-DDTHH:mm:ss');
            if (list[i].h.tn == 'Cavaliers' && tixOffSale >= tixDateCheck) {
                arena = list[i].an;
                date = list[i].gdte;
                hname = list[i].h.tn;
                vname = list[i].v.tn;
                gameCode = list[i].gcode;
                startingPrice = list[i].starting;
                starttime = list[i].stt;
                hcity = list[i].h.tc;
                habv = list[i].h.ta;
                vcity = list[i].v.tc;
                vabv = list[i].v.ta.toLowerCase();
                arenacity = list[i].ac;
                arenastate = list[i].as;
                tixLink = list[i].link;
                tixStatus = list[i].tixStatus;
                vipLink = list[i].vipLink;
                vipStatus = list[i].vipStatus;
                premLink = list[i].premLink;
                premStatus = list[i].premStatus;
                gametime = list[i].stt;
                flashseats = list[i].flashseats;
                flashSeatsStatus = list[i].flashStatus;
                promotions = list[i].promotions;
                presale1 = list[i].presale1;
                fdate = moment(date).format('dddd, MMMM Do');

                if (promotions != '') {
                    promotions = '<div class="col-xs-12 promotional-info">' + promotions + '</div>'
                }

                if (startingPrice != '') {
                    startingPrice = '<p class="starting-at">Starting at</p><h2 class="starting-price">$' + startingPrice + '</h2>'
                }

                
                $(divLocation).append('<div class="col-xs-12 anchor" id="' + date + '"><div class="row game-box"><div class="col-xs-6 col-md-1 col-lg-1 opp-logo ' + vabv + '"><img class="img-responsive team-logo-svg" src="http://i.cdn.turner.com/nba/nba/assets/logos/teams/primary/web/' + vabv + '.svg" /></div><div class="col-xs-6 col-md-2 game-details"><h4 class="opp-name">' + vcity + ' ' + vname + '</h4><h5 class="game-date">' + fdate + '</h5><h4 class="game-time">' + gametime + '</h4></div><div class="col-md-1 col-lg-1 col-xs-12 starting-tix text-center">' + startingPrice + '</div><div class="col-md-2 col-xs-12 single-tix text-center"><a href="' + tixLink + urlTag + '" class="ticket-button ticket-single btn btn-story ' + tixStatus + '" target="_blank">' + ticketButtonText + '</a></div><div class="col-md-2 col-xs-12 vip-tix text-center"><a href="' + vipLink + urlTag + '" class="ticket-button ticket-vip btn btn-story ' + vipStatus + '" target="_blank">VIP Seats</a></div><div class="col-md-2 col-xs-12 prem-tix text-center"><a href="' + premLink + urlTag + '" class="ticket-button ticket-prem btn btn-story ' + premStatus + '" target="_blank">Premium Seats</a></div><div class="col-xs-12 col-md-2 flash-seats"><a  class="ticket-button ticket-flash btn btn-story ' + flashSeatsStatus + '" target="_blank" href="' + flashseats + '">Flash Seats</a></div><p class="promotional-info">' + promotions + '</p></div></div>');
            }

        }
    }

    $.when(request1, request2).done(function(request1Data, request2Data) {
        $.extend(true, gameList, gameListTix);
        displayGames(gameList, '.regseason', 'Find Seats');
    })

    $.when(preseasonRequest1, preseasonRequest2).done(function(request1Data, request2Data) {
        $.extend(true, preseasonGameList, preseasonGameListTix);
        if (tixDateCheck <= '2016-10-18T19:00:00') {
            displayGames(preseasonGameList, '.preseason', 'Find Seats');
        } else {
            $('.preseason').html('');
        }
    })

})(jQuery);
