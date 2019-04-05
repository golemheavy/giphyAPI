// Initial array of gif search keywords

      var topics = [];

// This function builds a button using a string argument
	function makeButton(str) {
		return `<button class="term">${str}</button>`
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

// Calling the renderButtons function to display the initial list of giphy search terms
	renderButtons();

// This function performs the actual API call
	$(document).on('click', '.term' , function() {
		const APIkey = 'Ti8BvxplJrAjpfUL0ClAKFNhrqpcbIjB' ;
		var term = $(this).text();
		queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIkey + "&q=" + term + "&limit=1&offset=0&rating=G&lang=en"; // note: search term might have spaces in it -- check if this is a problem
	// This function performs the return and formatting of the JSON data returned by the API call
		$.ajax({
			url: queryURL,
			method: "GET"
		}).then(
			function(response) {
				if (typeof response !== "undefined") { //  && typeof response.Poster !== "undefined" && response.Poster !== "N/A") {
					const embedURL = response.data[0].embed_url;
					const gifURL = response.data[0].url;
					
					//console.log(response.data[0].embed_url);
					//console.log(response.data[0].url);
					$("#GIF-view").html(`<div style="width:100%;height:0;padding-bottom:76%;position:relative;"><iframe src="${embedURL}" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="${gifURL}">via GIPHY</a></p>`);
				}
				else {
					alert('That search results in "undefined"'); // does this branch matter?
				}
			});
	  });
///////////////////////////////var myJSON = JSON.stringify(response);
/////////////////////////////////////$("#movie-view").html(myJSON);
/////////////////////////////$("#GIF-view").html(JSON.stringify(response, null, 8).split('\n').join('<br/>').split(' ').join('&nbsp'));
//var myJSON = JSON.stringify(response);

// <div style="width:100%;height:0;padding-bottom:76%;position:relative;"><iframe src="https://giphy.com/embed/oeGgcmHVHLVCg" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/star-wars-clones-oeGgcmHVHLVCg">via GIPHY</a></p>