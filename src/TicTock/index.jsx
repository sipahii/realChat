import { useState } from "react";

const TicTock = () => {
    const [board, setBoard] = useState(new Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState('X');  
    const [winner, setWinner] = useState(null);

    const handleClick = (index) => {
        if(winner) return;
        const nextBoard = board.map((cell, i) => i === index ? currentPlayer : cell);
        // console.log(nextBoard);
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
        setBoard(nextBoard);
        const win = checkWinner(nextBoard);
        setWinner(win);
    }

    function checkWinner(squares) {
        console.log(squares);
        const lines = [
          [0,1,2],[3,4,5],[6,7,8],
          [0,3,6],[1,4,7],[2,5,8],
          [0,4,8],[2,4,6],
        ];
      
        for (const [a,b,c] of lines) {
        //     console.log(a,b,c);
        //   if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        //     console.log(squares[a],squares[b],squares[c]);
        //     return squares[a];
        //   }
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
        }
        return null;
      }

    return (
        <div className="flex flex-col items-center justify-center">
        <div className="grid grid-cols-3 gap-4">
           
           {board.map((cell, index) => (
                <button
                    key={index}
                    className="w-10 h-10 bg-red-500 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    onClick={() => handleClick(index)}
                    disabled={!!winner || !!cell}
                >
                    {cell}
                </button>
            ))}
            </div>
        {winner && <div className="text-white text-2xl font-bold">Winner: {winner}</div>}
        {!winner && board.every(Boolean) && <div className="text-white text-2xl font-bold">Draw!</div>}
        <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
            onClick={() => {
                setBoard(new Array(9).fill(null));
                setCurrentPlayer("X");
                setWinner(null);
            }}
        >
            {winner || board.every(Boolean) ? "Play again" : "Reset Game"}
        </button>
        </div>
  );
};

export default TicTock;