import React from "react";
import styles from "style/Modal.module.scss";

export const Modals = ({ isOpen, onClose, title, content, error }) => {
  if (!isOpen) return null;

  return (
    <div className={`${styles.modal} ${styles["is-active"]}`}>
      <div className={styles.card}>
        <header className={styles.head}>
          <p className={styles.title}>{title}</p>
        </header>
        <section className={styles.body}>{content}</section>
        {error && (
          <button
            className={styles.button}
            aria-label="close"
            onClick={onClose}
          >
            Ок
          </button>
        )}
      </div>
    </div>
  );
}; 