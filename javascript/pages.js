$('.botao-pagina').click(function() {
    let destino = $(this).data('destino');
    let modo;
    $.ajax({
        url: 'modos.json',
        dataType: 'json',
        success: function(res) {
            criaPagina(res[destino]);
        }
    });
});

let game;
function criaPagina(modo) {
    let $main = $('main');
    $main.html('');
    if(!modo) return;
    let $log = $('<p id="log">Vez do Usuário</p>');
    $main.append($log);
    let $tabuleiro = $('<div id="tabuleiro"></div>');
    let gridTemplateColumns = "";
    for(let i = 0; i < modo.tabuleiro.colunas; i++)
        gridTemplateColumns += 'auto ';
    $tabuleiro.css('grid-template-columns', gridTemplateColumns);

    let larguraMain = parseFloat($main.css('width' ));
    let alturaMain  = parseFloat($main.css('height'));
    let tamTabuleiro, tamCasa;
    if(alturaMain * 0.75 <= larguraMain * 0.95) {
        tamTabuleiro = alturaMain * 0.75 + 'px';
        tamCasa = alturaMain * 0.75 / modo.tabuleiro.linhas + 'px';
    } else {
        tamTabuleiro = larguraMain * 0.95 + 'px';
        tamCasa = larguraMain * 0.95 / modo.tabuleiro.linhas + 'px';
    }
    $tabuleiro.css('width' , tamTabuleiro);
    $tabuleiro.css('height', tamTabuleiro);
    $('.casa').css('width' , tamCasa);
    $('.casa').css('height', tamCasa);
    setTimeout(function() { $('.casa > span').css('font-size', tamCasa); }, 1);
    for(let i = 0; i < modo.tabuleiro.linhas; i++) {
        for(let j = 0; j < modo.tabuleiro.colunas; j++) {
            let $casa = $('<div class="casa"></div>');
            $casa.append($('<span></span>'));
            if(!i) $casa.css('border-top-width', '0');
            if(!j) $casa.css('border-left-width', '0');
            $tabuleiro.append($casa);
        }
    }
    $main.append($tabuleiro);

    game = new Game(modo);
}