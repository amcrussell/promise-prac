
function getChirps() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/api/chirps/",
        dataType: 'JSON'
    }).done(chirps => {
        $('.chirpContainer').empty();
        Object.entries(chirps).forEach(chirp => {
            if (chirp[1].user && chirp[1].text)
                createChirp(chirp[1].user, chirp[1].text, chirp[0]);
        });
    });
}

$(document).ready(() => getChirps());

$('.submit').on('click', (e) => {

    e.preventDefault();
    if (!($('.chirpUser').val() && $('.chirpText').val()))
        return
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/api/chirps/",
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({ user: $('.chirpUser').val(), text: $('.chirpText').val() }),
    }).done((res) => {
        console.log(res)
    });
    getChirps();
    $('.chirpUser').val('');
    $('.chirpText').val('');


})

function createChirp(user, text, id) {
    let chirp = $(chirpContents(user, text, id))

    chirp.on('click', '#close', e => {
        chirp.remove();
        $.ajax({
            type: "DELETE",
            url: "http://localhost:3000/api/chirps/" + id,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    }).on('click', e => {
        if (e.target.id === 'close') return;

        let modal = $('#modal');
        let closeModal = $('#submitModal');

        modal.css('display', 'absolute');

        closeModal.one('click', e => {
            getChirps();
            $('#userModal').val('');
            $('#textModal').val('');
        });

    })
    chirp.appendTo('.chirpContainer')
}


function chirpContents(user, text, id) {

    return (`
        <div data-modal-target="authentication-modal"  id=${id} class="container col-4">
            <img id="close" src="images/close.png" alt="delete chirp" class="close" style="width: 15px"/>
            <div class="flex-column chirpBody">
                <h1 id="chirpUserInline" class="border text-xl">@${user}</h1>
                <p id="chirpTextInline" class="chirpText">${text}</p>
                <small class="">${new Date()}</small>
            </div>
        </div>
        `)

}