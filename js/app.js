const searchPlayer = () => {
    const inputField = document.getElementById('input-field').value;
    console.log(inputField);

    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${inputField}`;

    fetch(url)
    .then(res => res.json())
    .then(data => displayPlayer(data.player[0]))

}

const displayPlayer = data => {
    console.log(data);
    const showPlayer = document.getElementById('ShowPlayer');

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
                <div class="badge badge-outline">${data.strPosition}</div> 
                <div class="badge badge-outline">${data.strNationality} </div>
          </div>
          <div class="mt-6 card-actions justify-end">
            <button class="btn btn-primary">More info</button>
          </div>
        </div>
    `;

    showPlayer.appendChild(div);

}