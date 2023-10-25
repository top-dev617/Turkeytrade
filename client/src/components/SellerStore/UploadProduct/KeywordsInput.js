import React from "react";
import { useState } from "react";

const KeywordsInput = ({ setKeywords, keywords }) => {
  const [keywordInput, setKeywordInput] = useState("");

  const handleKeyword = (e) => {
    e.preventDefault();
    if (keywordInput) {
      setKeywords((prevKeywords) => [...prevKeywords, keywordInput]);
      setKeywordInput("");
    }
    e.target.reset();
  };
  return (
    <form onSubmit={() => handleKeyword()} className="d-flex">
      <input
        type="text"
        name="keyword"
        placeholder="Enter a new task"
        onChange={(e) => setKeywordInput(e.target.value)}
        required={keywords && keywords?.length > 0 ? false : true}
      />
      <button
        type="submit"
        style={{ width: "100px" }}
        className="add_btn pointer"
      >
        Add
      </button>
    </form>
  );
};

export default KeywordsInput;
