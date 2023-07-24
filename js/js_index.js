var siteNameInput = document.getElementById("siteNameInput");
var siteUrlInput = document.getElementById("siteUrlInput");
var searchId = document.getElementById("searchId");

var globalUpdateIndex = 0;

var productsContainer;
if(localStorage.getItem("myProducts") == null)
{
	productsContainer = [];
}
else
{
	productsContainer = JSON.parse(localStorage.getItem("myProducts"));
	displayProducts();
}

function addProduct(){
	
	var product = {
		name: siteNameInput.value,
		Url: siteUrlInput.value,
	};
	productsContainer.push(product);
	
	localStorage.setItem("myProducts" , JSON.stringify (productsContainer));

	clearForm();

	displayProducts();

}

function clearForm()
{
	siteNameInput.value = "";
	siteUrlInput.value = "";
}

function displayProducts()	//وانت جابت هنا htmlده اللي المروض اكتب في ال
{
	var cartoona = ``;
	
	for (var i= 0; i < productsContainer.length; i++ )
	{
		cartoona +=`
						<div class="row btnvisitWDelete">
							<div class="col">
								<h2>`+productsContainer[i].name+`</h2>
							</div>
					
							<div class="col">
								<a href=`+productsContainer[i].Url+` target="_blank" class="visit text-decoration-none">visit</a>
								<button onclick="deleteProduct(`+i+`)" class="btn btn-danger">Delete</button>
								<button onclick="updateBook(`+i+`)" class=" btn btn-warning">Update</button>
							</div>
						</div>`;
	}
	document.getElementById("rowBody").innerHTML = cartoona;
};

function deleteProduct(ProductIndexDelete)
{
	productsContainer.splice(ProductIndexDelete,1);
	
	localStorage.setItem("myProducts" , JSON.stringify (productsContainer));
	
	displayProducts();
}

//Update
function updateBook(index){
	globalUpdateIndex = index;	
	siteNameInput.value = productsContainer[index].name	
	siteUrlInput.value = productsContainer[index].Url
	
	document.querySelector(".addUpdate").style.display = "none";
	document.querySelector(".buttonUpdate").classList.remove ("d-none");
}

function updateNow() {
	productsContainer[globalUpdateIndex].name = siteNameInput.value 
	productsContainer[globalUpdateIndex].Url = siteUrlInput.value

	displayProducts();
	clearForm();
	localStorage.setItem("myProducts" , JSON.stringify (productsContainer));
	
	document.querySelector(".addUpdate").style.display = "inline-block";
	document.querySelector(".buttonUpdate").classList.add ("d-none");
}

/*
//Search
function Search(searchTerm){
	
	var cartunaSearch = ``;

	for(var i=0 ; i < productsContainer.length ; i++)
	{
		if( (productsContainer[i].name).toLowerCase().includes(searchTerm.toLowerCase()) 
			|| 
			(productsContainer[i].Url).toLowerCase().includes(searchTerm.toLowerCase())
		)
			{
				cartunaSearch +=`
					<div class="row btnvisitWDelete">
						<div class="col">
							<h2>`+productsContainer[i].name+`</h2>
						</div>
				
						<div class="col">
							<a href=`+productsContainer[i].Url+` target="_blank" class="visit text-decoration-none mr-2">visit</a>
							<button onclick="deleteProduct(`+i+`)" class="btn btn-danger">Delete</button>
							<button onclick="updateBook(`+i+`)" class=" btn btn-warning">Update</button>
						</div>
					</div>`;
			}
	}
	document.getElementById("rowBody").innerHTML = cartunaSearch;
}
*/

// Search
searchId.addEventListener("keyup", function(){
	
	
	var cartunaSearch = ``;

	for(var i=0 ; i < productsContainer.length ; i++)
	{
		if( (productsContainer[i].name).toLowerCase().includes(searchId.value.toLowerCase()) 
			|| 
			(productsContainer[i].Url).toLowerCase().includes(searchId.value.toLowerCase())
		)
			{
				cartunaSearch +=`
					<div class="row btnvisitWDelete">
						<div class="col">
							<h2>`+productsContainer[i].name+`</h2>
						</div>
				
						<div class="col">
							<a href=`+productsContainer[i].Url+` target="_blank" class="visit text-decoration-none mr-2">visit</a>
							<button onclick="deleteProduct(`+i+`)" class="btn btn-danger">Delete</button>
							<button onclick="updateBook(`+i+`)" class=" btn btn-warning">Update</button>
						</div>
					</div>`;
			}
	}
	document.getElementById("rowBody").innerHTML = cartunaSearch;
	
});

// Validation => Regx
function NameInput() {

	var rgx = /^[a-zA-Z0-9]{0,15}$/

	if(rgx.test(siteNameInput.value) == true ) {
		siteNameInput.classList.add("is-valid");
		siteNameInput.classList.remove("is-invalid"); 
		
		userNameAlert.classList.replace("d-block" , "d-none");
		return true;
	}
	
	
	else {
		siteNameInput.classList.add("is-invalid");
		siteNameInput.classList.remove("is-valid");
		
		userNameAlert.classList.replace("d-none" , "d-block");
		return false;
	}
}
siteNameInput.addEventListener("keyup" , NameInput);


function UrlInput() {

	var rgx = /^(https:\/\/)?(www\.)?[a-zA-Z0-9_\.]{1,}\.[a-zA-Z]{3}$/

	if(rgx.test(siteUrlInput.value) == true ) {
		siteUrlInput.classList.add("is-valid");
		siteUrlInput.classList.remove("is-invalid"); 
		
		userNameAlert.classList.replace("d-block" , "d-none");
		return true;
	}
	
	
	else {
		siteUrlInput.classList.add("is-invalid");
		siteUrlInput.classList.remove("is-valid");
		
		userNameAlert.classList.replace("d-none" , "d-block");
		return false;
	}
}
siteUrlInput.addEventListener("keyup" , UrlInput);

function searchInput() {

	var rgx = /^[a-zA-Z0-9]{0,15}$/

	if(rgx.test(searchId.value) == true ) {
		searchId.classList.add("is-valid");
		searchId.classList.remove("is-invalid"); 
		
		userNameAlert.classList.replace("d-block" , "d-none");
		return true;
	}
	
	
	else {
		searchId.classList.add("is-invalid");
		searchId.classList.remove("is-valid");
		
		userNameAlert.classList.replace("d-none" , "d-block");
		return false;
	}
}
searchId.addEventListener("keyup" , searchInput);

