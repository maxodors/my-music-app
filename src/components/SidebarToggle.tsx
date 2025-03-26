import React from "react";
import "./SidebarToggle.css";

interface SidebarToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({ isOpen, onClick }) => {
  return (
    <div
      id="sidebar-toggle"
      className={isOpen ? "open" : ""}
      onClick={onClick}
    >
      <span className="icon arrow">{isOpen ? "◀" : "▶"}</span>
      <span className="label">Фильтры</span>
      <span className="icon folder">📁</span>
    </div>
  );
};

export default SidebarToggle;