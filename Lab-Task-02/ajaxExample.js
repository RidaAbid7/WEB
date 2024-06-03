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
    console.log("Delete button clicked");
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
    
    // Fetching values from the form
    let storyId = $("#storyId").val(); // Use a hidden input for story ID
    var title = $("#createTitle").val();
    var content = $("#createContent").val();

    // Determine the method based on whether a storyId exists
    let method = storyId ? "PUT" : "POST";
    // Construct the URL accordingly
    let url = storyId ? `https://usmanlive.com/wp-json/api/stories/${storyId}` : "https://usmanlive.com/wp-json/api/stories";

    $.ajax({
        url: url,
        method: method,
        data: JSON.stringify({ title: title, content: content }), // Use JSON.stringify to send data
        contentType: "application/json", // Specify content type
        success: function() {
            displayStories();
            
            $("#createTitle").val("");
            $("#createContent").val("");
            $("#storyId").val(""); 
            
            $("#createBtn").text("Create");

            // Hide the clear button
            $("#clearBtn").hide();
        },
        error: function(error) {
            console.error("Error creating/updating story:", error);
        },
    });
}

function editStory() {
    console.log("Edit button clicked");
    let storyId = $(this).attr("data-id");
    $.ajax({
        url: `https://usmanlive.com/wp-json/api/stories/${storyId}`,
        method: "GET",
        success: function(data) {
            $("#createTitle").val(data.title);
            $("#createContent").val(data.content);
            $("#storyId").val(data.id);
            $("#createBtn").text("Update");
            $("#clearBtn").show(); // Show the clear button here
        },
        error: function(error) {
            console.error("Error fetching story for edit:", error);
        },
    });
}

$(document).ready(function() {
    displayStories(); 

    $(document).on("click", ".btn-del", deleteStory);
    $(document).on("click", ".btn-edit", editStory);

    $("#createForm").on("submit", handleFormSubmission);

    // Example of a clear function to reset the form, assuming you have a clear button
    $("#clearBtn").click(function(e) {
        e.preventDefault();
        $("#createTitle").val("");
        $("#createContent").val("");
        $("#storyId").val("");
        $("#createBtn").text("Create");
        $("#clearBtn").hide(); // Hide the clear button
    });

    // Hide the clear button initially
    $("#clearBtn").hide();
});
