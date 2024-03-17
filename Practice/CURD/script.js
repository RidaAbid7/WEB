// $(function(){
//     $("button").click(handleButton1)
// });

// function handleButton1(e){
//     $.ajax({
//         url: "https://usmanlive.com/wp-json/api/stories",
//         method: "GET",
//         success: function(response){
//             console.log(response);
//         } 
//     });
// } 
// Function to fetch and display stories
   // Define global functions first
function displayStories() {
    $.ajax({
        url: "https://usmanlive.com/wp-json/api/stories",
        method: "GET",
        dataType: "json",
        success: function(data) {
            var storiesList = $("#storiesList");
            storiesList.empty();
            
            $.each(data, function(index, story) {
                storiesList.append(`
                    <div class="mb-3">
                        <h3>${story.title}</h3>
                        <div>${story.content}</div>
                        <div>
                            <button class="btn btn-info btn-sm mr-2 btn-edit" data-id="${story.id}">Edit</button>
                            <button class="btn btn-danger btn-sm btn-del" data-id="${story.id}">Delete</button>
                        </div>
                    </div>
                    <hr />
                `);
            });
        },
        error: function(error) {
            console.error("Error fetching stories:", error);
        },
    });
}

function deleteStory() {
    let storyId = $(this).attr("data-id");
    $.ajax({
        url: `https://usmanlive.com/wp-json/api/stories/${storyId}`,
        method: "DELETE",
        success: function() {
            displayStories(); // Refresh the list after deleting
        },
        error: function(error) {
            console.error("Error deleting story:", error);
        },
    });
}

function handleFormSubmission(event) {
    event.preventDefault();
    let storyId = $("#storyId").val(); // Adjusted to use a hidden input for story ID
    var title = $("#title").val();
    var content = $("#content").val();

    let method = storyId ? "PUT" : "POST";
    let url = storyId ? `https://usmanlive.com/wp-json/api/stories/${storyId}` : "https://usmanlive.com/wp-json/api/stories";

    $.ajax({
        url: url,
        method: method,
        data: { title, content },
        success: function() {
            displayStories(); // Refresh after update/addition
            // Clear form after submission
            $("#title").val("");
            $("#content").val("");
            $("#storyId").val(""); // Ensure the hidden field for the story ID is cleared
            $("#createBtn").text("Create Story"); // Reset button text
        },
        error: function(error) {
            console.error("Error creating/updating story:", error);
        },
    });
}

function editStory() {
    console.log("edit button clicked");
    let storyId = $(this).attr("data-id");
    $.ajax({
        url: `https://usmanlive.com/wp-json/api/stories/${storyId}`,
        method: "GET",
        success: function(data) {
            $("#title").val(data.title);
            $("#content").val(data.content);
            $("#storyId").val(data.id); // Use a hidden input to hold the story ID
            $("#createBtn").text("Update Story");
        },
        error: function(error) {
            console.error("Error fetching story for edit:", error);
        },
    });
}

$(document).ready(function() {
    displayStories(); // Initial display of stories

    $(document).on("click", ".btn-del", deleteStory);
    $(document).on("click", ".btn-edit", editStory);

    $("#createForm").on("submit", handleFormSubmission);

    // Example of a clear function to reset the form, assuming you have a clear button
    $("#clearBtn").click(function(e) {
        e.preventDefault();
        $("#title").val("");
        $("#content").val("");
        $("#storyId").val("");
        $("#createBtn").text("Create Story");
    });
});