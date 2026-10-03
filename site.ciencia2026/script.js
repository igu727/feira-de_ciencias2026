const CHAVE_PERGUNTAS = "conexaoGlobalPerguntas";


// ========================================
// CARREGAR PERGUNTAS
// ========================================

function carregarPerguntas() {

    try {

        return JSON.parse(
            localStorage.getItem(CHAVE_PERGUNTAS)
        ) || [];

    } catch (erro) {

        return [];

    }

}


// ========================================
// SALVAR PERGUNTAS
// ========================================

function salvarPerguntas(perguntas) {

    localStorage.setItem(
        CHAVE_PERGUNTAS,
        JSON.stringify(perguntas)
    );

}


// ========================================
// CRIAR ID
// ========================================

function criarPerguntaId() {

    return (
        Date.now().toString(36) +
        Math.random().toString(36).slice(2, 7)
    );

}


// ========================================
// MOSTRAR RESPOSTA
// ========================================

function mostrarResposta(id) {

    const perguntas = carregarPerguntas();

    const pergunta = perguntas.find(
        item => item.id === id
    );

    const caixa = document.getElementById(
        "conteudo-resposta"
    );


    // Atualiza botão ativo

    document
        .querySelectorAll(".btn-pergunta")
        .forEach(btn => {

            btn.classList.toggle(
                "active",
                btn.dataset.id === id
            );

        });


    if (!pergunta) {

        caixa.innerHTML = "";

        return;

    }


    caixa.innerHTML = "";


    // Mostra cada resposta

    pergunta.respostas.forEach(resposta => {

        const item = document.createElement("div");

        item.className = "resposta-item";


        const texto = document.createElement("p");

        texto.textContent =
            `“${resposta.texto}”`;


        const origem = document.createElement("span");

        origem.className = "origem";

        origem.textContent =
            resposta.autor ||
            "Participante da comunidade";


        item.appendChild(texto);

        item.appendChild(origem);

        caixa.appendChild(item);

    });


    // Botão para excluir

    const excluir = document.createElement("button");

    excluir.className =
        "btn-excluir-pergunta";

    excluir.type = "button";

    excluir.textContent =
        "🗑️ Remover esta pergunta";


    excluir.addEventListener(
        "click",
        () => removerPergunta(pergunta.id)
    );


    caixa.appendChild(excluir);

}


// ========================================
// RENDERIZAR PERGUNTAS
// ========================================

function renderizarPerguntas() {

    const lista =
        document.getElementById(
            "listaPerguntas"
        );

    const caixa =
        document.getElementById(
            "conteudo-resposta"
        );

    const aviso =
        document.getElementById(
            "painelAviso"
        );


    const perguntas =
        carregarPerguntas();


    lista.innerHTML = "";

    caixa.innerHTML = "";


    // Nenhuma pergunta

    if (perguntas.length === 0) {

        aviso.classList.add("visivel");

        return;

    }


    aviso.classList.remove("visivel");


    // Cria os botões

    perguntas.forEach(
        (pergunta, indice) => {

            const botao =
                document.createElement(
                    "button"
                );


            botao.type = "button";

            botao.className =
                "btn-pergunta";

            botao.dataset.id =
                pergunta.id;


            botao.textContent =
                `${pergunta.icone} ${pergunta.titulo}`;


            botao.addEventListener(
                "click",
                () => mostrarResposta(
                    pergunta.id
                )
            );


            lista.appendChild(botao);


            // Primeira pergunta abre automaticamente

            if (indice === 0) {

                setTimeout(
                    () => mostrarResposta(
                        pergunta.id
                    ),
                    0
                );

            }

        }
    );

}


// ========================================
// REMOVER PERGUNTA
// ========================================

function removerPergunta(id) {

    const perguntas =
        carregarPerguntas();


    const pergunta =
        perguntas.find(
            item => item.id === id
        );


    if (!pergunta) return;


    const confirmar =
        confirm(
            `Remover a pergunta "${pergunta.titulo}"?`
        );


    if (!confirmar) return;


    const novasPerguntas =
        perguntas.filter(
            item => item.id !== id
        );


    salvarPerguntas(
        novasPerguntas
    );


    renderizarPerguntas();

}


// ========================================
// ABRIR FORMULÁRIO
// ========================================

function abrirFormulario() {

    const modal =
        document.getElementById(
            "modalPergunta"
        );


    modal.classList.add("aberto");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document
        .getElementById(
            "tituloPergunta"
        )
        .focus();

}


// ========================================
// FECHAR FORMULÁRIO
// ========================================

function fecharFormulario() {

    const modal =
        document.getElementById(
            "modalPergunta"
        );


    modal.classList.remove(
        "aberto"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document
        .getElementById(
            "formPergunta"
        )
        .reset();

}


// ========================================
// PUBLICAR PERGUNTA
// ========================================

function publicarPergunta(event) {

    event.preventDefault();


    const titulo =
        document
            .getElementById(
                "tituloPergunta"
            )
            .value
            .trim();


    const icone =
        document
            .getElementById(
                "iconePergunta"
            )
            .value;


    const autor =
        document
            .getElementById(
                "autorPergunta"
            )
            .value
            .trim() ||
        "Participante da comunidade";


    const texto =
        document
            .getElementById(
                "respostaPergunta"
            )
            .value
            .trim();


    if (!titulo || !texto) {

        return;

    }


    const perguntas =
        carregarPerguntas();


    const novaPergunta = {

        id: criarPerguntaId(),

        titulo: titulo,

        icone: icone,

        respostas: [

            {

                texto: texto,

                autor: autor

            }

        ]

    };


    perguntas.push(
        novaPergunta
    );


    salvarPerguntas(
        perguntas
    );


    fecharFormulario();

    renderizarPerguntas();


    // Abre automaticamente a pergunta criada

    mostrarResposta(
        novaPergunta.id
    );

}


// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const btnAbrir =
            document.getElementById(
                "btnAbrirFormulario"
            );


        const btnFechar =
            document.getElementById(
                "btnFecharFormulario"
            );


        const btnCancelar =
            document.getElementById(
                "btnCancelarFormulario"
            );


        const formulario =
            document.getElementById(
                "formPergunta"
            );


        const modal =
            document.getElementById(
                "modalPergunta"
            );


        // Abrir

        btnAbrir.addEventListener(
            "click",
            abrirFormulario
        );


        // Fechar pelo X

        btnFechar.addEventListener(
            "click",
            fecharFormulario
        );


        // Fechar pelo cancelar

        btnCancelar.addEventListener(
            "click",
            fecharFormulario
        );


        // Enviar formulário

        formulario.addEventListener(
            "submit",
            publicarPergunta
        );


        // Fechar clicando fora do modal

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target.id ===
                    "modalPergunta"
                ) {

                    fecharFormulario();

                }

            }
        );


        // Fechar com ESC

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key ===
                    "Escape"
                ) {

                    fecharFormulario();

                }

            }
        );


        // Carrega perguntas salvas

        renderizarPerguntas();

    }
);