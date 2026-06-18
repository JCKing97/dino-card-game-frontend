"use client";

import Link from 'next/link';
import styles from './GameBoard.module.css';
import GameCard from '@/components/GameCard';
import { useState } from "react";
import { GameCardProps, getRandomCard, cardsEqual } from "../../lib/card-utils";

export default function GameBoard() {

  // State to hold the current cards
  const [countDown, setCountDown] = useState(0);
  const [msg, setMsg] = useState("");
  const [cards, setCards] = useState({
    left: getRandomCard(),
    right: getRandomCard(),
  });
  const [gameboard, setGameboard] = useState({
    board: getNewGameboardWithCards(cards.left, cards.right)
  });
  const [msgboard, setMsgboard] = useState({
    board: getNewGameboardWithMessage(msg, countDown)
  });

  // Functions to refresh the cards
  const handleSkip = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (countDown > 0)
      return
    const msg = cardsEqual(cards.left, cards.right) ? "Missed a snap!" : "Well skipped!";
    setCountDown(3);
    setMsg(msg);
    setMsgboard({ board: getNewGameboardWithMessage(msg, 3) });
    startCountdown(msg);
  };
  const handleSnap = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (countDown > 0)
      return
    const msg = cardsEqual(cards.left, cards.right) ? "Snap!" : "Those didn't match!";
    setCountDown(3);
    setMsg(msg);
    setMsgboard({ board: getNewGameboardWithMessage(msg, 3) });
    startCountdown(msg);
  };
  const doRefreshCards = () => {
    const cardLeft = getRandomCard();
    const cardRight = getRandomCard();
    setCards({ left: cardLeft, right: cardRight });
    setGameboard( { board: getNewGameboardWithCards(cardLeft, cardRight) });
  };
  // Start a timer to update the countdown every second
  const startCountdown = (msg: String) => {
    const timer = setInterval(() => {
      setCountDown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          doRefreshCards();
          return 0;
        }
        setMsgboard({ board: getNewGameboardWithMessage(msg, prevCountdown - 1) });
        return prevCountdown - 1;
      });
    }, 1000);
  };

  return (
    <div>
        <div className={styles['game-board-controls']}>
            <h1>Jurassic Jumble</h1>
            <p>Click Snap! when the cards match!</p>
            <div className={styles['game-board-controls-buttons']}>
                <div className={styles['game-board-controls-button']}>
                    <Link href="#" className="btn" onClick={handleSkip}>Skip!</Link>
                </div>
                <div className={styles['game-board-controls-button']}>
                    <Link href="#" className="btn" onClick={handleSnap}>Snap!</Link>
                </div>
            </div>
        </div>
        <div className={styles.gameboard}>
          {countDown > 0 && ( msgboard.board )}
          {countDown <= 0 && ( gameboard.board )}
        </div>
    </div>
  );
}

function getNewGameboardWithCards(cardLeft: GameCardProps, cardRight: GameCardProps): React.ReactNode {
  return (
    <div className={styles['game-board-card-container']}>
        <div className={styles['game-board-card-container']}>
            <GameCard title={cardLeft.title} description={cardLeft.description} image={cardLeft.image} />
        </div>
        <div className={styles['game-board-card-container']}>
            <GameCard title={cardRight.title} description={cardRight.description} image={cardRight.image} />
        </div>
    </div>
  );
}

function getNewGameboardWithMessage(msg: String, countDown: number): React.ReactNode {
  return (
    <div className={styles['game-board-msg-container']}>
      <div className={styles['game-board-msg-container-container']}>
        <div className={styles['game-board-msg']}>
          <p>{msg}</p>  
          <p>{countDown}</p>
        </div>
      </div>
    </div>
  );
}
