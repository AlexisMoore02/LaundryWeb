import React, { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { markdown } from "constants/markdowntest";

import { closeModal } from "store/actions/errorActions";

import * as Component from "components/index";
import * as useHook from "hooks/index";
import * as Utils from "utils/index";

import { RiEditLine } from "react-icons/ri";
import "./markdown.scss";

const Position = () => {
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [laundryValues, setLaundryValues] = useState([]);
  const [markdownContent, setMarkdownContent] = useState("");
  const [editableRowId, setEditableRowId] = useState(null);
  const [editedPosition, setEditedPosition] = useState({});
  const [position, setPosition] = useState("");

  const { fetchData } = useHook.useApi();

  const errorModal = useSelector((state) => state.error.modalData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filtersUserRef = useRef(null);

  useEffect(() => {
    Utils.Position.fetchLaundryData(
      fetchData,
      setLaundryValues,
      setLoading,
      dispatch,
      navigate
    );

    setMarkdownContent(markdown); // предполагаем, что это строка markdown
  }, []);

  const filters = useMemo(
    () =>
      Utils.Position.getPositionFilters({
        userId,
        setUserId,
        setLaundryValues,
        dispatch,
      }),
    [userId]
  );

  const columns = [
    { key: "user_id", title: "ID пользователя" },
    { key: "position", title: "Позиция" },
  ];
  const renderCell = useMemo(
    () =>
      Utils.Position.getPositionRenderCell(
        editedPosition,
        editableRowId,
        setEditableRowId,
        position,
        setPosition,
        setEditedPosition
      ),
    [editedPosition, editableRowId, position]
  );
  return (
    <>
      <Component.Filters filters={filters} filtersRef={filtersUserRef} />

      <div
        style={{
          display: "flex",
          flex: 1,
          maxHeight: "74vh",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            flex: 1,
            maxHeight: "74vh",
            overflowY: "auto",
            padding: "1vh",
          }}
          className="markdown-body markdown-wrapper"
        >
          <RiEditLine
            className="edit-icon"
            onClick={() => console.log("Редактировать Markdown")}
          />
          <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </div>
        <div style={{ flex: 1, maxHeight: "78vh" }}>
          <Component.Table
            columns={columns}
            data={laundryValues}
            loading={loading}
            renderCell={renderCell}
          />
        </div>
      </div>

      <Component.Modals
        isOpen={errorModal.isOpen}
        onClose={() => dispatch(closeModal())}
        title={errorModal.title}
        content={errorModal.content}
        error={true}
      />
    </>
  );
};

export default Position;
