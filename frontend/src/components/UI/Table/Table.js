import React from "react";
import { accessObjectProperty } from "../../../utils/helpers";
import classes from "./Table.module.css";

const Table = ({ data, headers, uniqueIdSrc, onClick, isLoading, className }) => {
  const getHeaders = () => {
    return headers.map(({ name, alignCenter }, i) => (
      <th key={i} className={alignCenter && classes.alignCenter}>
        {name}
      </th>
    ));
  };

  const getTableData = () => {
    return data.map((row) => (
      <tr
        key={accessObjectProperty(row, uniqueIdSrc)}
        className={onClick && classes.clickable}
        onClick={() => onClick && onClick(accessObjectProperty(row, uniqueIdSrc))}
      >
        {headers.map(({ formatter, bold, source, subtitle, alignCenter }, i) => {
          let result = formatter
            ? formatter(accessObjectProperty(row, source))
            : accessObjectProperty(row, source);

          return (
            <td className={`${bold && classes.bold} ${alignCenter && classes.alignCenter}`} key={i}>
              {result}
              {subtitle ? (
                <span className={classes.subtitle}>
                  {subtitle.formatter
                    ? subtitle.formatter(accessObjectProperty(row, subtitle.source))
                    : accessObjectProperty(row, subtitle.source)}
                </span>
              ) : null}
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    !isLoading && (
      <div className={classes.root}>
        <table className={className}>
          <thead>
            <tr>{getHeaders()}</tr>
          </thead>

          <tbody>{getTableData()}</tbody>
        </table>
      </div>
    )
  );
};

export default Table;
