let levi = 0, desni = 1, curr;
let pesmi = [];
var queries = {};
function swap(arr, i, j){
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

$.each(document.location.search.substr(1).split('&'), function (c, q) {
    var i = q.split('=');
    queries[i[0].toString()] = i[1].toString();
});

$.get(`https://musicbrainz.org/ws/2/release/${queries.id}?inc=recordings&fmt=json`,(album) => {
    for(let song of album.media[0].tracks)
    {
        pesmi.push(song.title);
    }
    console.log(pesmi);
    $("#levi").text(pesmi[levi]);
    $("#desni").text(pesmi[1]);
    curr = pesmi[1];
})

function insertion(val)
{
    console.log(levi, desni);
    if(levi >= 0 && val > 0)
    {
        pesmi[levi + 1] = pesmi[levi];
        --levi;
    }
    if(val < 0 || levi < 0)
    {
        pesmi[levi + 1] = curr;
        ++desni;
        levi = desni - 1;

        if(desni < pesmi.length)
            curr = pesmi[desni];
    }

    if(desni >= pesmi.length)
    {
        $("#levi").remove();
        $("#desni").remove();
        izpis();
    }
    else{
        $("#levi").text(pesmi[levi]);
        $("#desni").text(curr);
    }
    console.log(pesmi);
}

function izpis(){
    for(let song of pesmi)
    {
        $("#pesmi").append(`${song}<br>`);
    }
}