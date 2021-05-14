import React from "react";

export default function ProfileImageUpload({ src }) {
  return (
    <div>
      <input type="file" id="profile" hidden />
      <label for="profile">
        <img src={src} alt="profile" height="100" width="100" />
      </label>
    </div>
  );
}
