import styles from './GameCard.module.css';

interface GameCardProps {
  title: string;
  description: string;
}

export default function GameCard({ title, description }: GameCardProps) {
  return (
    <div className={styles.gamecard}>
      <div className={styles['game-card-content']}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
