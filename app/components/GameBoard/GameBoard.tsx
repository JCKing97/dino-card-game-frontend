import styles from './GameBoard.module.css';
import Component from 'react';

interface GameBoardProps {
  gameCardLeft: React.ReactNode;
  gameCardRight: React.ReactNode;
}

export default function GameBoard({ gameCardLeft, gameCardRight }: GameBoardProps) {
  return (
    <div className={styles.gameboard}>
      <div className={styles['game-board-card-container']}>
        { gameCardLeft }
      </div>
      <div className={styles['game-board-card-container']}>
        { gameCardRight }
      </div>
    </div>
  );
}
