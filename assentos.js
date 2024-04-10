function confirmSeats() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const selectedSeatsArray = Array.from(selectedSeats).map(seat => seat.textContent);
    const numberOfSeats = selectedSeats.length;
    const totalPrice = numberOfSeats * 10; // Cada assento custa R$10

    const selectedSeatsList = document.querySelector('.selected-seats');
    selectedSeatsList.innerHTML = `Número de assentos selecionados: ${numberOfSeats}<br>`;
    selectedSeatsList.innerHTML += `Assentos selecionados: ${selectedSeatsArray.join(', ')}<br>`;
    selectedSeatsList.innerHTML += `Preço total: R$${totalPrice.toFixed(2)}`;

    // Exibir as informações antes de confirmar
    const infoAssentos = document.querySelector('.info-assentos');
    infoAssentos.innerHTML = `<p>Número de assentos selecionados: ${numberOfSeats}</p>`;
    infoAssentos.innerHTML += `<p>Assentos selecionados: ${selectedSeatsArray.join(', ')}</p>`;
    infoAssentos.innerHTML += `<p>Preço total: R$${totalPrice.toFixed(2)}</p>`;
}

document.addEventListener('DOMContentLoaded', function() {
    const numRows = 10; // Defina o número de fileiras desejado

    const container = document.querySelector('.container');
    const alphabet = 'XABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let rowNumber = 1; rowNumber <= numRows; rowNumber++) {
        const row = document.createElement('div');
        row.classList.add('row');
        container.insertBefore(row, container.lastElementChild);

        for (let seatNumber = 1; seatNumber <= 15; seatNumber++) {
            const seat = document.createElement('div');
            seat.classList.add('seat');
            const seatIdentifier = `${alphabet.charAt(rowNumber)}${seatNumber}`;
            seat.textContent = seatIdentifier;
            row.appendChild(seat);

            seat.addEventListener('click', function() {
                if (!seat.classList.contains('occupied')) {
                    seat.classList.toggle('selected');
                    confirmSeats(); // Chamando a função para atualizar as informações quando um assento é selecionado/deselecionado
                }
            });
        }
    }
});
