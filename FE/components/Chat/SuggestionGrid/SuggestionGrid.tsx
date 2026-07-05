import styles from "./SuggestionGrid.module.scss";

import SuggestionCard from "../SuggestionCard";

import { SUGGESTIONS } from "./SuggestionGrid.constants";

const SuggestionGrid = () => {
  return (
    <section className={styles.grid}>
      {SUGGESTIONS.map((suggestion) => (
        <SuggestionCard
          key={suggestion.id}
          {...suggestion}
        />
      ))}
    </section>
  );
};

export default SuggestionGrid;