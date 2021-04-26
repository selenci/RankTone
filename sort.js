let levi = 0, desni = 1, curr;
let pesmi = [];
var queries = {};
let val = 0;
let cnt = 0;
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

    zacniSort();
})

async function zacniSort(){
    await quickSort(pesmi, 0, pesmi.length - 1);
    izpis();
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
async function paPridobimoToSpremenljivko(a, b){
    if(a == b)
        return 0;
    ++cnt;
    $("#levi").text(a);
    $("#desni").text(b);
    while(!val)
        await sleep(100);
    let v = val;
    val = 0;
    return v;
}

async function partition(items, left, right) {
    let pivot = items[right];
    let i = left - 1;
    for(let j = left; j <= right; ++j)
    {
        let value = await paPridobimoToSpremenljivko(pesmi[j], pivot);
        if(value < 0)
        {
            ++i;
            swap(pesmi, i, j);
        }
        console.log(pesmi);
    }
    swap(pesmi, i+1, right);
    return i+1;
}

async function quickSort(items, left, right) {
    var index;
    console.log("jaz ga sortam");
    if (left < right) {
        index = await partition(items, left, right); //index returned from partition
        console.log(index);
        await quickSort(items, left, index - 1);
        await quickSort(items, index + 1, right);
    }
    return items;
}

function izpis(){
    let i = 1;
    for(let song of pesmi)
    {
        $("#pesmi").append(`${i}. ${song}<br>`);
        ++i;
    }
    $("#pesmi").append(`Number of comparisons: ${cnt}`);
}