//define global variables to be used

var series;
var arena;
var gamedate;
var gametime;
var gametimeFormatted;
var cavsHOME;
var gameIdentifier;
var gameYesterday;
var nextGameFormatted;
var gameStatus;
var gamenumber;

//Game Links
// ---------------- PREGAME LINKS ----------------

var gamelinkPreview;
var gamelinkKeys;

// ---------------- IN GAME/POST GAME LINKS ----------------

var gamelinkRecap;
var gamelinkSounds;
var gamelinkPhotos;
var gamelinkHighlights;
var gameLinkTracker;

//---------------- MANUAL LINKS ----------------

/* Manual Override For the Next Game Text - in the event the feed does not have a next game just enter copy between the  single quotes in the nextGameFormattedOverride  variable*/

var nextGameFormattedOverride;

var gamelinkMerch = 'https://www.cavaliersteamshop.com/filterSearch?q=2016+ECC';

var gamelinkFanGuide = 'http://www.nba.com/cavaliers/playoffs/guide';

var gamelinkSchedule = 'http://www.nba.com/cavaliers/schedule';

var gamelinkDiscuss = 'http://www.cavfanatic.com/forums/cavsnbabasketball_game-information#plckforumpage=ForumDiscussion&plckdiscussionid=Cat%3Acavs_nba_basketballForum%3A200869Discussion%3A02201090-66b2-4baa-8f41-431d6bd02df6';

var gamelinkTickets = 'http://www.nba.com/cavaliers/playoffs/2016/tickets?ls=homepage';

var gamelinkFlash = 'https://www.flashseats.com/default.aspx?pid=19&eo=1&ss=0&eod=s';

//---------------- /END MANUAL LINKS ----------------

var $ = jQuery.noConflict();

/* ======================= load Game Data ======================= */
function loadGameData() {

    $.ajaxSetup({ cache: true});
    $.getJSON(cavsSchedFeed, 
    function(data){

    gamenum=3;
                
    // SET GLOBAL VARIABLES
    game = data.gscd.g;
    status = game[gamenum].st;
    arena = game[gamenum].an; //ARENA
    gamedate = game[gamenum].gdte; //GAME DATE
    gametime = game[gamenum].etm; //GAME TIME EST DATE&TIME
    gameID = game[gamenum].gid; //GAME ID
    gcode = game[gamenum].gcode; //GAME CODE

    gametimeFormatted  = moment(game[gamenum].etm).format('dddd, MMMM D, YYYY') + ' AT ' + moment(game[gamenum].etm).format('h:mm A')+' (ET)'; 

    if (cavsTID == data.gscd.g[gamenum].h.tid){
        cavsHOME = 1;
    } else {
        cavsHOME = 0;
    }

}); 

} //end function


/* ======================= /load Game Data ======================= */


/* ======================= gameIsOn ======================= */
function gameIsOn() {

    $.ajaxSetup({ cache: true});
    $.getJSON("http://data.nba.com/data/v2015/json/mobile_teams/nba/2016/scores/gamedetail/" + gameID + "_gamedetail.json", 
    function(data){

    var period = data.g.p;
    var gamestatus = data.g.stt;
    gameStatus = data.g["st"];

    if (period === null || period == "0") {
        loadScoreboardPregame();
    } else {
        loadScoreboardInGame();
        if (gamestatus != "Final") {
            setInterval("loadScoreboardInGame()",10000);
        }
        if (gamestatus == "Final") {
            clearInterval("loadScoreboardInGame"); //clear interval
        }
    }     
    });

} //end function

/* ======================= /gameIsOn ======================= */

/* ======================= clearInterval ======================= */
function stopFunction(variabletoclear) {
    clearInterval(variabletoclear);
}
/* ======================= /clearInterval ======================= */

/* ======================= loadScoreboardPregame ======================= */
function loadScoreboardPregame() {

    $.ajaxSetup({ cache: true});
    
    $.getJSON("http://data.nba.com/data/v2015/json/mobile_teams/nba/2016/teams/cavaliers_schedule_" + seasontype + ".json", 
    function(data){

        var game = data.gscd.g;
        var status = game[gamenum].st;
        var status = game[gamenum].st;

        var cavsscore;
        var oppscore;

        if (cavsHOME == 1){
            cavsscore = game[gamenum].h["re"];
            oppscore = game[gamenum].v["re"];
        } else {
            cavsscore = game[gamenum].v["re"];
            oppscore = game[gamenum].h["re"];
        }

        
        document.getElementById("opp-score").innerHTML="2-1";
        document.getElementById("cavs-score").innerHTML="3-0";  

    });

} //end function
/* ======================= /loadScoreboardPregame ======================= */

