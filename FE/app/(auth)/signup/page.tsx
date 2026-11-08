"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import styles from "../styles.module.scss";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      await signup({
        name,
        email,
        password,
      });

      router.push("/");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Invalid email or password.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Create your account</h1>
        <p className={styles.subtitle}>Sign up to start using Void Engine.</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Name</label>
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="John Doe"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>

          <p className={styles.error}>{error}</p>

          <button className={styles.button}>Create account</button>
        </form>

        <p className={styles.footer}>
          Already have an account?{" "}
          <a className={styles.link} href="/login">
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}
