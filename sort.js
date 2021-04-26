let levi = 0, desni = 1, curr;
let pesmi = [];
var queries = {};
let val = 0;
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
    quickSort(pesmi, 0, pesmi.length - 1);
})

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
async function paPridobimoToSpremenljivko(){
    while(!val)
        await sleep(100);
    let v = val;
    val = 0;
    return v;
}

async function partition(items, left, right) {
    var pivot   = items[Math.floor((right + left) / 2)], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        $("#levi").text(pesmi[i]);
        $("#desni").text(pivot);
        let value = await paPridobimoToSpremenljivko();
        while (value > 0) {
            i++;
            $("#levi").text(pesmi[i]);
            $("#desni").text(pivot);
            value = await paPridobimoToSpremenljivko();
        }
        $("#levi").text(pivot);
        $("#desni").text(pesmi[j]);
        value = await paPridobimoToSpremenljivko();
        while (value > 0) {
            j--;
            $("#levi").text(pivot);
            $("#desni").text(pesmi[j]);
            value = await paPridobimoToSpremenljivko();
        }
        if (i <= j) {
            swap(items, i, j); //sawpping two elements
            i++;
            j--;
        }
        console.log(pesmi);
    }
    return i;
}

function quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(items, index, right);
        }
    }
    izpis();
}

function izpis(){
    for(let song of pesmi)
    {
        $("#pesmi").append(`${song}<br>`);
    }
}