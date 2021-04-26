

$("#confirm").click(() => {
    
    $("#slike").empty();
    let obj = {
        query: `release:${$("#album").val()} AND artist:${$("#artist").val()}`,
        limit: 5,
        fmt: "json"
    }
    let urlLink = "https://musicbrainz.org/ws/2/release/?" + $.param( obj );
    console.log(urlLink);
    $.get(urlLink, (data) => {
        for(let alb of data.releases)
        {
            console.log(alb);
            $.get("https://coverartarchive.org/release/" + alb.id, (images, err) => {
                if(images.status!=404)
                {
                    let div = $("<div>");
                    div.append($('<img/>').attr(
                        {src: images.images[0].thumbnails['small']}
                    ));
                    div.append($('<input>').attr(
                        {   type: 'button',
                            value: alb.title + ", " + alb['artist-credit'][0].name + ", " + alb['track-count'] + " tracks"
                        }).click(function(){
                            window.location.href = "sorter.html?id=" + alb.id;
                        })
                        );
                    // let potSlike = `<div><img src=${images.images[0].thumbnails['small']}></div>`;
                    // console.log(potSlike);
                    $("#slike").append(div);
                }
            });
        }
    })
})