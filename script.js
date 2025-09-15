const sudokuGrid = document.getElementById("sudokuGrid");
const solveBtn = document.getElementById("solveBtn");
const solutionGrid = document.getElementById("solutionGrid");

// Create 9x9 input grid
for(let i=0;i<81;i++){
    const input = document.createElement("input");
    input.setAttribute("type","number");
    input.setAttribute("min","1");
    input.setAttribute("max","9");
    sudokuGrid.appendChild(input);
}

// Solve button click
solveBtn.addEventListener("click", () => {
    const inputs = Array.from(sudokuGrid.querySelectorAll("input"));
    const grid = [];
    for(let i=0;i<9;i++){
        const row = [];
        for(let j=0;j<9;j++){
            const val = parseInt(inputs[i*9+j].value);
            row.push(isNaN(val)?0:val);
        }
        grid.push(row);
    }
    const solution = solveSudoku(grid);
    displaySolution(solution);
});

// Display solution
function displaySolution(grid){
    solutionGrid.innerHTML = "";
    grid.forEach(row => {
        row.forEach(num => {
            const cell = document.createElement("div");
            cell.textContent = num;
            solutionGrid.appendChild(cell);
        });
    });
}

// Sudoku solver
function isValid(board, row, col, num){
    for(let i=0;i<9;i++){
        if(board[row][i]===num || board[i][col]===num) return false;
    }
    const startRow = row - row%3;
    const startCol = col - col%3;
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(board[startRow+i][startCol+j]===num) return false;
        }
    }
    return true;
}

function solveSudoku(board){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(board[i][j]===0){
                for(let num=1;num<=9;num++){
                    if(isValid(board,i,j,num)){
                        board[i][j]=num;
                        if(solveSudoku(board)) return board;
                        board[i][j]=0;
                    }
                }
                return false;
            }
        }
    }
    return board;
}
