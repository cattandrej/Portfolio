//
// Filter tags
//
// tags = [ id ] [ enabled/disabled ]
var tags = [
];

$(".checkbox").each(function (index) {

    var temp = [
        "id_not_initialized",
        false
    ];

    console.log($(this).attr("id"));
    temp[0] = $(this).attr("id");

    tags.push(temp);
});

//
// Card amount
//
var cardsAmount = $(".card").length;
var cardContainerWidth = 0;
var cardWidth = parseInt($(".card").css("width").substr(0,  $(".card").css("width").length - 2));
var remainingSpace = 0;
var cardsPerRow = 0;
var cardMargin = 0;

updateCardMargins(cardsAmount);
$(window).resize(function () {
    updateCardMargins(cardsAmount);
});


$("a").find(".p-tag").click(function(event){
    event.preventDefault();
    var _this = $(this);

    tags.forEach((function(element) {
        if ((_this).hasClass(element[0])) {
            updateCardsVisibility("", element[0]);
        }
    }));

  });

function updateCardMargins(n) {
    cardsAmount = n;
    cardContainerWidth = $(".cards").width() - 16;
    remainingSpace = ((cardContainerWidth / cardWidth) % 1) * cardWidth;
    cardsPerRow = (cardContainerWidth / cardWidth) - ((cardContainerWidth / cardWidth) % 1);
    cardMargin = remainingSpace / (cardsPerRow - 1);


  

    while ((cardMargin < 50) && (cardsPerRow > 2)) {

  
        remainingSpace += cardWidth;
        
        cardsPerRow--;
        cardMargin = remainingSpace / (cardsPerRow - 1);
        console.log("--------> card remainingSpace + card per row: " + remainingSpace + "; " + cardsPerRow  );
    }

    var cont = 0;
    $(".card").each(function (index) {
        $(this).css("margin-right", "0px");
        if (!($(this).hasClass("hiddenCard"))) {
            if ((cont + 1) % (cardsPerRow) != 0) {
                $(this).css("margin-right", cardMargin + "px");
            }
        } else {
            cont--;
        }
        cont++;
    });

    // console.log("cardsAmount: \t" + cardsAmount);
    // console.log("cardContainerWidth: \t" + cardContainerWidth);
    // console.log("cardWidth: \t" + cardWidth);
    // console.log("remainingSpace: \t" + remainingSpace);
    // console.log("cardsPerRow: \t" + cardsPerRow);
    // console.log("cardMargin: \t" + cardMargin);
    // console.log(" *** ");
}

//
// Card visibility
//
function updateCardsVisibility(event, id) {
    
    var cardCont = 0;
    console.log("click on checkbox " + id);

    if (id === tags[0][0]) {
        for (var i = 0; i < tags.length; i++) {
            tags[i][1] = true;
        }
    } else {
        if (event.shiftKey) {

            for (var i = 0; i < tags.length; i++) {
                if (tags[i][0] === id) {
                    tags[i][1] = !tags[i][1];
                }
            }
        } else {
            for (var i = 0; i < tags.length; i++) {
                if (tags[i][0] !== id) {
                    tags[i][1] = false;
                } else {
                    tags[i][1] = true;
                }
            }
        }
    }

    var allChecked = true;
    for (var i = 1; i < tags.length; i++) {
        if (!tags[i][1]) {
            allChecked = false;
        }
    }
    if (allChecked) {
        tags[0][1] = true;
    } else {
        tags[0][1] = false;
    }

        for (var i = 0; i < tags.length; i++) {
            if (tags[i][1]) {
                $("#" + tags[i][0]).addClass("checked");
            } else {
                $("#" + tags[i][0]).removeClass("checked");

            }
        }

    // $(".card").each(function () {
    //     if ($(this).hasClass(id)) {
    //         $(this).toggleClass("hiddenCard");
    //     }
    //     if (!($(this).hasClass("hiddenCard"))) {
    //         cardCont++;
    //     } 
    // });

    $(".card-tags > p").each(function () {
        console.log(id + "; " + ($(this).attr("class")));
        if ($(this).hasClass(id)) {
            $(this).toggleClass("tag-enabled");
        }
    });

    $(".card").each(function () {
        var removedClasses = 0;
        $($(this)).find(".card-tags").children().each(function () {
            for (var i = 0; i < tags.length; i++) {
                if ($(this).hasClass(tags[i][0])) {
                    if (tags[i][1]) {
                        $(this).addClass("tag-enabled");
                    } else {
                        $(this).removeClass("tag-enabled");
                        removedClasses++;
                    }
                }
            }
        });

        if (removedClasses == $($(this)).find(".card-tags").children().length) {
            $(this).addClass("hiddenCard");
            $(this).parent().css("width", "0px");
        } else {
            $(this).removeClass("hiddenCard");
            $(this).parent().css("width", cardWidth);
        }

        console.log("removed classes: " + removedClasses + "\nall classes: " + $(this).children().length);
        for (var tmp = 0; tmp < $($(this)).find(".card-tags").children().length; tmp++) {
            $($(this)).find(".card-tags").children().each( function () {
                console.log(tmp + ": " + $(this).attr("class"));
            });
        }
        console.log("***");
    });


    updateCardMargins(cardCont);
}