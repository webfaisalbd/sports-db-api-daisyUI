const searchPlayer = () => {
    const inputField = document.getElementById('input-field').value;
    console.log(inputField);

    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${inputField}`;

    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data.player[0]))

}