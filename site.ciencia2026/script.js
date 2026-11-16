const ROTA_PERGUNTAS = "perguntas";

let perguntasCache = [];

let perguntaAtivaId = null;

let ultimoEnvioPergunta = 0;


// ========================================
// CARREGAR PERGUNTAS (do cache em memória)
// ========================================

function carregarPerguntas() {

    return perguntasCache;

}


// ========================================
// ESCUTAR PERGUNTAS NO FIREBASE (tempo real)
// ========================================

function iniciarPerguntas() {

    if (!window.conexaoDB) {

        renderizarPerguntas();

        return;

    }

    window.conexaoDB
        .ref(ROTA_PERGUNTAS)
        .limitToLast(100)
        .on(
            "value",
            snapshot => {

                const lista = [];

                snapshot.forEach(filho => {

                    const dados = filho.val();

                    if (!dados) return;

                    lista.push({

                        id: filho.key,

                        titulo: dados.titulo,

                        icone: dados.icone,

                        respostas: [

                            {

                                texto: dados.texto,

                                autor: dados.autor

                            }

                        ]

                    });

                });

                perguntasCache = lista;

                renderizarPerguntas();

            },
            erro => {

                console.error(
                    "Erro ao carregar perguntas:",
                    erro
                );

                perguntasCache = [];

                renderizarPerguntas();

            }
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


    perguntaAtivaId = id;

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

        }
    );


    // Mantém aberta a pergunta que o visitante estava vendo
    // (ou abre a primeira, se não houver nenhuma ativa)

    const ativa =
        perguntas.find(
            item => item.id === perguntaAtivaId
        ) || perguntas[0];

    mostrarResposta(ativa.id);

}


// ========================================
// REMOVER PERGUNTA
// ========================================

async function removerPergunta(id) {

    const pergunta =
        perguntasCache.find(
            item => item.id === id
        );


    if (!pergunta) return;


    const confirmar =
        confirm(
            `Remover a pergunta "${pergunta.titulo}"?`
        );


    if (!confirmar) return;


    if (!window.conexaoDB) {

        alert("Não foi possível conectar ao servidor.");

        return;

    }


    // Só o administrador (logado no Firebase) pode remover

    const logado =
        await window.conexaoAdminLogin();


    if (!logado) return;


    try {

        await window.conexaoDB
            .ref(`${ROTA_PERGUNTAS}/${id}`)
            .remove();


        if (perguntaAtivaId === id) {

            perguntaAtivaId = null;

        }

    } catch (erro) {

        console.error(erro);

        alert("Não foi possível remover a pergunta.");

    }

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


    if (!window.conexaoDB) {

        alert("Não foi possível conectar ao servidor. Tente novamente.");

        return;

    }


    // Evita envios em sequência (spam)

    const agora = Date.now();

    if (agora - ultimoEnvioPergunta < 5000) {

        alert("Aguarde alguns segundos antes de publicar outra pergunta.");

        return;

    }

    ultimoEnvioPergunta = agora;


    const referencia =
        window.conexaoDB
            .ref(ROTA_PERGUNTAS)
            .push();


    // A pergunta criada será aberta automaticamente

    perguntaAtivaId = referencia.key;


    referencia
        .set({

            titulo: titulo.slice(0, 70),

            icone: icone,

            texto: texto.slice(0, 500),

            autor: autor.slice(0, 50),

            ts: firebase.database.ServerValue.TIMESTAMP

        })
        .catch(erro => {

            console.error(erro);

            ultimoEnvioPergunta = 0;

            alert("Não foi possível publicar a pergunta. Tente novamente.");

        });


    fecharFormulario();

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

        iniciarPerguntas();

    }
);