// No 1: Calculator with Callback
function calculator(a, b, operationCallback) {
    if (typeof operationCallback === 'function') {
        return operationCallback(a, b);
    } else {
        throw new Error("Callback is not a function");
    }
}

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;

console.log("No 1: Calculator Results");
console.log(calculator(10, 5, add)); 
console.log(calculator(10, 5, subtract)); 

// No 2: Find Depth of Tree
function findDepth(tree, nodeId) {
    function getDepth(nodeId) {
        const children = tree.filter(node => node.upline === nodeId);
        if (children.length === 0) {
            return 1; // Jika tidak ada anak, kedalamannya adalah 1
        }
        return 1 + Math.max(...children.map(child => getDepth(child.id)));
    }

    return getDepth(nodeId);
}

const tree = [
    { id: 'a', upline: '0' }, { id: 'b', upline: 'a' }, { id: 'c', upline: 'a' },
    { id: 'cc', upline: 'a' }, { id: 'd', upline: 'b' }, { id: 'e', upline: 'b' },
    { id: 'f', upline: 'c' }, { id: 'g', upline: 'c' }, { id: 'gg', upline: 'cc' },
    { id: 'h', upline: 'd' }, { id: 'i', upline: 'd' }, { id: 'ii', upline: 'gg' },
    { id: 'j', upline: 'h' }, { id: 'k', upline: 'h' }, { id: 'hh', upline: 'ii' },
    { id: 'kk', upline: 'hh' }
];

console.log("\nNo 2: Tree Depth Results");
console.log(findDepth(tree, 'a'));  
console.log(findDepth(tree, 'cc')); 
console.log(findDepth(tree, 'e'));  

// No 3: Solve Sudoku
function createBoard(input) {
    const board = [];
    for (let i = 0; i < input.length; i += 9) {
        board.push(input.slice(i, i + 9).split('').map(Number));
    }
    return board;
}

const input = "105802000090076405200400819019007306762083090000061050007600030430020501600308900";
const board = createBoard(input);
console.log("\nNo 3: Sudoku Board");
console.log(board);

function isValidRow(board, row) {
    const nums = new Set();
    for (let num of board[row]) {
        if (num !== 0 && nums.has(num)) return false;
        nums.add(num);
    }
    return true;
}

function isValidCol(board, col) {
    const nums = new Set();
    for (let i = 0; i < 9; i++) {
        const num = board[i][col];
        if (num !== 0 && nums.has(num)) return false;
        nums.add(num);
    }
    return true;
}

function isValidBox(board, startRow, startCol) {
    const nums = new Set();
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const num = board[startRow + i][startCol + j];
            if (num !== 0 && nums.has(num)) return false;
            nums.add(num);
        }
    }
    return true;
}

function solveSudoku(board) {
    function isValidPlacement(board, row, col, num) {
        if (board[row].includes(num)) return false;
        for (let i = 0; i < 9; i++) if (board[i][col] === num) return false;
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[startRow + i][startCol + j] === num) return false;
            }
        }
        return true;
    }

    function solve(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    for (let num = 1; num <= 9; num++) {
                        if (isValidPlacement(board, row, col, num)) {
                            board[row][col] = num;
                            if (solve(board)) return true;
                            board[row][col] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    solve(board);
    return board;
}

const solvedBoard = solveSudoku(board);
console.log("\nNo 3: Solved Sudoku Board");
console.log(solvedBoard);
