document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('loginForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // para impedir o comportamento padrão do formulário

        var usuario = document.getElementById('usuario').value;
        var senha = document.getElementById('senha').value;

        var data = {
            usuario: usuario,
            senha: senha
        };

        // POST para o endpoint Flask com fetch
        fetch('/verificar_login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Definir o tipo de conteúdo como JSON
            },
            body: JSON.stringify(data) // Converter o objeto em uma string JSON
        })
        .then(response => {
            if (response.ok) {
                // Se o login for bem-sucedido, redirecione para a página principal
                window.location.href = '/home';
            } else {
                // Se o login falhar, exiba a mensagem de erro retornada pelo Flask
                return response.json();
            }
        })
        .then(data => {
            document.getElementById('mensagem').textContent = data.error;
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('mensagem').textContent = 'Erro ao realizar o login';
        });
    });
});
