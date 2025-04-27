import React from "react";
import styles from "style/Modal.module.scss"

export const DeleteEntry = ({ room, date, time, slotNumber, isOpen, closeModal }) => {
 
  const handleConfirmation = async () => {
     // TO DO REQUEST
  };
 
  if (!isOpen) return null;

  return ( 
    <>
        <section className={styles.body}>
          Вы действительно хотите удалить запись на стирку комнаты {room} на {date} {time}
        </section>

        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={() => handleConfirmation()}
            style={{ background: "#479914" }}
          >
            Удалить
          </button>
          <button
            className={styles.button}
            style={{ background: "#991414" }}
            onClick={closeModal}
          >
            Отмена
          </button>
      </div></>
  );
};
