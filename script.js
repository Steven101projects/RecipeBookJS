const levelOpt = document.getElementById("level");
const typesOpt = document.getElementById("types");
const mealsOpt = document.getElementById("meals");

const selectionBoxes = document.querySelectorAll(".selectionBox");

console.log("Hi! This is RecipeBook JS by Nico Castro.");

levelOpt.addEventListener("click", () => {
   document.getElementById("levelOptions").style.display = "block";
   document.getElementById("typeOptions").style.display = "none";
   document.getElementById("mealOptions").style.display = "none";
});

typesOpt.addEventListener("click", () => {
   document.getElementById("typeOptions").style.display = "block";
   document.getElementById("levelOptions").style.display = "none";
   document.getElementById("mealOptions").style.display = "none";
});

mealsOpt.addEventListener("click", () => {
   document.getElementById("mealOptions").style.display = "block";
   document.getElementById("levelOptions").style.display = "none";
   document.getElementById("typeOptions").style.display = "none";
});

selectionBoxes.forEach(box => {
box.addEventListener("mouseleave", function(){
   document.getElementById("mealOptions").style.display = "none";
   document.getElementById("levelOptions").style.display = "none";
   document.getElementById("typeOptions").style.display = "none";
});

});

function openModal() {
  document.body.classList.add("no-scroll");
}

function closeModal() {
  document.body.classList.remove("no-scroll");
}

function darkenHexColor(hex, percent) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  r = Math.max(0, Math.floor(r * (1 - percent)));
  g = Math.max(0, Math.floor(g * (1 - percent)));
  b = Math.max(0, Math.floor(b * (1 - percent)));

  return `rgb(${r}, ${g}, ${b})`;
}

var loadedRecipes = [];

fetch("recipeBook.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to load file");
    }
    return response.json();
  })
  .then(data => {
    
    for(const d of data.recipes){
      loadedRecipes.push(d);
    }

    console.log(loadedRecipes);
    ViewRecipes(loadedRecipes);
  })
  .catch(error => {
    console.error(error);
  });

let goBackBut = document.querySelector(".goBackButton");

let modalPage = document.querySelector("#modal");

goBackBut.querySelector("p").addEventListener("click", () => {
   modalPage.style.display = "none";
   document.body.classList.remove("openModal");
})


function ViewRecipes(recipes){
  document.querySelector(".foodGrid").innerHTML = "";
   for(const r of recipes){
      var foodTray = document.createElement("div");
      foodTray.classList.add("food");
      var title = document.createElement("span");
      title.textContent = r.title;
      foodTray.appendChild(title);
      foodTray.style.backgroundColor = r.themeHexColor;
      foodTray.style.borderBlockColor = darkenHexColor(r.themeHexColor, 0.2);

      document.querySelector(".foodGrid").append(foodTray);

      foodTray.addEventListener("click", () => {

         modalPage.style.display = "flex";
         document.body.classList.add("openModal");

         document.querySelector(".titleContent").textContent = r.title;
         document.querySelector(".subtitleContent").textContent = r.subtitle;
         document.querySelector(".mealContent").textContent = r.meal;
         document.querySelector(".levelContent").textContent = r.level;
         document.querySelector(".typeContent").textContent = r.type;
         document.querySelector(".ingredientsContent").textContent = r.ingredients;
         let steps = r.steps;
         document.querySelector(".stepsContent").textContent = "";
         steps.forEach(step => {
            let li = document.createElement("li");
            li.textContent = step;
            document.querySelector(".stepsContent").append(li);
         })
         document.querySelector(".disclaimerContent").textContent = r.disclaimer;
      })

   }
}


const levelOptions = document.getElementById("levelOptions").querySelectorAll("li");
const typeOptions = document.getElementById("typeOptions").querySelectorAll("li");
const mealOptions = document.getElementById("mealOptions").querySelectorAll("li");


function Sorting(){

  for(const l of levelOptions){

    var sortedRecipes = [];

    l.addEventListener("click", () => {
      if(l.innerHTML === "Show All"){
        console.log(l.innerHTML)
        ViewRecipes(loadedRecipes);
        return;
      }
      sortedRecipes = loadedRecipes.filter(recipe => recipe.level === l.innerHTML);
      ViewRecipes(sortedRecipes);
    })
  }

  for(const t of typeOptions){
          if(l.innerHTML === "Show All"){
        console.log(l.innerHTML)
        ViewRecipes(loadedRecipes);
        return;
      }
    t.addEventListener("click", () => {
      sortedRecipes = loadedRecipes.filter(recipe => recipe.type === t.innerHTML);
      ViewRecipes(sortedRecipes);
    })
  }
  for(const m of mealOptions){
          if(l.innerHTML === "Show All"){
        console.log(l.innerHTML)
        ViewRecipes(loadedRecipes);
        return;
      }
    m.addEventListener("click", () => {
      sortedRecipes = loadedRecipes.filter(recipe => recipe.meal === m.innerHTML);
      ViewRecipes(sortedRecipes);
    })
  }
};

Sorting();

let searchBar = document.querySelector(".searchBar");

searchBar.addEventListener("input", () => {

  
  const searchInput = searchBar.value.trim().toLowerCase();

  const result = loadedRecipes.filter(recipe => recipe.title.toLowerCase().includes(searchInput));

  ViewRecipes(result);
});