const forumWindow =
    document.getElementById("forumWindow");

const forumUserInput =
    document.getElementById("forumUserInput");

const forumMsgInput =
    document.getElementById("forumMsgInput");

const btnEnviarForum =
    document.getElementById("btnEnviarForum");

const messageCounter =
    document.getElementById("messageCounter");

const ROTA_FORUM = "forum";

const LIMITE_MENSAGENS = 500;

const INTERVALO_ENVIO = 3000;

let totalMensagens = 0;

let ultimoEnvio = 0;

let rolarProximaMensagem = false;

/* =====================================================
   ADICIONAR MENSAGEM NA TELA
   ===================================================== */

function adicionarNaTelaForum(usuario, texto, chave) {

    const novaLinha =
        document.createElement("div");

    novaLinha.className =
        "forum-message";

    if (chave) {

        novaLinha.dataset.chave = chave;

    }

    const nome =
        document.createElement("span");

    nome.className =
        "forum-user";

    nome.textContent =
        "@" + usuario;

    const mensagem =
        document.createElement("span");

    mensagem.className =
        "forum-text";

    mensagem.textContent =
        texto;

    novaLinha.appendChild(nome);

    novaLinha.appendChild(mensagem);

    forumWindow.appendChild(novaLinha);

}

/* =====================================================
   CONTADOR
   ===================================================== */

function atualizarContador(total) {

    if (total === 1) {

        messageCounter.textContent =
            "💬 1 mensagem";

    } else {

        messageCounter.textContent =
            `💬 ${total} mensagens`;

    }

}

/* =====================================================
   ROLAR PARA O FINAL
   ===================================================== */

function rolarForumNoFim() {

    forumWindow.scrollTop =
        forumWindow.scrollHeight;

}

function estaPertoDoFim() {

    return (
        forumWindow.scrollHeight -
        forumWindow.scrollTop -
        forumWindow.clientHeight
    ) < 80;

}

/* =====================================================
   ESCUTAR MENSAGENS NO FIREBASE (tempo real)
   ===================================================== */

function iniciarForum() {

    if (!window.conexaoDB) {

        console.error("Sem conexão com o banco de dados.");

        return;

    }

    const consulta =
        window.conexaoDB
            .ref(ROTA_FORUM)
            .limitToLast(LIMITE_MENSAGENS);

    consulta.on(
        "child_added",
        function(snapshot) {

            const dados = snapshot.val();

            if (!dados) {

                return;

            }

            const noFim =
                estaPertoDoFim() ||
                rolarProximaMensagem;

            rolarProximaMensagem = false;

            adicionarNaTelaForum(
                dados.usuario,
                dados.texto,
                snapshot.key
            );

            totalMensagens++;

            atualizarContador(totalMensagens);

            if (noFim) {

                rolarForumNoFim();

            }

        },
        function(erro) {

            console.error(
                "Erro ao carregar mensagens:",
                erro
            );

        }
    );

    consulta.on(
        "child_removed",
        function(snapshot) {

            const elemento =
                forumWindow.querySelector(
                    '[data-chave="' + snapshot.key + '"]'
                );

            if (elemento) {

                elemento.remove();

            }

            totalMensagens =
                Math.max(0, totalMensagens - 1);

            atualizarContador(totalMensagens);

        }
    );

}

/* =====================================================
   ENVIAR MENSAGEM
   ===================================================== */

function enviarMensagemForum() {

    const usuario =
        forumUserInput.value.trim() ||
        "Anônimo";

    const texto =
        forumMsgInput.value.trim();

    if (texto === "") {

        forumMsgInput.focus();

        return;

    }

    if (!window.conexaoDB) {

        alert("Não foi possível conectar ao servidor. Tente novamente.");

        return;

    }

    // Evita envios em sequência (spam)

    const agora = Date.now();

    if (agora - ultimoEnvio < INTERVALO_ENVIO) {

        alert("Aguarde alguns segundos antes de enviar outra mensagem.");

        return;

    }

    ultimoEnvio = agora;

    rolarProximaMensagem = true;

    window.conexaoDB
        .ref(ROTA_FORUM)
        .push({

            usuario: usuario.slice(0, 40),

            texto: texto.slice(0, 500),

            ts: firebase.database.ServerValue.TIMESTAMP

        })
        .catch(function(erro) {

            console.error(erro);

            ultimoEnvio = 0;

            alert("Não foi possível enviar a mensagem. Tente novamente.");

        });

    forumMsgInput.value = "";

    forumMsgInput.focus();

}

/* =====================================================
   ENTER PARA ENVIAR
   ===================================================== */

btnEnviarForum.addEventListener(
    "click",
    enviarMensagemForum
);

forumMsgInput.addEventListener(
    "keypress",
    function(event) {

        if (event.key === "Enter") {

            enviarMensagemForum();

        }

    }
);

/* =====================================================
   MODERAÇÃO
   ===================================================== */

async function limparConsoleSecreto() {

    const confirmar =
        confirm(
            "Deseja apagar todas as mensagens do fórum para TODOS os visitantes?"
        );

    if (!confirmar) {

        return;

    }

    if (!window.conexaoDB) {

        alert("Não foi possível conectar ao servidor.");

        return;

    }

    // Só o administrador (logado no Firebase) pode apagar

    const logado =
        await window.conexaoAdminLogin();

    if (!logado) {

        return;

    }

    try {

        await window.conexaoDB
            .ref(ROTA_FORUM)
            .remove();

        forumWindow.innerHTML = `

            <div class="system-message">

                <strong>🛡️ Sistema:</strong>

                <br>

                O histórico do fórum foi
                limpo pelo administrador.

            </div>

        `;

        totalMensagens = 0;

        atualizarContador(0);

        alert(
            "Mensagens apagadas com sucesso!"
        );

    } catch (erro) {

        console.error(erro);

        alert(
            "Não foi possível apagar as mensagens."
        );

    }

}

/* =====================================================
   INICIAR
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        iniciarForum();

    }
);