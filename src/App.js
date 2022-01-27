import React, { useState,useEffect } from 'react';
import './styles/tictactoe.css';

function App() {

    document.body.style.backgroundImage = `url("paper.jpg")`;

    const [tictactoe, setTictactoe] = useState({
        gameStatus: true,
        moves: [0,1,2,3,4,5,6,7,8],
        message: null,
        playerMoves: [],
        AIMoves: [],
        winMoves: [
                   [0, 1, 2],
                   [3, 4, 5],
                   [6, 7, 8],
                   [0, 3, 6],
                   [1, 4, 7],
                   [2, 5, 8],
                   [2, 4, 6],
                   [0, 4, 8]
        ]
    });

    function handleAI() {
        if (tictactoe.moves.length < 1 || !tictactoe.gameStatus) {
            return
        } else {
            const RandMove = Math.floor(Math.random() * tictactoe.moves.length);
            document.getElementById(tictactoe.moves[RandMove]).innerHTML = "O";
            const prevState = tictactoe;
            const AIMove = prevState.moves.splice(RandMove, 1);
            prevState.AIMoves.push(AIMove.pop());
            setTictactoe({ ...prevState });
        }
    }

    function handleCondition(player) {

        const usedMoves = player ? tictactoe.playerMoves : tictactoe.AIMoves;

        for (let i = 0; i < tictactoe.winMoves.length; i++) {
            let similarity = 0;
            for (let j = 0; j < usedMoves.length; j++) {
                if (tictactoe.winMoves[i].includes(usedMoves[j])) {
                    similarity++;
                }
            }

            if (similarity > 2) {

                const prevState = tictactoe;

                if (player) {
                    prevState.gameStatus = false;
                    prevState.message = "Player has won";
                    setTictactoe({ ...prevState });
                    return
                } else {
                    prevState.gameStatus = false;
                    prevState.message = "Computer has won";
                    setTictactoe({ ...prevState });
                    return
                }
            }
        }
        if (tictactoe.moves.length < 1 && tictactoe.gameStatus) {
            const prevState = tictactoe;
            prevState.gameStatus = false;
            prevState.message = "Draw";
            setTictactoe({ ...prevState });
        }
    }

    function handleTurn(event) {

        if (!tictactoe.gameStatus) {
            const prevState = tictactoe;
            prevState.message = "Game has been ended";
            setTictactoe({ ...prevState });
            return
        }

        const pos = tictactoe.moves.indexOf(parseInt(event.target.id));

        if (pos < 0) {
            const prevState = tictactoe;
            prevState.message = "Position already in use";
            setTictactoe({ ...prevState });
        } else {
            document.getElementById(event.target.id).innerHTML = "X";
            const prevState = tictactoe;
            prevState.message = null;
            const playerMove = prevState.moves.splice(pos, 1);
            prevState.playerMoves.push(playerMove.pop());
            setTictactoe({ ...prevState });
            handleCondition(true);
            handleAI();
            handleCondition(false);

            

        }
    }

    const msg = tictactoe.message && <span className="messages">{tictactoe.message}</span>

    useEffect(() => {
        console.log(tictactoe);
    }, [tictactoe]);

    return (
        <div className="tictactoe">

          <header className="header">
              TicTacToe
            </header>

            <p className="messages">
                { msg }
            </p>

                <table className="table">
              <tbody>
                  <tr>
                        <td id="0" onClick={ handleTurn }>
                             
                      </td>
                        <td id="1" onClick={handleTurn}>
                              
                      </td>
                        <td id="2" onClick={handleTurn}>
                            
                      </td>
                  </tr>
                  <tr>
                        <td id="3" onClick={handleTurn}>
                            
                      </td>
                        <td id="4" onClick={handleTurn}>
                            
                      </td>
                        <td id="5" onClick={handleTurn}>
                            
                      </td>
                  </tr>
                  <tr>
                        <td id="6" onClick={handleTurn}>
                            
                      </td>
                        <td id="7" onClick={handleTurn}>
                            
                      </td>
                        <td id="8" onClick={handleTurn}>
                            
                      </td>
                  </tr>
              </tbody>
            </table>

    </div>
  );
}

export default App;
