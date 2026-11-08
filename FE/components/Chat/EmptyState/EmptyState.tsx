import { useEffect, useState } from "react";
import styles from "./EmptyState.module.scss";
import VoidLogo from "@/components/VoidLogo/VoidLogo";
import Link from "next/link";
import { getPersonalizedGreeting, getRandomPostfix } from "./EmptyState.utils";
import { useAuth } from "@/hooks/useAuth";

const EmptyState = () => {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("");
  const [postfix, setPostfix] = useState("");

  useEffect(() => {
    setGreeting(getPersonalizedGreeting(user?.name || ""));
    setPostfix(getRandomPostfix());
    
  }, [user?.name]);

  return (
    <section className={styles.emptyState}>
      <div className={styles.icon}>
        <Link href="https://github.com/shaikhyakubhossain/void-engine">
          <VoidLogo size={90} />
        </Link>
      </div>

      <h1 className={styles.title}>{greeting} {postfix}</h1>

      <p className={styles.description}>
        VoidEngine is ready to help with coding, writing, brainstorming, and
        much more.
      </p>
    </section>
  );
};

export default EmptyState;
