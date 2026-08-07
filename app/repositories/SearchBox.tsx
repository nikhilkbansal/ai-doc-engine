"use client";

import { useState } from "react";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  return (
    <input
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
      }}
      placeholder="search repositories"
    />
  );
}