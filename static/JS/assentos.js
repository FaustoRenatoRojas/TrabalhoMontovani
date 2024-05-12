document.addEventListener('DOMContentLoaded', function() {
    const numRows = 10; // Número de fileiras
    const numSeatsPerRow = 15; // Número de assentos por fileira
    const container = document.querySelector('.container');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let rowNumber = 0; rowNumber < numRows; rowNumber++) {
        const row = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);

        for (let seatNumber = 1; seatNumber <= numSeatsPerRow; seatNumber++) {
            const seat = document.createElement('div');
            seat.classList.add('seat');
            const seatId = rowNumber * numSeatsPerRow + seatNumber; // Cálculo do ID do assento
            seat.setAttribute('data-seat-id', seatId); // Define o ID do assento como um atributo
            seat.textContent = `${alphabet[rowNumber]}${seatNumber}`;
            row.appendChild(seat);

            verificarStatusAssento(seatId, seat); // Chamando a função para verificar o status do assento

            seat.addEventListener('click', function() {
                if (!seat.classList.contains('occupied')) {
                    seat.classList.toggle('selected');
                    confirmSeats(); // Chamando a função para atualizar as informações quando um assento é selecionado/deselecionado
                }
            });
        }
    }
});
/*
function verificarStatusAssento(id, seatElement) {
    // Aqui você faria uma solicitação para o servidor para verificar o status do assento com o ID fornecido
    fetch(`/consultar_sala/`)
        .then(response => response.json())
        .then(data => {
            const situacaoSala = data.sala.situacao_sala;
            if (situacaoSala === 1) { // Se o assento estiver ocupado, adiciona a classe 'occupied'
                seatElement.classList.add('occupied');
            }
        })
        .catch(error => {
            console.error('Erro ao verificar status do assento:', error);
        });
}*/

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