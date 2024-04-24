document.addEventListener('DOMContentLoaded', () => {
    const formUsuario = document.getElementById('formUsuario');

    formUsuario.addEventListener('submit', async (event) => {
        event.preventDefault();

        const usuario = document.getElementById('usuario').value;
        const senha = document.getElementById('senha').value;

        const dados = {
            usuario: usuario,
            senha: senha
        };

        try {
            const resposta = await fetch('/criar_usuario/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            const resultado = await resposta.json();

            if (resposta.ok) {
                alert(resultado.mensagem);
                formUsuario.reset();
            } else {
                alert(resultado.mensagem);
            }
        } catch (erro) {
            console.error('Erro ao criar usuário:', erro);
            alert('Erro ao criar usuário. Por favor, tente novamente.');
        }
    });
});
