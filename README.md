### Sports DB API

# Player Name by search `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=messi`

# Player Details by Id `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=34146370`


# DaisyUI cdn connected html file

```javascript
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/daisyui@2.15.2/dist/full.css" rel="stylesheet" type="text/css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            clifford: '#da373d',
          }
        }
      }
    }
  </script>
</head>
<body>
  <h1 class="text-3xl text-orange-500 text-center font-bold">
    Sports DB API
  </h1>

  

  <script src="js/app.js"></script>
</body>
</html>
```







# index.html file

```javascript
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/daisyui@2.15.2/dist/full.css" rel="stylesheet" type="text/css" />
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            clifford: '#da373d',
          }
        }
      }
    }
  </script>
</head>
<body>
  <h1 class="text-3xl text-orange-500 text-center font-bold mt-8 mb-8">
    Sports DB API
  </h1>

  <!-- input field  -->
  <div style="margin:auto" class="form-control w-64">
    <div class="input-group">
      <input id="input-field" type="text" placeholder="Search…" class="input input-bordered" />
      <button onclick="searchPlayer()" class="btn btn-square">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </button>
    </div>
  </div>


  <!-- secondly, display more info, after clicking the more info button  -->
  <div id="showInfo" class="mt-6 container mx-auto px-16">
    
  </div>


  <!-- first show the player  -->
  <div id="showPlayer" class="mt-6 container mx-auto px-16">
    
  </div>






  <script src="js/app.js"></script>
</body>
</html>
```












# app.js file

```javascript
const searchPlayer = () => {


  // toggle display 
  toggleDisplay('none');
  document.getElementById('showInfo').style.display = 'none';


  const inputField = document.getElementById('input-field').value;
  document.getElementById('input-field').value = '';
  // console.log(inputField);





  const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${inputField}`;

  fetch(url)
    .then(res => res.json())
    .then(data => displayPlayer(data.player[0]))

}


// toggle display
const toggleDisplay = displayValue => {
  document.getElementById('showPlayer').style.display = displayValue;
}




const displayPlayer = data => {
  // console.log(data);
  const showPlayer = document.getElementById('showPlayer');


  // toggle display
  toggleDisplay('block');
  document.getElementById('showInfo').style.display = 'none';



  const div = document.createElement('div');
  div.classList.add('card');
  div.classList.add('lg:card-side');
  div.classList.add('bg-base-100');
  div.classList.add('shadow-xl');
  // div.classList.add('');

  div.innerHTML = `
    <figure><img src="${data.strThumb}" alt="Album"></figure>
        <div class="card-body">
          <h2 class="card-title">${data.strPlayer}</h2>
          <p>${data.strDescriptionEN.slice(0, 400)}............</p>
          <div class="card-actions justify-end">
                <div class="badge badge-outline badge badge-secondary hover:bg-lime-500 p-4">${data.strPosition}</div> 
                <div class="badge badge-outline badge badge-primary hover:bg-lime-500 p-4">${data.strNationality} </div>
          </div>
          <div class="mt-6 card-actions justify-end">
            <button onclick='moreInfo(${data.idPlayer})' class="btn btn-primary">More info</button>
          </div>
        </div>
    `;

  showPlayer.appendChild(div);

}


const moreInfo = (id) => {
  const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => showMoreInfo(data.players[0]));
}


const showMoreInfo = (data) => {


  // toggle display 
  toggleDisplay('none');
  document.getElementById('showInfo').style.display = 'block';


  // console.log(data);
  const showInfo = document.getElementById('showInfo');

  const div = document.createElement('div');
  // how to add style in dom createElement
  // div.style.backgroundColor = 'lightblue'
  div.style.backgroundImage = `url(${data.strThumb})`;
  div.classList.add('hero');
  div.classList.add('min-h-screen');


  div.innerHTML = ` 
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-center text-neutral-content">
      
      <div class="card-body">
          <h2 class="card-title">${data.strPlayer}</h2>
          <p>${data.strDescriptionEN.slice(0, 600)}.</p>

          <div>
          <div class="p-3 m-2 badge badge-primary">Birth: ${data.dateBorn}</div>
          <div class="p-3 m-2 badge badge-primary">Nationality: ${data.strNationality}</div>
          <div class="p-3 m-2 badge badge-primary">Date Signed: ${data.dateSigned}</div>
          <div class="p-3 m-2 badge badge-primary">Gender: ${data.strGender}</div>
          <div class="p-3 m-2 badge badge-primary">Leg: ${data.strSide}</div>
          <div class="p-3 m-2 badge badge-primary">Position: ${data.strPosition}</div>
          <div class="p-3 m-2 badge badge-primary">Height: ${data.strHeight}</div>
          <div class="p-3 m-2 badge badge-primary">Weight: ${data.strWeight}</div>
          <div class="p-3 m-2 badge badge-primary">Facebook: ${data.strFacebook}</div>
          </div>
          
    
        </div>
    </div>
    `;


  showInfo.appendChild(div);
}
```