import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CustomTextEditor = () => {
  const [description, setDescription] = useState("");
  const handleDescription = (e) => {
    setDescription(e);
  };
  return (
    <ReactQuill value={description} onChange={(e) => handleDescription(e)} />
  );
};

export default CustomTextEditor;
