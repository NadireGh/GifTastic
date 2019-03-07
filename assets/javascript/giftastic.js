$(document).ready(function () {

    // Create an array of topics that will be used to build original buttons
    
    var topics = ["Fear", "Surprise", "Bored", "Angry", "Anticipation", "Disgust", "Happy", "Sad", "Frustrated", "Confused", "Excited", "Tired"];
    
    // Loop through the topics array and create a button for each feeling, then append to page
    
    function makeButtons(){
        $("#buttonGroup").empty(); // clears any duplicated buttons
    
        for (var i = 0; i < topics.length; i++){
    
            var button = $("<button>")
    
            button.addClass("feeling"); // use this to ensure new buttons look like the original buttons
            button.attr("data-name", topics[i]);
            button.text(topics[i]);
            $("#buttonGroup").append(button);
    
        } // closes for loop
    } // closes makeButtons function
    makeButtons(); // call function to create initial buttons

    // Display the called giphy images on the page using AJAX
    
    function displayArea() {
    
        var feeling = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + feeling + "&api_key=dc6zaTOxFJmzC&limit=10";
    
            $.ajax({
                url: queryURL,
                method: "GET"
    
            }).then(function (response) {
    
                console.log(response.data);
    
                var results = response.data;
    
                for (var i = 0; i < results.length; i++) {
    
                    var feelingDiv = $("<div>").addClass("gifs arrange");
                    var feelingImage = $("<img>").addClass("giphyBorder");
    
                    var rating = results[i].rating.toUpperCase();
                    var title = results[i].title;
    
                    var pT = $("<p>").addClass("title").text("Title: " + title);
                    
                    var pR = $("<p>").addClass("rate").text("Rating: " + rating);
    
                        feelingImage.attr("src", results[i].images.fixed_height_still.url);
                        feelingImage.attr("data-still", results[i].images.fixed_height_still.url);
                        feelingImage.attr("data-state", "still");
                        feelingImage.addClass("gif");
                        feelingImage.attr("data-animate", results[i].images.fixed_height.url);
                        feelingDiv.append(feelingImage);
                        feelingDiv.append(pT);
                        feelingDiv.append(pR);
    
                    $("#displayGiphy").prepend(feelingDiv);
    
                } // closes for loop
            }); // closes response function
    
    } // closes displayGiphy function
    
    // Toggle between still and animated images
    
    $(document).on("click", ".gif", function(){
        var state = $(this).attr("data-state");
    
        if (state === "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
        } // close if
        else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }; // close else
    }); // close click document
    
    // Create a function to allow user input and add that to the array so a button can be made
    
    $(".submit").on("click", function(){
            // Prevent empty field submission
        if ($.trim($("#feeling-input").val()) === "") {
            alert("You must enter a feeling");
            return false;
        }
        event.preventDefault();
    
    var newFeeling = $("#feeling-input").val().trim();
    
    $("#feeling-input").val(""); // Clears input field on 'enter'
    
   topics.push(newFeeling);

    makeButtons();
    return false; // allows user to hit enter instead of mouse click on submit to generate new button

}) // closes click button function

// Display the giphy images onto the page in the <div displayGiphy>

$(document).on("click", ".feeling", displayArea);

}); // closes document ready