import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "antd"; 
import styles from "style/CreateAdmin.module.scss";
import logo from "assets/images/logo.svg";


const CreateAdmin = () => {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [roles, setRoles] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  function Cancel() {
    navigate({
      pathname: "/ ",
    });
  }

  const handleAdmin = async () => {
  // TO DO REQUEST
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      autoComplete="off"
      className={styles.admin}
    >
      <img src={logo} className={styles.logo} />
      <div className={styles.header}>
        <h2 className={styles.text}>Добавление админа</h2>
        <p className={styles.errors}>{error}</p>
      </div>
      <div className={styles.form}>
        <label className={styles.label}>Логин:</label>
        <input
          style={{ border: "0", background: "none" }}
          className={styles.input}
          type="text"
          name="username"
          size="26"
          placeholder="Username"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
        />
      </div>
      <div className={styles.form}>
        <label className={styles.label}>Имя:</label>
        <input
          style={{ border: "0", background: "none" }}
          className={styles.input}
          type="text"
          name="username"
          size="26"
          placeholder="Name admin"
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoComplete="username"
          required
        />
      </div>
      <div className={styles.form}>
        <label className={styles.label}>Фамилия:</label>
        <input
          style={{ border: "0", background: "none" }}
          className={styles.input}
          type="text"
          size="26"
          placeholder="Last name"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          required
        />
      </div>
      <div className={styles.form}>
        <label className={styles.label}>Эл.адрес:</label>
        <input
          style={{ border: "0", background: "none" }}
          className={styles.input}
          type="text"
          size="26"
          placeholder="email"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          required
        />
      </div>
      <div className={styles.form}>
        <label className={styles.label}>VK ID</label>
        <input
          style={{ border: "0", background: "none" }}
          className={styles.input}
          type="text"
          size="26"
          placeholder="vk id"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          required
        />
      </div>
      <div className={styles.form}>
        <label className={styles.label}>Роль:</label>
        <select
          className={styles.select}
          onChange={(e) => setRoles(e.target.value)}
          value={roles}
          required
        >
          <option value="">Выберите роль</option>
          <option value="God">Главный администратор</option>
          <option value="Admin">Администратор</option>
          {/* Add more roles as needed */}
        </select>
      </div>

      <div className={styles.buttons}>
        <button
          className={styles.button}
          style={{ background: "#479914" }}
          onClick={() => handleAdmin() && Cancel()}
        >
          Создать
        </button>
        <button
          className={styles.button}
          style={{ background: "#991414" }}
          onClick={()=>Cancel()}
        >
          Отменить
        </button>
      </div>
    </Form>
  );
};

export default CreateAdmin;
