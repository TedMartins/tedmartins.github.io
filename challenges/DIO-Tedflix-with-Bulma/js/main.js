$(document).ready(function() {
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        loop:true,
        margin:0,
    });

    $(document.documentElement).keyup(function(event) {    
        if (event.keyCode == 37) { /*left key*/
            owl.trigger('prev.owl.carousel', [700]);
        } else if (event.keyCode == 39) { /*right key*/
            owl.trigger('next.owl.carousel', [700]);
        }
    });
});

var headerChange = document.getElementById('video');
var description = '';

function clickChange(action) {
    switch (action) {
        case '00':
            {   
                description = `<div class="main-wrapper-00"><div class="main-video-00"><div class="wrapper"><h3 class="title">O DILEMA DAS REDES</h3><p class="description">Especialistas em tecnologia e profissionais da área fazem um alerta: as redes sociais podem ter um impacto devastador sobre a democracia e a humanidade.</p><button onclick="playVideo('v-00')" role="button" class="button"><i id="mr" class="fas fa-play"></i>ASSISTIR AGORA</button><button onclick="showInfo('i-00')" role="button" class="button"><i id="mr" class="fas fa-info-circle"></i>MAIS INFORMAÇÕES</button></div></div><div class="main-continue-00"><div id="continue-00"><div id="player"></div></div></div></div>`;
                break;
            }
        case '01':
            {
                description = '<div class="main-video-01" id="video"><div class="wrapper"><h3 class="title">BREAKING BAD</h3><p class="description">Após descobrir que tem câncer, um professor começa a produzir metanfetamina para garantir o futuro de sua família, mudando o destino de todos ao seu redor.</p><button role="button" class="button"><i id="mr" class="fas fa-play"></i>ASSISTIR AGORA</button><button role="button" class="button"><i id="mr" class="fas fa-info-circle"></i>MAIS INFORMAÇÕES</button></div></div>';
                break;
            }
        case '02':
            {
                description = "Here the new content case B...";
                break;
            }
        case '03':
            {
                description = "Here the new content case B...";
                break;
            }
        case '04':
            {
                description = "Here the new content case B...";
                break;
            }
        case '05':
            {
                description = "Here the new content case B...";
                break;
            }
        case '06':
            {
                description = "Here the new content case B...";
                break;
            }
    }
    headerChange.innerHTML = description;
}

var videoChange = document.getElementById('continue-00');
var player = '';

function playVideo(action) {
    switch (action) {
        case 'v-00':
            {
                player = '<iframe class="player" src="https://www.youtube.com/embed/xRJTx66HYt4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                break;
            }
        case '01':
            {
                player = '<div class="main-video-01" id="video"><div class="wrapper"><h3 class="title">BREAKING BAD</h3><p class="description">Após descobrir que tem câncer, um professor começa a produzir metanfetamina para garantir o futuro de sua família, mudando o destino de todos ao seu redor.</p><button role="button" class="button"><i id="mr" class="fas fa-play"></i>ASSISTIR AGORA</button><button role="button" class="button"><i id="mr" class="fas fa-info-circle"></i>MAIS INFORMAÇÕES</button></div></div>';
                break;
            }
        case '02':
            {
                player = "Here the new content case B...";
                break;
            }
    }
    videoChange.innerHTML = player;
}

var infoChange = document.getElementById('continue-00');
var info = '';

function showInfo(action) {
    switch (action) {
        case 'i-00':
            {
                info = '<p>Info</p>';
                break;
            }
        case '01':
            {
                info = '<div class="main-video-01" id="video"><div class="wrapper"><h3 class="title">BREAKING BAD</h3><p class="description">Após descobrir que tem câncer, um professor começa a produzir metanfetamina para garantir o futuro de sua família, mudando o destino de todos ao seu redor.</p><button role="button" class="button"><i id="mr" class="fas fa-play"></i>ASSISTIR AGORA</button><button role="button" class="button"><i id="mr" class="fas fa-info-circle"></i>MAIS INFORMAÇÕES</button></div></div>';
                break;
            }
        case '02':
            {
                info = "Here the new content case B...";
                break;
            }
    }
    infoChange.innerHTML = info;
}



