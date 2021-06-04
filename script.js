function dodajEl(alb, images)
{
    let div = $("<div class='row mt-4 justify-content-center'>");
    if(images)
    {
        let divS = $("<div class='col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-1'>");
        let loading = $('<div>').addClass('loader');
        let image = $('<img/>', {src: images.images[0].thumbnails['small']});
        image.on('load', () => {loading.hide();});
        divS.append(image).append(loading);
        div.append(divS);
    }
    else
    {
        div.append("<br>");
    }
    let divB = $("<div class='col-sm-12 col-md-2'>");
    divB.append($('<input>').attr(
        {   type: 'button',
            class: 'btn btn-primary btn-sm',
            value: alb.title + ", " + alb['artist-credit'][0].name + ", " + alb['track-count'] + " tracks"
        }).click(function(){
            window.location.href = "sorter.html?id=" + alb.id;
        })
        );

    div.append(divB);
    $("#slike").prepend(div);
    $("#loadingTxt").remove();
}

$("#confirm").click(() => {
    let q = "";
    let stAlb = 8;
    if($("#album").val()){
        q = `release:${$("#album").val()}`;
    }
    if($("#artist").val())
    {
        if(q){
            q += " AND ";
            stAlb = 2;
        }
        q += `artist:${$("#artist").val()}`;
    }

    $("#slike").empty();
    $("#slike").append("<div id='loadingTxt' class='row justify-content-center'><p>Loading...</p></div>");
    let obj = {
        query: q,
        limit: stAlb,
        fmt: "json"
    }
    let urlLink = "https://musicbrainz.org/ws/2/release/?" + $.param( obj );
    $.get(urlLink, (data) => {
        if(data.count == 0)
            $("#loadingTxt").text("No results");
        for(let alb of data.releases)
        {
            $.get("https://coverartarchive.org/release/" + alb.id, (images, err) => {
                dodajEl(alb, images);
            }).fail(function(){dodajEl(alb, false)});
        }
    })
})

function pressEnter(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("confirm").click();
    }
}

$("#album").keyup(pressEnter);
$("#artist").keyup(pressEnter);