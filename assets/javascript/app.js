var topics = ["Sports Fail", "Minions", "Prank", "Shark", "Batman", "Driving", "Office", "Crossfit", "Homer", "Trippy"];



    function displayGiphy(){
        var topic = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=zLWRIcoOTBYwIVdrcP0Z1R1ihmlZFCnd&q=" + topic + "&limit=10&offset=0&rating=PG-13&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(giphy){
            //console.log(giphy);
            var giphyArr = giphy.data;
            //console.log(giphyArr);

            for (var i = 0; i < giphyArr.length; i++) {
                var rating = giphyArr[i].rating;
                //console.log(rating);
                var imageURL = giphyArr[i].images.fixed_height_still.url;
                //console.log(imageURL);

                var topicDiv = $("<div class='card topic mt-3 d-inline-flex mr-3'>");
                //console.log(topicDiv);
                var imgTag = $("<img class='giphy card-img-top'>").attr("src", imageURL);
                //console.log(imgTag);
                var cardBody = $("<div class='card-body'>");
                //console.log(cardBody);
                var pTagRating = $("<p class='card-text text-dark'>").text("Rating: " + rating);

                
                imgTag.attr("data-state", "still");
               // console.log("data-state is set to: " + imgTag.attr("data-state"));
                imgTag.attr("data-still", imageURL);
                imgTag.attr("data-animate", giphyArr[i].images.fixed_height.url);


                topicDiv.append(imgTag);
                topicDiv.append(cardBody);
                cardBody.append(pTagRating);

                //console.log(topicDiv);

                $("#gif-area").prepend(topicDiv);
            };

            
        });
    };

    $(document).on("click", ".giphy", function () {
        console.log("Gif Clicked.");
        var state = $(this).attr("data-state");
        console.log(this);
        console.log("state is set to: " + state);

        if (state === "still") {
            console.log("Should animate");
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            console.log("Should stop");
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    $(document).on("click", "#add-topic",function (){
        event.preventDefault();
        console.log("Add button clicked.");
        var newTopic = $("#topic-input").val().trim();
        topics.push(newTopic);
        console.log(topics);
        renderButtons();
    });

    


    function renderButtons() {
        $("#buttons-area").empty();

        for(var i = 0; i < topics.length; i++){
            var topic = $("<button class='btn btn-light mr-3  mb-3 btn-size'>");
            topic.addClass("topic-btn");
            topic.attr("data-name", topics[i]);
            topic.text(topics[i]);
            $("#buttons-area").append(topic);
        }
    };

    $(document).on("click", ".topic-btn", displayGiphy);


renderButtons();