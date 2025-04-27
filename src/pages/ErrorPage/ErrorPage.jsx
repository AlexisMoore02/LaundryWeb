import React from "react";
import logo from "assets/images/logo.svg";
import error404 from "assets/images/error404.png";
import styles from "style/ErrorPage.module.scss";
import { Form } from "antd";

const Error = () => {
  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      className={styles.error}
    >
      <div className={styles.content}>
        <img src={logo} className={styles.logo} />
        <p className={styles.text}>
          К сожалению, мы не смогли найти то, что вы искали.
        </p>

        <h1 className={styles.title}>404</h1>

        <a href="/" className={styles.link}>
          На главную страницу
        </a>
      </div>
      <img src={error404} className={styles.img} />
    </Form>
  );
};

export default Error;
