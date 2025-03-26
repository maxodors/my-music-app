import { useState } from "react";
import MusicTable from "./components/MusicTable";
import FilterPanel from "./components/FilterPanel";
import useMusicData, { RowData } from "./hooks/useMusicData.ts";
import { applyFilters } from "./utils/applyFilters.ts";
import { FILTER_CATEGORIES } from "./constants";

import "./components/MusicTable.css";
import "./components/FilterPanel.css";
import SidebarToggle from "./components/SidebarToggle"; // 👈 Import
import "./components/SidebarToggle.css"; // 👈 Style import

function App() {
  const { data, error } = useMusicData();
  const [filters, setFilters] = useState<Record<string, Record<string, "include" | "exclude">>>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredData = applyFilters(data, filters);

  return (
    <div className="app-wrapper">
      <h1>🎵 Музыкальная База</h1>
      {error && <p>{error}</p>}
  
      {/* Sidebar Toggle Button (floating on the left) */}
      <SidebarToggle
        isOpen={sidebarOpen}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      />
  
      {/* Sidebar Panel */}
      <div id="sidebar-wrapper" className={sidebarOpen ? "open" : ""}>
        <h3>🎧 Фильтры</h3>
        <FilterPanel
          data={data}
          filters={filters}
          setFilters={setFilters}
          filterCategories={FILTER_CATEGORIES}
        />
      </div>
  
      {/* Main Table */}
      <div className="table-wrapper">
        <MusicTable data={filteredData} />
      </div>
    </div>
  );

  <SidebarToggle isOpen={sidebarOpen} onClick={() => setSidebarOpen(!sidebarOpen)} />
}

export default App;