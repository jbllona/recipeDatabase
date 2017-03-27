var database;
var ref;
var counter = 0;

$(document).ready(function() 
    { 
		var config = {
		  apiKey: "AIzaSyACam3I8ettEUKP4xQGq3qhn-777tNTecE",
		  authDomain: "my-awesome-project-3a104.firebaseapp.com",
		  databaseURL: "https://my-awesome-project-3a104.firebaseio.com",
		  storageBucket: "my-awesome-project-3a104.appspot.com",
		  messagingSenderId: "743850282820"
		};

		firebase.initializeApp(config);
		database = firebase.database();
		ref = database.ref('recipes');
		
		// Create a reference with an initial file path and name
		var storage = firebase.storage();
		

		
		
		ref.once("value", function(dataSnapshot) {
  			dataSnapshot.forEach(function(childSnapshot)
			{
				var recipeData = childSnapshot.val();
				
				var tableBody = document.getElementById("recipeTableBody");
				var row = tableBody.insertRow(0);
				row.onclick = function(herro)
				{
					var storage = firebase.storage();
					var pathReference = storage.ref(recipeData.fileName +'.pdf');
					
					pathReference.getDownloadURL().then(function(url)
					{
						window.open(url);
					});
					
				};
				row.insertCell(0).innerHTML = recipeData.name;
				row.insertCell(1).innerHTML = recipeData.mealType;
				row.insertCell(2).innerHTML = recipeData.typeOfDish;
				row.insertCell(3).innerHTML = recipeData.mainIngredient;
				row.insertCell(4).innerHTML = recipeData.region;
				row.insertCell(5).innerHTML = recipeData.source;
				row.insertCell(6).innerHTML = recipeData.comments;
				// console.log((++counter) + " " + recipeData.name);
			});
			$("#myTable").tablesorter(); 
		});
		

        
    } 
); 


    
	  
function getDataFromFile()
{
	var fileInput = document.getElementById("fileInput");

		var file = fileInput.files[0];

		var reader = new FileReader();
		try {
			reader.readAsText(file);
			reader.onload = function(event){
			var data = event.target.result;
			var CSVarray = $.csv.toArrays(data);
			sendData(CSVarray);
			}
		} catch (e) {
			console.log(e);
		}


}

function sendData(CSVarray)
{	

	for(var i = 0; i < CSVarray.length; i++){
		
		var data = {
			name: CSVarray[i][0],
			mealType: CSVarray[i][1],
			typeOfDish: CSVarray[i][2],
			mainIngredient: CSVarray[i][3],
			region: CSVarray[i][4],
			fileName: CSVarray[i][5],
			source: CSVarray[i][6],
			comments: CSVarray[i][7]
		}
		console.log(data);
		ref.child(data.name).transaction(function(currentData){
			return data;
		});
	}
}
