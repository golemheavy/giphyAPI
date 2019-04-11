// Initial array of gif search keywords

      var topics = ["street fighter","mortal kombat","tekken","smash bros", "virtua fighter", "soulcalibur", "capcom vs marvel", "mortal kombat vs. dc universe"];

// This function builds a button using a string argument
	function makeButton(str) {
		return `<button class="btn btn-primary term">${str}</button>`
	}
      
// Function for displaying buttons for each search term in the array
	function renderButtons() {
		$('#buttons-view').html(topics.map(makeButton));
	}

// This function handles events where one button is clicked
	$("#add-term").on("click", function(event) {
		event.preventDefault(); // apparently this prevents reload of the page upon click
		var newTerm = $("#term-input").val();
		if (newTerm.trim() && !topics.includes(newTerm)) {
			topics.push(newTerm);
			renderButtons();
		}
		else alert("That term is already listed or is blank!");
	});
	
	// This function plays videos or pauses them when they are clicked
	$(document).on('click', '#video' , function() {
		// event.preventDefault(); // apparently this prevents reload of the page upon click
		if (this.paused) this.play();
		else if (!this.paused) this.pause();
	});

// Calling the renderButtons function to display the initial list of giphy search terms
	renderButtons();

// This function performs the actual API call
	$(document).on('click', '.term' , function() {
		$("#GIF-view").empty();
		const APIkey = 'Ti8BvxplJrAjpfUL0ClAKFNhrqpcbIjB' ;
		var term = $(this).text().split(' ').join('+'); // this replaces spaces with plus signs in accordance with the API documentation, even though the API parses spaces correctly
		queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIkey + "&q=" + term + "&limit=10&offset=0&rating=G&lang=en"; 
		$.ajax({  // This function performs the return and formatting of the JSON data returned by the API call
			url: queryURL,
			method: "GET"
		}).then(
			function(response) {
				if (typeof response !== "undefined") { 
					$("#GIF-view").html="";
					for (var x = 0; x < 10; x++) {
						const gifURL = "https://media.giphy.com/media/" + response.data[x].id + "/giphy.mp4";
						const rating = response.data[x].rating;
						$("#GIF-view").append(`<div class="col"><video loop muted playsinline id="video"><source src="${gifURL}" type="video/mp4"></video><p>Rating: ${rating}</p></div>`);
					} 
				}
				else {
					alert('API Connection Error"'); 
				}
			});
	  });