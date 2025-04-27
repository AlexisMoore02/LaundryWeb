import React, { useRef } from "react";
import { Form } from "antd";
import styles from "style/Auth.module.scss";
import logo from "assets/images/logo.svg";

const AuthForm = ({
  title,
  fields,
  onSubmit,
  error,
  msg,
  link,
  textLink,
  children,
}) => {
  const errRef = useRef();

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      autoComplete="off"
      className={styles.auth}
      onSubmitCapture={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <img src={logo} className={styles.logo} alt="Logo" />
      {title && (
        <div className={styles.header}>
          <h2 className={styles.text}>{title}</h2>
        </div>
      )}
      {fields.map(({ label, icon: Icon, ...inputProps }, idx) => (
        <div className={styles.form} key={idx}>
          <label className={styles.label}>{label}</label>
          <div className={styles.input}>
            {Icon && <Icon style={{ fontSize: "2.2vh", color: "cccccc" }} />}
            <input {...inputProps} required />
          </div>
        </div>
      ))}
      <button className={styles.button} type="submit">
        {children}
      </button>
      <a href={link} className={styles.link}>
        {textLink}
      </a>
      <div className={styles.notific}>
        <p
          className={error ? styles.error : styles.offscreen}
          aria-live="assertive"
          ref={errRef}
        >
          {error}
        </p>
      </div>
    </Form>
  );
};

export default AuthForm;
