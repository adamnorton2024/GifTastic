var topics = ["sports fail", "minions", "prank", "shark", "batman", "driving", "office", "crossfit", "homer", "trippy"];



    function displayGiphy(){
        var topic = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=zLWRIcoOTBYwIVdrcP0Z1R1ihmlZFCnd&q=" + topic + "&limit=10&offset=0&rating=PG-13&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(giphy){
            console.log(giphy);
            $("#gif-area").text(JSON.stringify(giphy));

            for(i=0; i < giphy.length; i++){

            }

            var topicDiv = $("<div class='topic'>");
            //var rating = giphy[i].rating;
           // var tRating = $("<p>").text("Rating: " + rating);

            var imageURL = giphy[i].url;
            console.log(imageURL);
            var image = $("<img>").attr("src", imageURL);

            topicDiv.append(image);
            //topicDiv.append(tRating);

            console.log(topicDiv);
            $("#gif-area").prepend(topicDiv);
        });
    };

    // render a topic button for each entry in the array
    function renderButtons() {
        $("#buttons-area").empty();

        for(var i = 0; i < topics.length; i++){
            var topic = $("<button>");
            topic.addClass("topic-btn");
            topic.attr("data-name", topics[i]);
            topic.text(topics[i]);
            $("#buttons-area").append(topic);
        }
    };

    $("#add-topic").on("click", function(event){
        event.preventDefault();

        var topic = $("#topic-input").val().trim();
        topics.push(topic);

        renderButtons();
    });

    $(document).on("click", ".topic-btn", displayGiphy);


renderButtons();