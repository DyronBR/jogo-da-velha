document.addEventListener('DOMContentLoaded', function() {
    const tabuleiro = document.querySelector('.tabuleiro');
    let jogadorAtual = 'X';
    let vencedor = false;
    let contadorX = 0;
    let contadorO = 0;
    let contadorEmpate = 0; 
    let contadorJogadas = 0;

    // Função para alternar a vez de jogar entre X e O
    function alternarVezDeJogar() {
        jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
    }

    // Função para atualizar o elemento que mostra de quem é a vez de jogar
    function atualizarVezDeJogar() {
        const jogadorAtualElement = document.getElementById('vez-de-jogar');
        jogadorAtualElement.innerHTML = `É a vez de <span class="jogador-atual">${jogadorAtual}</span> jogar`;
    }

    // Chamada inicial para atualizar a vez de jogar
    atualizarVezDeJogar();

    // Função para ocultar a mensagem de vez de jogar
    function ocultarVezDeJogar() {
        const vezDeJogar = document.getElementById('vez-de-jogar');
        vezDeJogar.style.display = 'none';
    }

    // Função para exibir a mensagem de vitória
    function exibirMensagemVitoria(mensagem) {
        const mensagemVitoria = document.getElementById('mensagem-vitoria');
        mensagemVitoria.textContent = mensagem;
    }

    // Função para atualizar o placar de vitórias de acordo com o vencedor
    function atualizarPlacar() {
        if (vencedor) {
            if (jogadorAtual === 'X') {
                contadorX++;
                document.getElementById('placar-x').textContent = contadorX;
            } else {
                contadorO++;
                document.getElementById('placar-o').textContent = contadorO;
            }
        } else {
            contadorEmpate++; // Incrementa o contador de empates
            document.getElementById('placar-empate').textContent = contadorEmpate; // Atualiza o placar de empates
        }
    }

    // Cria as células do tabuleiro
    for (let i = 0; i < 9; i++) {
        const celula = document.createElement('div');
        celula.classList.add('celula');
        celula.dataset.index = i;
        celula.addEventListener('click', () => handleCelulaClick(celula));
        tabuleiro.appendChild(celula);
    }

    // Função para lidar com o clique em uma célula
    function handleCelulaClick(celula) {
        if (!celula.textContent && !vencedor)  {
            celula.textContent = jogadorAtual;
            checkVencedor();
            jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
            atualizarVezDeJogar();
            contadorJogadas++;
        }
    }

    // Função para verificar se houve um vencedor
    function checkVencedor() {
        const celulas = Array.from(document.querySelectorAll('.celula'));
        const jogadasVencedoras = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        
        for (const combinacoes of jogadasVencedoras) {
            const [a, b, c] = combinacoes;

            if (celulas[a].textContent && celulas[a].textContent === celulas[b].textContent && celulas[a].textContent === celulas[c].textContent) {
                celulas[a].classList.add('vencedor');
                celulas[b].classList.add('vencedor');
                celulas[c].classList.add('vencedor');
                vencedor = true;
                exibirMensagemVitoria(`${jogadorAtual} venceu!`);
                atualizarPlacar();
                ocultarVezDeJogar();
                return;
            }
        }

        // Verifica se houve empate
        if (celulas.every(celula => celula.textContent) && !vencedor) {
            exibirMensagemVitoria('Vocês empataram!');
            atualizarPlacar();
            ocultarVezDeJogar();
        }
    }

    // Adiciona um evento de clique ao botão "Novo Jogo" para reiniciar o jogo
    const novoJogoBtn = document.getElementById('novo-jogo');
    novoJogoBtn.addEventListener('click', reiniciarJogo);

    // Função para reiniciar o jogo
    function reiniciarJogo() {
        const celulas = document.querySelectorAll('.celula');
        celulas.forEach(celula => {
            celula.textContent = '';
            celula.classList.remove('vencedor'); 
        });
        vencedor = false; 
        atualizarVezDeJogar();
        document.getElementById('mensagem-vitoria').textContent = '';
        document.getElementById('vez-de-jogar').style.display = 'block';
        contadorJogadas = 0; 
    }
    atualizarVezDeJogar();

});
