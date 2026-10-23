/**
 * PORTFÓLIO PESSOAL - PEDRO TIBURSKI
 * Arquivo de Scripts JavaScript Vanilla (Puro)
 * Didaticamente comentado para apoio no aprendizado de programação.
 */

// Espera todo o documento HTML carregar antes de executar o código
document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================================================
       1. CONTROLE DE ALTERNÂNCIA DE TEMA (DARK / LIGHT MODE)
       ========================================================================== */
    const botaoTema = document.getElementById("botao-tema");
    const iconeTema = document.getElementById("icone-tema");
    const elementoHtml = document.documentElement; // Seleciona a tag <html>

    // Função que alterna entre os temas claro e escuro
    function alternarTema() {
        // Verifica se o HTML possui a classe 'tema-claro'
        const ehTemaClaro = elementoHtml.classList.toggle("tema-claro");

        if (ehTemaClaro) {
            // Se virou claro, troca o ícone para o sol
            iconeTema.className = "bi bi-sun-fill";
            localStorage.setItem("temaPreferido", "claro");
        } else {
            // Se virou escuro, troca o ícone para a lua
            iconeTema.className = "bi bi-moon-stars-fill";
            localStorage.setItem("temaPreferido", "escuro");
        }
    }

    // Carrega a preferência salva no navegador do usuário (LocalStorage)
    const temaSalvo = localStorage.getItem("temaPreferido");
    if (temaSalvo === "claro") {
        elementoHtml.classList.add("tema-claro");
        iconeTema.className = "bi bi-sun-fill";
    }

    // Adiciona evento de clique no botão do tema
    botaoTema.addEventListener("click", alternarTema);


    /* ==========================================================================
       2. MENU HAMBÚRGUER MOBILE
       ========================================================================== */
    const botaoMenuMobile = document.getElementById("botao-menu-mobile");
    const menuNavegacao = document.getElementById("menu-navegacao");
    const linksMenu = document.querySelectorAll(".link-menu");

    function alternarMenuMobile() {
        menuNavegacao.classList.toggle("aberto");
        
        // Altera o ícone de hambúrguer para um 'X' quando aberto
        const iconeMenu = botaoMenuMobile.querySelector("i");
        if (menuNavegacao.classList.contains("aberto")) {
            iconeMenu.className = "bi bi-x-lg";
        } else {
            iconeMenu.className = "bi bi-list";
        }
    }

    botaoMenuMobile.addEventListener("click", alternarMenuMobile);

    // Fecha o menu automaticamente ao clicar em qualquer link da navegação
    linksMenu.forEach(function (link) {
        link.addEventListener("click", function () {
            if (menuNavegacao.classList.contains("aberto")) {
                alternarMenuMobile();
            }
        });
    });


    /* ==========================================================================
       3. EFEITO MÁQUINA DE ESCREVER (TYPING EFFECT)
       ========================================================================== */
    const elementoTexto = document.getElementById("texto-maquina-escrever");
    const frases = [
        "Estudante de Desenvolvimento Full Stack",
        "Especializando em Front-end",
        "Entusiasta de UI/UX e Design",
        "Futuro Desenvolvedor Web e Mobile"
    ];

    let indiceFrase = 0;
    let indiceCaractere = 0;
    let apagando = false;
    const velocidadeDigitacao = 100;
    const velocidadeApagar = 50;
    const tempoPausa = 2000;

    function executarEfeitoDigitacao() {
        const fraseAtual = frases[indiceFrase];

        if (apagando) {
            // Remove um caractere
            elementoTexto.textContent = fraseAtual.substring(0, indiceCaractere - 1);
            indiceCaractere--;
        } else {
            // Adiciona um caractere
            elementoTexto.textContent = fraseAtual.substring(0, indiceCaractere + 1);
            indiceCaractere++;
        }

        // Se terminou de digitar a frase inteira
        if (!apagando && indiceCaractere === fraseAtual.length) {
            apagando = true;
            setTimeout(executarEfeitoDigitacao, tempoPausa);
            return;
        }

        // Se terminou de apagar a frase inteira
        if (apagando && indiceCaractere === 0) {
            apagando = false;
            indiceFrase = (indiceFrase + 1) % frases.length; // Passa para a próxima frase
        }

        // Define a velocidade da próxima execução
        const velocidadeAtual = apagando ? velocidadeApagar : velocidadeDigitacao;
        setTimeout(executarEfeitoDigitacao, velocidadeAtual);
    }

    // Inicia a animação de digitação
    executarEfeitoDigitacao();


    /* ==========================================================================
       4. BOTÃO "VOLTAR AO TOPO" E DESTAQUE NO MENU DURANTE O SCROLL
       ========================================================================== */
    const botaoTopo = document.getElementById("botao-topo");
    const secoes = document.querySelectorAll("section");

    window.addEventListener("scroll", function () {
        // Exibe ou oculta o botão de topo dependendo da rolagem
        if (window.scrollY > 400) {
            botaoTopo.classList.add("visivel");
        } else {
            botaoTopo.classList.remove("visivel");
        }

        // Atualiza o link ativo do menu dinamicamente conforme a página é rolada
        let secaoAtual = "";
        secoes.forEach(function (secao) {
            const topoSecao = secao.offsetTop - 100;
            const alturaSecao = secao.offsetHeight;

            if (window.scrollY >= topoSecao && window.scrollY < topoSecao + alturaSecao) {
                secaoAtual = secao.getAttribute("id");
            }
        });

        linksMenu.forEach(function (link) {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${secaoAtual}`) {
                link.classList.add("active");
            }
        });
    });

    // Evento de clique para rolar suavemente até o topo
    botaoTopo.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


    /* ==========================================================================
       5. ANIMAÇÃO DE ENTRADA AO ROLAR (FADE-IN-UP)
       ========================================================================== */
    const secoesAnimadas = document.querySelectorAll(".secao-animada");

    function verificarScrollAnimacao() {
        const alturaGatilho = window.innerHeight * 0.85;

        secoesAnimadas.forEach(function (secao) {
            const topoSecao = secao.getBoundingClientRect().top;

            if (topoSecao < alturaGatilho) {
                secao.classList.add("visivel");
            }
        });
    }

    // Executa uma vez ao carregar a página e sempre que houver rolagem
    verificarScrollAnimacao();
    window.addEventListener("scroll", verificarScrollAnimacao);


    /* ==========================================================================
       6. ANO DINÂMICO NO RODAPÉ
       ========================================================================== */
    const elementoAno = document.getElementById("ano-atual");
    if (elementoAno) {
        elementoAno.textContent = new Date().getFullYear();
    }

});