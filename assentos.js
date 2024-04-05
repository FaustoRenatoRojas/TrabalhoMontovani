function confirmSeats() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const selectedSeatsArray = Array.from(selectedSeats).map(seat => seat.textContent);
    // Aqui você pode fazer algo com as cadeiras selecionadas, como enviar para o servidor ou exibir em algum lugar
    alert(`Cadeiras selecionadas: ${selectedSeatsArray.join(', ')}`);
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
                }
            });
        }
    }
});
