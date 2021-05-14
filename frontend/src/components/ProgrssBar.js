import React from "react";

export default function ProgrssBar({ complete }) {
  return (
    <div className="progrssBar-container">
      <div style={{ width: `${complete}%` }} className="fillerStyle">
        <span className="labelStyle">{`${complete}%`}</span>
      </div>
    </div>
  );
}
