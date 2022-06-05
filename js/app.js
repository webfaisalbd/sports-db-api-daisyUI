const searchPlayer = () => {
    const inputField = document.getElementById('input-field').value;
    // console.log(inputField);

    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${inputField}`;

    fetch(url)
    .then(res => res.json())
    .then(data => displayPlayer(data.player[0]))

}

const displayPlayer = data => {
    // console.log(data);
    const showPlayer = document.getElementById('showPlayer');

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
          <p>${data.strDescriptionEN.slice(0,400)}............</p>
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
    console.log(data);
    const showInfo = document.getElementById('showInfo');

    const div = document.createElement('div');
    // div.style.backgroundColor = 'lightblue'
    div.style.backgroundImage = `url(${data.strThumb})`;
    div.classList.add('hero');
    div.classList.add('min-h-screen');


    div.innerHTML = ` 
    <div class="hero-overlay bg-opacity-60"></div>
    <div class="hero-content text-center text-neutral-content">
      
      <div class="card-body">
          <h2 class="card-title">${data.strPlayer}</h2>
          <p>${data.strDescriptionEN.slice(0,600)}.</p>

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