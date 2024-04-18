function EfetuarLogin() {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    // Validação básica dos campos de entrada
    if (email === "" || senha === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    fetch('https://localhost:7090/api/v1/usuario/AutenticarUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            senha: senha
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Erro ao efetuar login. Por favor, tente novamente mais tarde.');
        }
    })
    .then(data => {
        if (data.token) {
            window.location.href = "sucesso.html";
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        alert(error.message);
    });
}