/* ======================= loadScoreboardInGame ======================= */
function loadScoreboardInGame() {

    $.ajaxSetup({ cache: true});
    
    $.getJSON("http://data.nba.com/data/v2015/json/mobile_teams/nba/2016/scores/gamedetail/" + gameID + "_gamedetail.json", 
    function(data){
    
        var gamestatus = data.g["stt"];
        var clock = data.g["cl"];

        if (cavsHOME == 1){
            var oppBox = data.g.vls["s"];
            var cavsBox = data.g.hls["s"];
        } else {
            var oppBox = data.g.hls["s"];
            var cavsBox = data.g.vls["s"];
        }

        if (gamestatus == "Halftime" || gamestatus == "Final") {
            var status = gamestatus;
        } else {
            var status = clock + ' - '+ gamestatus; //clock + ' - '+ gamestatus
        }

        document.getElementById("opp-score").innerHTML=oppBox;
        document.getElementById("cavs-score").innerHTML=cavsBox;  
        document.getElementById("api-gameday").innerHTML=status;

    
        
    });

} //end function
/* ======================= /loadScoreboardInGame ======================= */





/* ======================= start gamehub ======================= */
$(document).ready(function(){   
    loadGameData();
    gameIsOn();
    //loadGameLinks();
}); 


/* ======================= start video highlights ======================= */

var cacheBust = "2016-10-13-v4",
    vidDate,
    vidTitle,
    vidLink,
    vidList,
    vidImage,
    vidTeaser,
    request,
    vidPubDate,
    vidPubDateClean,
    vidQuantity,
    vidBoot,
    timeAgo;
var xmlFileURL;
var firstToggle = true;


console.log('hi');
var jq2 = jQuery.noConflict();
jq2(function($) {

    $.getJSON(vidDropdownFeed, function(data) {
            console.log("We're In!");
            vidList = data.content;
        })
        .done(function() {
            vidQuantity = vidList.length;
            console.log(vidQuantity);
            if (vidQuantity > '0') {
                $('.video-dropdown').css('display', 'block');
            }
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
});



function videoToggle() {
    $('#video-dropdown-list').slideToggle('slow');
    $('#chevyup').toggle();
    $('#chevydown').toggle();
    if (firstToggle) {
        firstToggle = false;
        $.getJSON(vidDropdownFeed, function(data) {
                console.log("We're In!");
                vidList = data.content;
            })
            .done(function() {
                console.log('done');
                $('#load').fadeOut();
                vidQuantity = vidList.length;
                if (vidQuantity == '1') { vidBoot = 'col-xs-12'; } else if (vidQuantity == '2') { vidBoot = 'col-xs-6'; } else if (vidQuantity == '3') { vidBoot = 'col-xs-4'; } else if (vidQuantity == '4') { vidBoot = 'col-xs-6 col-sm-6 col-md-3'; } else { vidBoot = 'col-xs-6 col-sm-3 col-md-2'; }
                for (var i = 0; i < vidList.length; i++) {
                    vidXML = vidList[i].xml;
                    console.log(vidXML);
                    vidTitle = vidList[i].title;
                    vidID = vidList[i].videoID;
                    uniqueVidID = vidList[i].nid;
                    vidImage = vidList[i].thumbnail;
                    pubDate = vidList[i].created;

                    $('#video-dropdown-list').append('<div class="' + vidBoot + '">\
                    <button href="#" class="videoThumbButton" data-toggle="modal" data-target="#' + uniqueVidID + '" data-target=".bs-example-modal-lg" onclick="$(\'#' + uniqueVidID + 'video\').trigger(\'play\');">\
                    <img src="' + vidImage + '" class="img-responsive vid-thumbnail">\
                    <p class="video-title">' + vidTitle + '</p>\
                    </button>\
                    </div>');

                    $('#modal-code').append('<div class="modal bs-example-modal-lg" id="' + uniqueVidID + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">\
                      <div class="modal-dialog modal-lg" role="document">\
                        <div class="modal-content">\
                          <div class="modal-header vid-hp-modal-header">\
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="$(\'video\').trigger(\'pause\');"><span aria-hidden="true">&times;</span></button>\
                            <h4 class="modal-title" id="myModalLabel">' + vidTitle + '</h4>\
                          </div>\
                          <div class="modal-body vid-hp-modal-body">\
                              <video id="' + uniqueVidID + 'video" controls poster="' + vidImage + '">\
                              <source src="http://nba.cdn.turner.com/nba/big/' + vidID + '_640x360_664b.mp4" type="video/mp4">\
                              <source src="http://nba.cdn.turner.com/nba/big/' + vidID + '_768x432_996.mp4" type="video/mp4">\
                              <source src="http://nba.cdn.turner.com/nba/big/' + vidID + '_nba_android_high.mp4" type="video/mp4">\
                              Your browser does not support the video tag.\
                              </video>\
                          </div>\
                          <div class="modal-footer vid-hp-modal-footer">\
                            <small><a href="http://www.nba.com/cavaliers/video">CHECK OUT MORE VIDEOS</a> | <a type="button" class="" href="#" data-dismiss="modal" aria-label="Close" onclick="$(\'video\').trigger(\'pause\');">CLOSE</a></small>\
                          </div>\
                        </div>\
                      </div>\
                    </div>');

                }
            })
            .fail(function() {
                $('#video-dropdown-list').append('<div class="col-xs-12">An Error Occurred</div>');
                console.log("error");
            })
            .always(function() {
                console.log("complete");
                $('.modal').on('hide.bs.modal', function() {
                    $('video').trigger('pause');
                    console.log('poop2');
                })
            });
    }
}
