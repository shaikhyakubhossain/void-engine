import { Sparkles } from "lucide-react";

import styles from "./EmptyState.module.scss";

const EmptyState = () => {
  return (
    <section className={styles.emptyState}>
      <div className={styles.icon}>
        <Sparkles size={36} />
      </div>

      <h1 className={styles.title}>
        How can I assist you today?
      </h1>

      <p className={styles.description}>
        VoidEngine is ready to help with coding,
        writing, brainstorming, and much more.
      </p>
    </section>
  );
};

export default EmptyState;