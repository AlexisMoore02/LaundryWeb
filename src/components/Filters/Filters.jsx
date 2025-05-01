import React from "react";

import { IoIosSearch } from "react-icons/io";
import { AiOutlineDown, AiOutlineUp, AiOutlineClose } from "react-icons/ai";
import Calendar from "react-calendar";
import filterStyles from "style/Filters.module.scss";
import "react-calendar/dist/Calendar.css";
import "style/Calendar.scss";

export const Filters = ({ filters, filtersRef }) => {
  return (
    <div className={filterStyles.filters} ref={filtersRef}>
      {filters.map((filter, index) => {
        if (filter.type === "input") {
          return (
            <div className={filterStyles.search} key={index}>
              {filter.showError && (
                <p className={filterStyles.error}>{filter.errorMessage}</p>
              )}
              <div className={filterStyles.inputWrapper}>
                <input
                  type="text"
                  placeholder={filter.placeholder}
                  value={filter.value}
                  onChange={(e) => filter.onChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      filter.onEnter();
                    }
                  }}
                />
              </div>

              <button
                type="button"
                className={filterStyles.searchBtn}
                onClick={filter.onSearch}
              >
                <IoIosSearch size={"2vh"} />
              </button>
            </div>
          );
        }

        if (filter.type === "calendar") {
          return (
            <div className={filterStyles.calendar} key={index}>
              <button
                className={filterStyles.calendarBtn}
                onClick={() => filter.setCalendarVisible(!filter.calendarVisible)}
              >
                <input
                  readOnly
                  type="text"
                  className={filterStyles.input}
                  placeholder="Выберите дату"
                  value={ filter.value !== 0 ? `${filter.value[0]} - ${filter.value[1]}` : "Выберите дату"}
                />
                {filter.calendarVisible ? <AiOutlineUp /> : <AiOutlineDown />}
              </button>
              {filter.calendarVisible && (
                <Calendar
                  onChange={filter.onChange}
                  selectRange={true}
                  className={"react-calendar"}
                />
              )}
            </div>
          );
        }

        if (filter.type === "select") {
          return (
            <div className={filterStyles.select} key={index}>
              <button
                className={filterStyles.selectBtn}
                onClick={filter.onToggle}
                style={{ position: "relative" }}
              >
                {filter.value || "Выберите фильтр"}
                {filter.visible && !filter.collapsed && (
                  <AiOutlineUp onClick={filter.onClose} />
                )}
                {!filter.visible &&
                  (!filter.selected && !filter.collapsed ? (
                    <AiOutlineDown onClick={filter.onToggleCollapse} />
                  ) : (
                    <AiOutlineClose
                      onClick={() => {
                        filter.onReset();
                        filter.onRequest();
                      }}
                    />
                  ))}
              </button>

              {filter.visible && !filter.collapsed && (
                <div className={filterStyles.checkboxList}>
                  {filter.options.map((option) => (
                    <div key={option.value}>
                      <input
                        type="checkbox"
                        id={`box-${option.value}`}
                        checked={filter.selectedValues.includes(option.value)}
                        onChange={() =>
                          filter.onCheckboxChange(option.value, option.label)
                        }
                        disabled={
                          filter.selected && filter.selected !== option.value
                        }
                      />
                      <label
                        htmlFor={`box-${option.value}`}
                        className={
                          filter.selected !== option.value
                            ? filterStyles.inactive
                            : ""
                        }
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};
