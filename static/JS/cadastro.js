document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('cadastroForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // para impedir o comportamento padrao do formulario
    
        var usuario = document.getElementById('usuario').value;
        var senha = document.getElementById('senha').value;

        // POST para o endpoint Flask com fetch
        fetch('/criar_usuario/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuario: usuario, senha: senha })
        })
        .then(response => {
            if (response.ok) {
                window.location.href = '/login'; //return response.json();
            } else if (response.status === 400) {
                return response.json().then(data => {
                    throw new Error(data.mensagem);
                });
            } 
            else {
                throw new Error('Erro ao enviar dados');
            }
        })
        .then(data => {
            if (data.mensagem) {
                document.getElementById('mensagem').textContent = data.mensagem;
                // Limpar os campos do formulário após o cadastro bem-sucedido
                document.getElementById('usuario').value = '';
                document.getElementById('senha').value = '';
            } else {
                throw new Error('Erro ao criar usuário');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            // Exibir mensagem de erro na tela
            document.getElementById('mensagem').textContent = error.message;
        });
    });
});