import React, { useEffect, useRef, useState } from "react";

import { ListItem } from "@/__generated__/graphql";

interface Props {
  items: ListItem[];
  selectedValue: ListItem;
  sortingAlgorithm: (a: ListItem, b: ListItem) => number;
  onSelect: (item: ListItem) => void;
  children?: React.ReactNode;
}

const Dropdown: React.FC<Props> = ({
  items,
  selectedValue,
  sortingAlgorithm,
  onSelect,
  children
}) => {
  const [filteredItems, setFilteredItems] = useState(items);
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState(selectedValue.name);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sortedItems = [...items].sort(sortingAlgorithm);
    setFilteredItems(sortedItems);
  }, [items, sortingAlgorithm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    const filtered = [...items]
      .filter(item => item.name.toLowerCase().includes(value.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
    setFilteredItems(filtered);
    setHighlightedIndex(-1);
  };

  const handleSelect = (item: ListItem) => {
    setInputValue(item.name);
    onSelect(item);
    setShowDropdown(false);
  };

  const handleFocus = () => {
    setShowDropdown(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 100); // Small delay to allow click to register
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) return;

    switch (e.key) {
      case "ArrowDown":
        setHighlightedIndex(prevIndex =>
          prevIndex === filteredItems.length - 1 ? 0 : prevIndex + 1
        );
        break;
      case "ArrowUp":
        setHighlightedIndex(prevIndex =>
          prevIndex === 0 ? filteredItems.length - 1 : prevIndex - 1
        );
        break;
      case "Enter":
        if (highlightedIndex >= 0) {
          handleSelect(filteredItems[highlightedIndex]);
        }
        break;
      case "Escape":
        setShowDropdown(false);
        break;
      default:
        break;
    }
  };

  const clearSelection = () => {
    setInputValue("");
    onSelect({ id: "", name: "" } as ListItem);
    setFilteredItems(items);
    setHighlightedIndex(-1);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="w-full p-2 pl-2 text-sm text-gray-700"
        placeholder="Search"
      />
      {inputValue && (
        <button
          onClick={clearSelection}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      )}
      {showDropdown && (
        <ul className="absolute max-h-96 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-md">
          {filteredItems.map((item, index) => (
            <li
              key={item.id}
              className={`cursor-pointer p-2 text-sm text-gray-700 hover:bg-gray-100 ${
                index === highlightedIndex ? "bg-gray-100" : ""
              }`}
              onMouseDown={() => handleSelect(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
      {children}
    </div>
  );
};

export default Dropdown;
