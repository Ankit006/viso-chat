import React, { useState } from "react";

export default function InputField({
  fieldName,
  fieldType,
  data,
  extraClass = "",
}) {
  const [fieldEffect, setFieldEffect] = useState("");
  const handleFocus = () => {
    setFieldEffect("inputDataFocus");
  };
  const handleBlurEffect = () => {
    setFieldEffect("");
  };

  return (
    <div>
      <label className="labelValue">{fieldName}</label>
      <input
        className={`inputData ${fieldEffect} ${extraClass}`}
        onChange={data}
        type={fieldType}
        onFocus={handleFocus}
        onBlur={handleBlurEffect}
      />
    </div>
  );
}
