import styles from "./SuggestionCard.module.scss";

import type { SuggestionCardProps } from "./SuggestionCard.types";

const SuggestionCard = ({
  title,
  description,
  icon: Icon,
}: SuggestionCardProps) => {
  return (
    <button className={styles.card}>
      <Icon size={22} />

      <div className={styles.content}>
        <h3 className={styles.title}>
          {title}
        </h3>

        <p className={styles.description}>
          {description}
        </p>
      </div>
    </button>
  );
};

export default SuggestionCard;