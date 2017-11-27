//Here we find all of episode information and add a div wrapper and a class to reference
//Only if the class does not exist yet on the page, since this is our own custom class, it would
//be very rare for this class to already exist from imdb
if($("table.cast_list").find(".ihcec-character-episode-container").length == 0) {
    $("table.cast_list").find("td.character").find("div .toggle-episodes").each(function() { 
        $(this).addClass("ihcec-character-episode-container");
    });
}

//Depending on what the user picked as an option in the app, we automatically set it to their preference
//once the page loads and then update the DOM
chrome.storage.sync.get('castEpisodeVisibility', function (result) {
    modifyDOM(result.castEpisodeVisibility);
});

//Here we listen to for an event if the user makes a change and proceed to update the DOM
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        modifyDOM(request.castEpisodeVisibilityState);
    }
);

//This portion we handle the hovering of blacked out content
$(".ihcec-character-episode-container").hover(
    function() {
        if($(this).hasClass("blackOut")){
            $(this).css({'cursor':'pointer','background-color':'', 'color':'#136CB2'});
        }
    }, function() {
        if($(this).hasClass("blackOut")){
            $(this).css({'cursor':'','background-color':'black', 'color':'black'});        
        }
    }
);

function modifyDOM(state) {
    if(state == 'hide') {
        $(".ihcec-character-episode-container").removeClass("blackOut");
        //Since the table alernates in color, here we targer 'odd' and 'even' row
        $("table.cast_list tr.odd .ihcec-character-episode-container").css({'background-color':'', 'color': '#f6f6f5' });
        $("table.cast_list tr.even .ihcec-character-episode-container").css({'background-color':'', 'color': '#fbfbfb' });
    } else if(state == 'show') {
        $(".ihcec-character-episode-container").removeClass("blackOut");
        $(".ihcec-character-episode-container").css({'background-color':'', 'color':'#444'});
        $(".ihcec-character-episode-container:link").css({'background-color':'', 'color':'#136CB2'});
        $(".ihcec-character-episode-container:visited").css({'background-color':'', 'color':'#70579D'});
    } else if(state == 'blackOut') {
        $(".ihcec-character-episode-container").addClass("blackOut");
        $(".ihcec-character-episode-container").css({'background-color':'black', 'color':'black'});
    }
}