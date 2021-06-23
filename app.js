const field = document.querySelector('.field');
const cellSize = 50;
let zeros = [0,1,2,8,9,10,16,17,18];
let crosses = [45,46,47,53,54,55,61,62,63];

const firstcell = {};
const whichGamer = {gamer: 'O'};

function move(index, zeros, crosses, cells){
    const cell = cells[index];

    if (!cell.isEmpty) {
        firstcell.left = cell.left;
        firstcell.top = cell.top;
        firstcell.index = cell.index;
    }

    if (cell.isEmpty && firstcell.inner !== ''){
        const leftDiff = Math.abs(firstcell.left - cell.left);
        const topDiff = Math.abs(firstcell.top - cell.top); 
           
        if(leftDiff + topDiff > 1){
                 return;
            }
        
            if(zeros.includes(firstcell.index) && whichGamer.gamer === 'O'){
            let ind;
            for (let j = 0; j < zeros.length; j++){
                if (zeros[j] === firstcell.index) ind = j; 
            }
               
            zeros.splice(ind, 1, index);
            whichGamer.gamer =  'X';
            rerender(zeros, crosses);
        }
        
        if(crosses.includes(firstcell.index) && whichGamer.gamer === 'X'){
            let ind;
            for (let j = 0; j < crosses.length; j++){
                if (crosses[j] === firstcell.index) ind = j; 
            }

            crosses.splice(ind, 1, index);
            whichGamer.gamer = 'O';
            rerender(zeros, crosses);
        }
   }
  
}


function rerender(zeros, crosses) {
    field.innerHTML = '';
    cells = [];

    let winO = 0;
    for(let k = 0; k < zeros.length; k++){
        if(zeros[k] >= 40 && zeros[k] <= 63){
            winO++;
        } 
    }
    if (winO === 9) alert("O Win");
        
    let winX = 0;
    for(let k = 0; k < crosses.length; k++){
        if(crosses[k] >= 0 && crosses[k] <= 23){
            winX++;
        } 
    }
    if (winX === 9) alert("X Win");


    for (let i = 0; i < 64; i++){
        const cell = document.createElement('div');
        cell.classList.add('cell');
        
        if (zeros.includes(i)){
            cell.innerHTML = 'O';
        }
        if(crosses.includes(i)){
            cell.innerHTML = 'X';
        }
        
        




        const left = i % 8;
        const top = (i - left) / 8;
        const isEmpty = cell.innerHTML ? false : true;
    
        cells.push({
            left: left,
            top: top,
            element: cell,
            isEmpty: isEmpty,
            index: i
        })
    
    
        cell.style.left = `${left * cellSize}px`;
        cell.style.top = `${top * cellSize}px`;
    
        field.append(cell);
    
        cell.addEventListener('click', () => {
            move(i, zeros, crosses, cells);
        })
    }
}
rerender(zeros, crosses);