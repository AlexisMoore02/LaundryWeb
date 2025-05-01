import React, { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import styles from "style/Table.module.scss";

export const Table = ({ columns = [], data = [], renderCell, loading = false }) => {
  const [size] = useState("small");

  return (
    <div style={{ overflowY: "auto", height: "95%", position: "relative" }}>
      <table className={styles.journalTable}>
        <thead className={styles.journalThread}>
          <tr>
            <th className={`${styles.thLine} ${styles.thPaddingIndex}`}>№</th>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`${styles.thLine} ${styles.thPadding}`}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.journalTbody}>
          {loading ? (
            <tr>
              <td colSpan={columns.length + 1}>
                <div className={styles.loading}>
                  <Spin indicator={<LoadingOutlined spin />} />
                </div>
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={index}
                className={`${styles.rowHover} ${
                  index % 2 === 0 ? styles.evenRow : styles.noevenRow
                }`}
              >
                <td className={`${styles.thLine} ${styles.thPadding}`}>
                  {index + 1}
                </td>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`${styles.thLine} ${styles.thPadding}`}
                  >
                    {renderCell ? renderCell(item, col.key, index) : item[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
