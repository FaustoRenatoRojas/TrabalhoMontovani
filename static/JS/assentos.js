document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');

    // Mapeamento de IDs para nomes de assentos
    const seatIdToName = id => {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const rowNumber = Math.ceil(id / 15); // Número da fileira
        const seatNumber = id % 15 || 15; // Número do assento na fileira
        return `${alphabet[rowNumber - 1]}${seatNumber}`;
    };

    // Fazendo uma solicitação para o servidor para obter informações sobre a sala e suas cadeiras
    fetch(`/consultar_sala/`)
        .then(response => response.json())
        .then(data => {
            const cadeiras = data.sala;

            cadeiras.forEach(cadeira => {
                const seat = document.createElement('div');
                seat.classList.add('seat');
                const seatId = cadeira.id; // Usando o ID do assento do banco de dados diretamente como ID do assento
                seat.setAttribute('data-seat-id', seatId);
                seat.textContent = cadeira.cadeira;
                container.appendChild(seat);

                if (cadeira.situacao_sala == 1) { // Se o assento estiver ocupado, adiciona a classe 'occupied'
                    seat.classList.add('occupied');
                }

                seat.addEventListener('click', function() {
                    if (!seat.classList.contains('occupied')) {
                        seat.classList.toggle('selected');
                        confirmSeats(); // Chamando a função para atualizar as informações quando um assento é selecionado/deselecionado
                    }
                });
            });
        })
        .catch(error => {
            console.error('Erro ao verificar status do assento:', error);
        });
});

function verificarStatusAssento() {
    // Fazendo uma solicitação para o servidor para obter informações sobre a sala e suas cadeiras
    fetch(`/consultar_sala/`)
        .then(response => response.json())
        .then(data => {
            const cadeiras = data.cadeiras;
            // Iterando sobre cada cadeira para verificar o status
            cadeiras.forEach(cadeira => {
                const situacaoSala = cadeira.situacao_sala;
                if (situacaoSala === 1) { // Se o assento estiver ocupado, adiciona a classe 'occupied'
                    const seatId = cadeira.id; // Supondo que o ID do assento corresponda ao ID da cadeira
                    const seatElement = document.querySelector(`[data-seat-id="${seatId}"]`);
                    if (seatElement) {
                        seatElement.classList.add('occupied');
                    }
                }
            });
        })
        .catch(error => {
            console.error('Erro ao verificar status do assento:', error);
        });
}


function confirmSeats() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const selectedSeatsArray = Array.from(selectedSeats).map(seat => seat.textContent);
    const numberOfSeats = selectedSeats.length;
    const totalPrice = numberOfSeats * 10; // Cada assento custa R$10

    const numSeatsSelectedElement = document.querySelector('.num-seats-selected');
    const selectedSeatsListElement = document.querySelector('.selected-seats-list');
    const totalPriceElement = document.querySelector('.total-price');

    numSeatsSelectedElement.textContent = `Número de assentos selecionados: ${numberOfSeats}`;
    selectedSeatsListElement.textContent = `Assentos selecionados: ${selectedSeatsArray.join(', ')}`;
    totalPriceElement.textContent = `Preço total: R$${totalPrice.toFixed(2)}`;
}

function confirmarAssentos() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const seatIds = Array.from(selectedSeats).map(seat => seat.getAttribute('data-seat-id'));

    fetch('/confirmar_assentos/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ assentos: seatIds })
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Adicionando esta linha para obter a resposta JSON do servidor
        } else {
            alert('Erro ao confirmar assentos. Tente novamente.');
        }
    })
    .then(data => {
        alert(data.mensagem); // Exibir a mensagem de sucesso ou erro retornada pelo servidor
        // Aqui você pode redirecionar o usuário para outra página ou realizar outras ações necessárias
    })
    .catch(error => {
        console.error('Erro ao confirmar assentos:', error);
        alert('Erro ao confirmar assentos. Tente novamente.');
    });
}