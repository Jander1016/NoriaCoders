import LoadUser from "./load.js";
import {users} from "./users.js";

let users_no_winners = users;

let timerElement;

let winner = document.getElementById("modal__win");
const modal = document.querySelector('.modal');

let maxWidth = window.innerWidth;

function moveElement() {
    let gridPositions = {};
    let elements = document.querySelectorAll('.element');
    let cols, rows

    if(maxWidth > 320) {
        cols = 4
        rows = 5
    }
    else{
        cols = 3
        rows = 7
    }

    elements.forEach(item => {
        let randomColumn = Math.floor(Math.random() * cols) + 1;
        let randomRow = Math.floor(Math.random() * rows) + 1;

        // Verifica si la posición ya está ocupada
        while (gridPositions[randomColumn + '-' + randomRow]) {
            randomColumn = Math.floor(Math.random() * cols) + 1;
            randomRow = Math.floor(Math.random() * rows) + 1;
        }

        // Si la posición no está ocupada, mueve el elemento y registra su posición
        item.style.gridColumn = randomColumn;
        item.style.gridRow = randomRow;
        gridPositions[randomColumn + '-' + randomRow] = true;
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);   
}

function goWin(winner){
    let listUsers = users_no_winners.filter((user )=> user !== winner);
    return listUsers
}

export function reloadUsers(){
    users_no_winners = users;
    LoadUser(users_no_winners);
}

export default function iniciarTemporizador() {

    if(users_no_winners.length === 0)return

    timerElement = setInterval(moveElement, 100);
    setTimeout(() => {
        clearInterval(timerElement)
        let number_win = getRandomInt(0, users_no_winners.length - 1)

        winner.textContent = users_no_winners[number_win]
        
        // console.log(users_no_winners)
        // console.log(users_no_winners[number_win]);
        users_no_winners = goWin(users_no_winners[number_win])
        LoadUser(users_no_winners);
    }, 2000);

    setTimeout(() => modal.classList.add('modal--show'), 2200);

}
