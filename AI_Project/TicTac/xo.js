// Game logic
    const turntexet = document.getElementById("status");
    const statustime = document.getElementById("status-time");
    const selectm = document.getElementById("mode");
    const selectd = document.getElementById("difficulty");
    const cellElements = document.querySelectorAll('[data-cell]')
    const table = document.getElementById('game-back')
    const winningMessageElement = document.getElementById('winningMessage')
    const restartButton = document.getElementById('restartButton')
    const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
    const XCLASS = 'x';
    const OCLASS = 'circle';
    let board = ['', '', '', '', '' ,'' ,'' ,'' ,''];
    let lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let XPlayer;
    let IsHard;
    let IsOnePlayer;
    let gameMode = "";
    let difficulty = "";
    let depthfactor;

    document.addEventListener("DOMContentLoaded", function() {
      if (restartButton) {
        restartButton.addEventListener('click', function() {
          window.location.href = "Home_xo.html";
    
        });
      }
    });    



    function start(){
      document.getElementById("gridpage").style.display = "block";
      document.getElementById("typepage").style.display = "none";
     
      gameMode = selectm.value;
      turntexet.innerHTML;
      difficulty = selectd.value;
      currentPlayer = 'X';

      if (gameMode === "One-Player") {
        IsOnePlayer = 1;
        StartOnePlayer();
      } else {
        IsOnePlayer = 0;
        StartTwoPlayer();
      }
  
    };
  






        function checkWin(currentClass) {
          return lines.some(combination => {
            return combination.every(index => {
              return cellElements[index].classList.contains(currentClass)
            })
          })
        }
  






    function StartOnePlayer(){
      switch(difficulty){
        case 'Esay':
          depthfactor = 0.33;
          break
        case 'Medium':
          depthfactor = 0.77;
          break
        case 'Hard':
          depthfactor = 1;
          IsHard = true;
          break
      }

      XPlayer = true;
      cellElements.forEach(cell => {
      cell.classList.remove(XCLASS)
      cell.classList.remove(OCLASS)
      cell.removeEventListener('click', handleClick)
      cell.addEventListener('click', handleClick, { once: true })
      })
      setBoardHoverClass();
      winningMessageElement.classList.remove('show')
      ComputerPlay();
    }

    function StartTwoPlayer(){
      XPlayer = true;
      cellElements.forEach(cell => {
      cell.classList.remove(XCLASS)
      cell.classList.remove(OCLASS)
      cell.removeEventListener('click', handleClick)
      cell.addEventListener('click', handleClick, { once: true })
      })
      setBoardHoverClass();
      winningMessageElement.classList.remove('show')
    }
    

    function handleClick(e) {
      const cell = e.target
      const currentClass = XPlayer ? XCLASS : OCLASS
      turntexet.innerText = `${XPlayer ? "O's" : "X's"} Turn!`
      cell.classList.add(currentClass)
      if (checkWin(currentClass)) {
        endGame(false)
      } else if (isDraw()) {
        endGame(true)
      } else {
        XPlayer = ! XPlayer;
        setBoardHoverClass();
        if(IsOnePlayer)
          ComputerPlay();
      }
    }



    function endGame(draw) {
      if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
      } else {
        winningMessageTextElement.innerText = `${!XPlayer ? "O's" : "X's"} Wins!`
      }
      winningMessageElement.classList.add('show')
    }


    
    function isDraw() {
      return [...cellElements].every(cell => {
        return cell.classList.contains(XCLASS) || cell.classList.contains(OCLASS)
      })
    }





    function setBoardHoverClass() {
      table.classList.remove(XCLASS)
      table.classList.remove(OCLASS)
      if (XPlayer) {
        table.classList.add(XCLASS)
      } else {
        table.classList.add(OCLASS)
      }
    }



    function ComputerPlay(){
      //cellElements.style.cursor = 'not-allowed';
      var depth = 0.0
      for(let i = 0; i < cellElements.length; i++){
        if (cellElements[i].classList.contains(XCLASS))
          board[i] = 'X';
        else if (cellElements[i].classList.contains(OCLASS))
          board[i] = 'O';
        else
          board[i] = ''    
      }

      for(let i = 0; i < board.length; i++){
        if(board[i] == null)
            depth++;
      }
      depth = depth * depthfactor;
      depth = Math.round(depth)
      turntexet.innerText = `${XPlayer ? "O's" : "X's"} Turn!`
      // if(difficulty == "Easy"){
      //   randomplay();
      // }
      // else{
      const pos = getBestMove(depth);
      statustime.innerHTML = pos;
      console.log(pos)
      cellElements[pos].classList.add(XPlayer ? XCLASS : OCLASS);
      // }

      if (checkWin(XCLASS)) {
        endGame(false)
      } else if (isDraw()) {
        endGame(true)
      } else {
        XPlayer = ! XPlayer;
        setBoardHoverClass();
      }
    }

  function randomplay(){
    do{
      index = Math.floor(Math.random() * 9)
      
    }while((cellElements[index].classList.contains(XCLASS) || cellElements[index].classList.contains(OCLASS)))
    cellElements[index].classList.add(XCLASS);
  }


  
  
  function checkGameState() {
    let winner = null
  
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] == board[b] && board[b] == board[c] && board[a] != '') {
        winner = board[a];
      }
    }
    let emptyN = 0;
    for(let i = 0; i < board.length; i++){
      if(board[i] == '')
        emptyN ++;
    }
    if(emptyN == 0 && winner == null)
      return 'draw'
    else 
      return winner;

  }

  
  function alphaBetaPruning(board, depth, alpha, beta, isMaximizingPlayer) {
    let gameState = checkGameState(board);
    if(IsHard){
      if (gameState != null) {
        //console.log('$')
        switch(gameState){
          case 'X':
            return 1
          case 'O':
            return -1
          case 'draw':
            return 0
        }
      }
   }
   else{
    if(depth == 0)
      return evaluateBoard(board);
   }
  
    if (isMaximizingPlayer) {
      let maxEval = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] == '') {
          board[i] = 'X';
          maxEval = Math.max(maxEval, alphaBetaPruning(board, depth - 1, alpha, beta, false));
          board[i] = '';
          alpha = Math.max(alpha, maxEval);
          if (beta <= alpha) {
            break;
          }
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] == '') {
          board[i] = 'O';
          minEval = Math.min(minEval, alphaBetaPruning(board, depth - 1, alpha, beta, true));
          board[i] = '';
          beta = Math.min(beta, minEval);
          if (beta <= alpha) {
            break;
          }
        }
      }
      return minEval;
    }
  }

  
  function getBestMove(depth) {
    let bestEval =  -Infinity;
    let bestMove = 0;
  
    for (let i = 0; i < board.length; i++) {
      if (board[i] == '') {
        board[i] =  'X';
        let eval = alphaBetaPruning(board, depth, -Infinity, Infinity, false);
        
        board[i] = '';
  
        if ((eval > bestEval)) {
          bestEval = eval;
          bestMove = i;
        }
      }
    }
  
    return bestMove;
  }









  
  
  function evaluateBoard(boardG) {
    let xeval = 0 ;
    let oeval = 0;
    let row = []
    let col = []
    let dig = []
    for(let i = 0; i < boardG.length; i++){
      row[i % 3] = boardG[i]
      if ((i + 1) % 3 == 0){
        xeval += possibleWin(row, true)
        oeval += possibleWin(row, false)
        row = []
      }
    }
  

  for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
      col[j] = boardG[(i * 3) + j]
      if ((j + 1) % 3 == 0){
        xeval += possibleWin(col, true)
        oeval += possibleWin(col, false)
        col = []
      }
    }
  }
  dig = [boardG[0], boardG[4], boardG[8]]
  xeval += possibleWin(dig, true)
  oeval += possibleWin(dig, false)
  dig = [boardG[2], boardG[4], boardG[6]]
  xeval += possibleWin(dig, true)
  oeval += possibleWin(dig, false)
  return xeval - oeval
}
    

function possibleWin(cells, isX){
  let count = 1;
  if(isX){
    for(let i = 0; i < cells.length; i++){
      if (cells[i] == 'O')
      {
        count = 0;
        break
      }
    }
  }
  else{
    for(let i = 0; i < cells.length; i++){
      if (cells[i] == 'X')
      {
        count = 0;
        break
      }
    }
  }
  return count;
}






  
  
  





    
    

  


