document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       TELAS
       ========================================================= */

    const telaInicial = document.getElementById("telaInicial");
    const telaNPCs = document.getElementById("telaNPCs");
    const telaNPC = document.getElementById("telaNPC");
    const telaHistoria = document.getElementById("telaHistoria");
    const telaFinal = document.getElementById("telaFinal");
    const telaFinalGeral = document.getElementById("telaFinalGeral");


    /* =========================================================
       BOTÕES
       ========================================================= */

    const btnComecar = document.getElementById("btnComecar");
    const btnVoltar = document.getElementById("btnVoltar");
    const btnVoltarInicio = document.getElementById("btnVoltarInicio");
    const btnVoltarNPCs = document.getElementById("btnVoltarNPCs");
    const btnIniciarNPC = document.getElementById("btnIniciarNPC");
    const btnSairHistoria = document.getElementById("btnSairHistoria");
    const btnRecomecar = document.getElementById("btnRecomecar");
    const btnVoltarHistorias = document.getElementById("btnVoltarHistorias");
    const btnVoltarInicioFinal = document.getElementById("btnVoltarInicioFinal");


    /* =========================================================
       BOTÕES DE ÁUDIO
       ========================================================= */

    const btnAudioCenario =
        document.getElementById("btnAudioCenario");

    const btnAudioHistoria =
        document.getElementById("btnAudioHistoria");


    /* =========================================================
       ELEMENTOS DO PROGRESSO
       ========================================================= */

    const progressoTexto =
        document.getElementById("progressoTexto");

    const progressoPorcentagem =
        document.getElementById("progressoPorcentagem");

    const progressoBarra =
        document.getElementById("progressoBarra");

    const itensProgresso =
        document.querySelectorAll(".progresso-item");


    /* =========================================================
       PERSONAGENS
       ========================================================= */

    const npcs = {

        "novo-aluno": {
            nome: "O Novo Aluno",
            icone: "👤",
            dificuldade: "★★☆☆☆",
            descricao: "Primeiro dia em uma nova escola.",
            cenario:
                "Você acabou de chegar em uma escola nova. " +
                "Tudo parece diferente e você ainda não conhece ninguém."
        },

        "colega-curiosa": {
            nome: "A Colega Curiosa",
            icone: "💬",
            dificuldade: "★★★☆☆",
            descricao: "Curiosidade sobre sua cultura e origem.",
            cenario:
                "Durante uma conversa, uma colega começa a fazer perguntas " +
                "sobre seu país, sua cultura e sua vida antes de chegar aqui."
        },

        "o-grupo": {
            nome: "O Grupo",
            icone: "👥",
            dificuldade: "★★★★☆",
            descricao: "Uma situação de conversa e inclusão.",
            cenario:
                "Você percebe que um grupo de alunos está conversando. " +
                "Uma pessoa nova está por perto, mas parece estar sendo deixada de lado."
        },

        "momento-dificil": {
            nome: "O Momento Difícil",
            icone: "🧩",
            dificuldade: "★★★★★",
            descricao: "Uma situação que exige mais atenção.",
            cenario:
                "Durante o intervalo, acontece uma situação desconfortável. " +
                "Você percebe que alguém pode estar precisando de ajuda."
        }

    };


    /* =========================================================
       HISTÓRIAS
       ========================================================= */

    const historias = {

        "novo-aluno": [

            {
                titulo: "Primeiro dia",
                texto:
                    "Você chega à sala e percebe que quase todos já " +
                    "estão conversando entre si. Você ainda não conhece ninguém.",

                opcoes: [
                    {
                        texto: "Sentar sozinho e esperar a aula começar.",
                        proxima: 1
                    },
                    {
                        texto: "Dar bom dia para alguém e tentar conversar.",
                        proxima: 2
                    },
                    {
                        texto: "Esperar alguém falar com você primeiro.",
                        proxima: 1
                    }
                ]
            },

            {
                titulo: "Um começo silencioso",
                texto:
                    "Você passa alguns minutos sozinho. " +
                    "Então percebe que uma pessoa sentada perto de você olha em sua direção.",

                opcoes: [
                    {
                        texto: "Sorrir e cumprimentar.",
                        proxima: 2
                    },
                    {
                        texto: "Continuar quieto.",
                        proxima: 3
                    }
                ]
            },

            {
                titulo: "Uma conversa começa",
                texto:
                    "A pessoa responde ao seu cumprimento e pergunta " +
                    "se você é novo na escola.",

                opcoes: [
                    {
                        texto: "Contar um pouco sobre você.",
                        proxima: 3
                    },
                    {
                        texto: "Responder apenas que sim.",
                        proxima: 3
                    }
                ]
            },

            {
                titulo: "O fim do primeiro encontro",
                texto:
                    "A conversa termina antes da aula começar. " +
                    "Não foi uma grande conversa, mas agora você já conhece pelo menos uma pessoa.",

                opcoes: [
                    {
                        texto: "Continuar tentando conhecer outras pessoas.",
                        final: "conexao"
                    },
                    {
                        texto: "Ficar satisfeito com o primeiro contato.",
                        final: "primeiro-passo"
                    }
                ]
            }

        ],


        "colega-curiosa": [

            {
                titulo: "Uma pergunta inesperada",
                texto:
                    "Durante o intervalo, uma colega percebe seu sotaque " +
                    "e pergunta de onde você veio.",

                opcoes: [
                    {
                        texto: "Contar de onde veio e falar um pouco sobre sua história.",
                        proxima: 1
                    },
                    {
                        texto: "Responder apenas o necessário.",
                        proxima: 2
                    },
                    {
                        texto: "Perguntar por que ela quer saber.",
                        proxima: 2
                    }
                ]
            },

            {
                titulo: "A curiosidade aumenta",
                texto:
                    "Ela parece interessada e pergunta sobre sua comida favorita " +
                    "e sobre algumas tradições do seu país.",

                opcoes: [
                    {
                        texto: "Explicar algumas coisas e perguntar se ela conhece.",
                        proxima: 3
                    },
                    {
                        texto: "Dizer que nem tudo é igual para todas as pessoas.",
                        proxima: 3
                    }
                ]
            },

            {
                titulo: "Uma pergunta desconfortável",
                texto:
                    "A colega faz uma pergunta pessoal que deixa você um pouco desconfortável. " +
                    "Ela parece não perceber que passou do limite.",

                opcoes: [
                    {
                        texto: "Explicar com calma que prefere não responder.",
                        proxima: 3
                    },
                    {
                        texto: "Mudar de assunto sem explicar.",
                        proxima: 3
                    },
                    {
                        texto: "Responder mesmo estando desconfortável.",
                        proxima: 3
                    }
                ]
            },

            {
                titulo: "Uma troca de experiências",
                texto:
                    "Depois da conversa, ela percebe que conhecer uma cultura " +
                    "não significa fazer suposições sobre todas as pessoas.",

                opcoes: [
                    {
                        texto: "Continuar a conversa e também perguntar sobre a cultura dela.",
                        final: "troca"
                    },
                    {
                        texto: "Encerrar a conversa e seguir o intervalo.",
                        final: "limites"
                    }
                ]
            }

        ],


        "o-grupo": [

            {
                titulo: "Uma conversa diferente",
                texto:
                    "Você está com alguns colegas quando uma pessoa nova " +
                    "se aproxima. Ela parece querer participar da conversa.",

                opcoes: [
                    {
                        texto: "Chamar a pessoa para participar.",
                        proxima: 1
                    },
                    {
                        texto: "Continuar conversando normalmente.",
                        proxima: 2
                    },
                    {
                        texto: "Perguntar diretamente o que ela queria falar.",
                        proxima: 1
                    }
                ]
            },

            {
                titulo: "Uma oportunidade",
                texto:
                    "A pessoa entra na conversa, mas parece ter dificuldade " +
                    "para acompanhar algumas referências e brincadeiras.",

                opcoes: [
                    {
                        texto: "Explicar a brincadeira para ela.",
                        proxima: 3
                    },
                    {
                        texto: "Mudar um pouco o assunto para incluir todo mundo.",
                        proxima: 3
                    }
                ]
            },

            {
                titulo: "Ela ficou de fora",
                texto:
                    "Depois de alguns minutos, você percebe que a pessoa " +
                    "ficou quieta e se afastou do grupo.",

                opcoes: [
                    {
                        texto: "Ir conversar com ela.",
                        proxima: 3
                    },
                    {
                        texto: "Deixar que ela escolha se quer voltar.",
                        proxima: 3
                    },
                    {
                        texto: "Continuar com o grupo sem perceber a situação.",
                        proxima: 3
                    }
                ]
            },

            {
                titulo: "O que fica depois",
                texto:
                    "A situação mostra que inclusão não significa obrigar alguém " +
                    "a participar, mas criar espaço para que a pessoa possa escolher.",

                opcoes: [
                    {
                        texto: "Tentar incluir a pessoa nas próximas conversas.",
                        final: "inclusao"
                    },
                    {
                        texto: "Respeitar o espaço dela e continuar disponível.",
                        final: "respeito"
                    }
                ]
            }

        ],


        "momento-dificil": [

            {
                titulo: "Algo acontece",
                texto:
                    "Durante o intervalo, você ouve alguns alunos fazendo comentários " +
                    "sobre o jeito de falar de um estudante estrangeiro.",

                opcoes: [
                    {
                        texto: "Fingir que não ouviu.",
                        proxima: 1
                    },
                    {
                        texto: "Dizer que aquele tipo de comentário não é legal.",
                        proxima: 2
                    },
                    {
                        texto: "Se aproximar do estudante para ver se ele está bem.",
                        proxima: 2
                    }
                ]
            },

            {
                titulo: "O silêncio pesa",
                texto:
                    "O estudante percebe os comentários e fica mais quieto. " +
                    "Você percebe que a situação realmente o afetou.",

                opcoes: [
                    {
                        texto: "Perguntar se ele está bem.",
                        proxima: 2
                    },
                    {
                        texto: "Não se envolver porque não sabe o que aconteceu.",
                        proxima: 3
                    }
                ]
            },

            {
                titulo: "Uma escolha importante",
                texto:
                    "Você percebe que não precisa resolver tudo sozinho. " +
                    "O importante é não deixar a pessoa enfrentar a situação isoladamente.",

                opcoes: [
                    {
                        texto: "Conversar com ele e, se necessário, procurar um professor.",
                        proxima: 3
                    },
                    {
                        texto: "Apenas ficar por perto para mostrar apoio.",
                        proxima: 3
                    }
                ]
            },

            {
                titulo: "Depois da situação",
                texto:
                    "A situação termina, mas fica uma pergunta: " +
                    "o que você faria se estivesse no lugar daquela pessoa?",

                opcoes: [
                    {
                        texto: "Continuar atento e agir quando perceber algo parecido.",
                        final: "atitude"
                    },
                    {
                        texto: "Acreditar que cada pessoa precisa encontrar seu próprio caminho.",
                        final: "apoio"
                    }
                ]
            }

        ]

    };


    /* =========================================================
       ESTADO
       ========================================================= */

    let npcSelecionado = null;
    let situacaoAtual = 0;
    let finalAtual = null;

    const personagensConcluidos = new Set();


    /* =========================================================
       ÁUDIO / NARRAÇÃO
       ========================================================= */

    let audioAtivado = true;


    function pararNarracao() {

        if ("speechSynthesis" in window) {

            window.speechSynthesis.cancel();

        }

    }


    function falarTexto(texto) {

        if (!audioAtivado) return;

        if (!("speechSynthesis" in window)) return;


        pararNarracao();


        const fala =
            new SpeechSynthesisUtterance(texto);


        fala.lang = "pt-BR";

        fala.rate = 0.92;

        fala.pitch = 1;

        fala.volume = 1;


        const vozes =
            window.speechSynthesis.getVoices();


        const vozPortugues =
            vozes.find((voz) =>
                voz.lang &&
                voz.lang.toLowerCase().startsWith("pt-br")
            );


        if (vozPortugues) {

            fala.voice =
                vozPortugues;

        }


        window.speechSynthesis.speak(fala);

    }


    function atualizarBotoesAudio() {

        if (btnAudioCenario) {

            const icone =
                btnAudioCenario.querySelector(".audio-icone");

            const legenda =
                btnAudioCenario.querySelector(".audio-legenda");


            if (audioAtivado) {

                if (icone)
                    icone.textContent = "🔊";

                if (legenda)
                    legenda.textContent = "Repetir";

                btnAudioCenario.title =
                    "Repetir narração";

                btnAudioCenario.setAttribute(
                    "aria-label",
                    "Repetir narração"
                );

                btnAudioCenario.setAttribute(
                    "aria-pressed",
                    "true"
                );

            } else {

                if (icone)
                    icone.textContent = "🔇";

                if (legenda)
                    legenda.textContent = "Ativar";

                btnAudioCenario.title =
                    "Ativar narração";

                btnAudioCenario.setAttribute(
                    "aria-label",
                    "Ativar narração"
                );

                btnAudioCenario.setAttribute(
                    "aria-pressed",
                    "false"
                );

            }

        }


        if (btnAudioHistoria) {

            const icone =
                btnAudioHistoria.querySelector(".audio-icone");

            const legenda =
                btnAudioHistoria.querySelector(".audio-legenda");


            if (audioAtivado) {

                if (icone)
                    icone.textContent = "🔊";

                if (legenda)
                    legenda.textContent = "Repetir";

                btnAudioHistoria.title =
                    "Repetir narração";

                btnAudioHistoria.setAttribute(
                    "aria-label",
                    "Repetir narração"
                );

                btnAudioHistoria.setAttribute(
                    "aria-pressed",
                    "true"
                );

            } else {

                if (icone)
                    icone.textContent = "🔇";

                if (legenda)
                    legenda.textContent = "Ativar";

                btnAudioHistoria.title =
                    "Ativar narração";

                btnAudioHistoria.setAttribute(
                    "aria-label",
                    "Ativar narração"
                );

                btnAudioHistoria.setAttribute(
                    "aria-pressed",
                    "false"
                );

            }

        }

    }


    function alternarAudio() {

        audioAtivado =
            !audioAtivado;


        if (!audioAtivado) {

            pararNarracao();

        }


        atualizarBotoesAudio();

    }


    if (btnAudioCenario) {

        btnAudioCenario.addEventListener(
            "click",
            () => {

                if (!audioAtivado) {

                    alternarAudio();

                    return;

                }


                const npc =
                    npcs[npcSelecionado];


                if (!npc) return;


                falarTexto(
                    npc.cenario
                );

            }
        );

    }


    if (btnAudioHistoria) {

        btnAudioHistoria.addEventListener(
            "click",
            () => {

                if (!audioAtivado) {

                    alternarAudio();

                    return;

                }


                const historia =
                    historias[npcSelecionado];


                if (!historia) return;


                const situacao =
                    historia[situacaoAtual];


                if (!situacao) return;


                falarTexto(
                    `${situacao.titulo}. ${situacao.texto}`
                );

            }
        );

    }


    atualizarBotoesAudio();


    /* =========================================================
       FINAIS
       ========================================================= */

    const finais = {

        "conexao": {
            icon: "🤝",
            titulo: "Uma nova conexão",
            mensagem:
                "Você decidiu continuar aberto a novas conversas. " +
                "Um primeiro contato simples pode ser o começo de uma amizade.",
            reflexao:
                "Quando alguém chega a um lugar novo, não precisa de uma grande atitude. " +
                "Às vezes, um cumprimento ou uma conversa já mostra que existe espaço para aquela pessoa."
        },

        "primeiro-passo": {
            icon: "🌱",
            titulo: "Um primeiro passo",
            mensagem:
                "A conversa foi pequena, mas alguma coisa mudou. " +
                "Agora existe pelo menos um rosto conhecido naquele lugar novo.",
            reflexao:
                "Adaptar-se leva tempo. Pequenos momentos de acolhimento podem tornar esse processo mais leve."
        },

        "troca": {
            icon: "🌎",
            titulo: "Uma troca de verdade",
            mensagem:
                "A conversa deixou de ser apenas perguntas sobre alguém diferente. " +
                "Virou uma troca entre duas pessoas.",
            reflexao:
                "Conhecer uma cultura também significa ouvir a pessoa que faz parte dela, sem transformar sua história em um estereótipo."
        },

        "limites": {
            icon: "💭",
            titulo: "Respeitar também é acolher",
            mensagem:
                "Você percebeu que curiosidade não dá direito de ultrapassar os limites de outra pessoa.",
            reflexao:
                "Perguntar pode aproximar, mas saber ouvir um 'prefiro não responder' também é uma forma de respeito."
        },

        "inclusao": {
            icon: "🫂",
            titulo: "Um espaço para participar",
            mensagem:
                "Você percebeu que pequenas mudanças em uma conversa podem fazer alguém se sentir parte dela.",
            reflexao:
                "Incluir não significa tratar alguém como diferente o tempo todo. Significa criar espaço para que todos possam participar."
        },

        "respeito": {
            icon: "🤝",
            titulo: "Espaço e respeito",
            mensagem:
                "Você escolheu respeitar o tempo da pessoa sem fechar a porta para uma aproximação.",
            reflexao:
                "Nem todo mundo se adapta no mesmo ritmo. Acolher também é respeitar o espaço e as escolhas de cada pessoa."
        },

        "atitude": {
            icon: "🛡️",
            titulo: "Você decidiu agir",
            mensagem:
                "Você percebeu que ficar em silêncio também pode deixar alguém sozinho diante de uma situação injusta.",
            reflexao:
                "Nem sempre precisamos resolver tudo. Mas podemos interromper um comentário ofensivo, oferecer apoio ou procurar alguém que possa ajudar."
        },

        "apoio": {
            icon: "💙",
            titulo: "Você escolheu estar presente",
            mensagem:
                "Mesmo sem tentar resolver tudo, você mostrou que aquela pessoa não estava sozinha.",
            reflexao:
                "Ouvir, acompanhar e demonstrar apoio também são atitudes importantes quando alguém passa por um momento difícil."
        }

    };


    /* =========================================================
       MOSTRAR TELA
       ========================================================= */

    function mostrarTela(tela) {

        pararNarracao();


        telaInicial.hidden = true;
        telaNPCs.hidden = true;
        telaNPC.hidden = true;
        telaHistoria.hidden = true;
        telaFinal.hidden = true;
        telaFinalGeral.hidden = true;


        tela.hidden = false;


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    /* =========================================================
       ATUALIZAR PROGRESSO
       ========================================================= */

    function atualizarProgresso() {

        const total =
            Object.keys(npcs).length;

        const concluidos =
            personagensConcluidos.size;


        const porcentagem =
            Math.round(
                (concluidos / total) * 100
            );


        progressoTexto.textContent =
            `${concluidos}/${total} histórias concluídas`;


        progressoPorcentagem.textContent =
            `${porcentagem}%`;


        progressoBarra.style.width =
            `${porcentagem}%`;


        itensProgresso.forEach((item) => {

            const idNPC =
                item.dataset.progressoNpc;


            const status =
                item.querySelector(
                    ".progresso-status"
                );


            if (
                personagensConcluidos.has(
                    idNPC
                )
            ) {

                item.classList.add(
                    "concluido"
                );

                status.textContent =
                    "✅";

            } else {

                item.classList.remove(
                    "concluido"
                );

                status.textContent =
                    "🔒";

            }

        });

    }


    /* =========================================================
       VERIFICAR EXPERIÊNCIA COMPLETA
       ========================================================= */

    function verificarExperienciaCompleta() {

        const total =
            Object.keys(npcs).length;


        if (
            personagensConcluidos.size ===
            total
        ) {

            setTimeout(() => {

                mostrarTela(
                    telaFinalGeral
                );

            }, 350);


            return true;

        }


        return false;

    }


    /* =========================================================
       VOLTAR AO INÍCIO
       ========================================================= */

    btnComecar.addEventListener(
        "click",
        () => {

            atualizarProgresso();

            mostrarTela(telaNPCs);

        }
    );


    /* =========================================================
       VOLTAR AO SITE
       ========================================================= */

    btnVoltar.addEventListener(
        "click",
        () => {

            pararNarracao();

            window.location.href =
                "index.html";

        }
    );


    /* =========================================================
       VOLTAR PARA INÍCIO DA EXPERIÊNCIA
       ========================================================= */

    btnVoltarInicio.addEventListener(
        "click",
        () => {

            mostrarTela(
                telaInicial
            );

        }
    );


    /* =========================================================
       ESCOLHER NPC
       ========================================================= */

    const botoesNPC =
        document.querySelectorAll(
            ".npc-card"
        );


    botoesNPC.forEach(
        (botao) => {

            botao.addEventListener(
                "click",
                () => {

                    const idNPC =
                        botao.dataset.npc;


                    const npc =
                        npcs[idNPC];


                    if (!npc) return;


                    npcSelecionado =
                        idNPC;

                    situacaoAtual =
                        0;

                    finalAtual =
                        null;


                    document.getElementById(
                        "npcDetalheIcon"
                    ).textContent =
                        npc.icone;


                    document.getElementById(
                        "npcDetalheNome"
                    ).textContent =
                        npc.nome;


                    document.getElementById(
                        "npcDetalheBadge"
                    ).textContent =
                        `DIFICULDADE ${npc.dificuldade}`;


                    document.getElementById(
                        "npcDetalheDescricao"
                    ).textContent =
                        npc.descricao;


                    document.getElementById(
                        "npcDetalheCenario"
                    ).textContent =
                        npc.cenario;


                    atualizarBotoesAudio();


                    mostrarTela(
                        telaNPC
                    );

                }
            );

        }
    );


    /* =========================================================
       VOLTAR PARA NPCS
       ========================================================= */

    btnVoltarNPCs.addEventListener(
        "click",
        () => {

            npcSelecionado =
                null;

            situacaoAtual =
                0;

            finalAtual =
                null;


            atualizarProgresso();


            mostrarTela(
                telaNPCs
            );

        }
    );


    /* =========================================================
       INICIAR HISTÓRIA
       ========================================================= */

    btnIniciarNPC.addEventListener(
        "click",
        () => {

            if (!npcSelecionado)
                return;


            if (
                !historias[
                    npcSelecionado
                ]
            ) {

                return;

            }


            situacaoAtual =
                0;


            mostrarHistoria();

        }
    );


    /* =========================================================
       MOSTRAR HISTÓRIA
       ========================================================= */

    function mostrarHistoria() {

        const historia =
            historias[
                npcSelecionado
            ];


        if (!historia) return;


        const situacao =
            historia[
                situacaoAtual
            ];


        if (!situacao) return;


        document.getElementById(
            "historiaTitulo"
        ).textContent =
            npcs[
                npcSelecionado
            ].nome;


        document.getElementById(
            "historiaBadge"
        ).textContent =
            `🌎 ${npcs[
                npcSelecionado
            ].nome.toUpperCase()}`;


        document.getElementById(
            "historiaProgresso"
        ).textContent =
            `Situação ${
                situacaoAtual + 1
            } de ${
                historia.length
            }`;


        document.getElementById(
            "historiaTexto"
        ).textContent =
            `${situacao.titulo}\n\n${situacao.texto}`;


        const opcoes =
            document.getElementById(
                "historiaOpcoes"
            );


        opcoes.innerHTML =
            "";


        situacao.opcoes.forEach(
            (opcao) => {

                const botao =
                    document.createElement(
                        "button"
                    );


                botao.type =
                    "button";


                botao.className =
                    "historia-opcao";


                botao.textContent =
                    opcao.texto;


                botao.addEventListener(
                    "click",
                    () => {

                        escolherOpcao(
                            opcao
                        );

                    }
                );


                opcoes.appendChild(
                    botao
                );

            }
        );


        atualizarBotoesAudio();


        mostrarTela(
            telaHistoria
        );


        /* =====================================
           NARRAÇÃO AUTOMÁTICA
           ===================================== */

        setTimeout(() => {

            falarTexto(
                `${situacao.titulo}. ${situacao.texto}`
            );

        }, 450);

    }


    /* =========================================================
       ESCOLHER OPÇÃO
       ========================================================= */

    function escolherOpcao(opcao) {

        pararNarracao();


        if (opcao.final) {

            finalAtual =
                opcao.final;


            personagensConcluidos.add(
                npcSelecionado
            );


            atualizarProgresso();


            mostrarFinal();


            return;

        }


        if (
            typeof opcao.proxima ===
            "number"
        ) {

            situacaoAtual =
                opcao.proxima;


            mostrarHistoria();

        }

    }


    /* =========================================================
       MOSTRAR FINAL
       ========================================================= */

    function mostrarFinal() {

        const final =
            finais[
                finalAtual
            ];


        if (!final) return;


        document.getElementById(
            "finalIcon"
        ).textContent =
            final.icon;


        document.getElementById(
            "finalTitulo"
        ).textContent =
            final.titulo;


        document.getElementById(
            "finalMensagem"
        ).textContent =
            final.mensagem;


        document.getElementById(
            "finalReflexao"
        ).textContent =
            final.reflexao;


        const botaoRecomecar =
            document.getElementById(
                "btnRecomecar"
            );


        botaoRecomecar.innerHTML =
            'Recomeçar história <span>↻</span>';


        mostrarTela(
            telaFinal
        );


        verificarExperienciaCompleta();

    }


    /* =========================================================
       RECOMEÇAR
       ========================================================= */

    btnRecomecar.addEventListener(
        "click",
        () => {

            situacaoAtual =
                0;

            finalAtual =
                null;


            mostrarHistoria();

        }
    );


    /* =========================================================
       VOLTAR PARA ESCOLHA DE PERSONAGEM
       ========================================================= */

    btnVoltarHistorias.addEventListener(
        "click",
        () => {

            npcSelecionado =
                null;

            situacaoAtual =
                0;

            finalAtual =
                null;


            atualizarProgresso();


            mostrarTela(
                telaNPCs
            );

        }
    );


    /* =========================================================
       SAIR DA HISTÓRIA
       ========================================================= */

    btnSairHistoria.addEventListener(
        "click",
        () => {

            mostrarTela(
                telaNPC
            );

        }
    );


    /* =========================================================
       VOLTAR AO INÍCIO APÓS CONCLUIR
       ========================================================= */

    btnVoltarInicioFinal.addEventListener(
        "click",
        () => {

            mostrarTela(
                telaInicial
            );

        }
    );


    /* =========================================================
       INICIALIZAR PROGRESSO
       ========================================================= */

    atualizarProgresso();

});