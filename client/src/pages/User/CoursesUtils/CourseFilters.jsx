
import React, { useEffect } from "react";
import { filterItems } from "./CourseElements.js";

import { Label } from "@/components/ui/label.jsx";
import { Checkbox } from "@/components/ui/checkbox";

const CourseFilters = ({ filter, handleFilter }) => {
    
    
  return (
    <div>
      {Object.entries(filterItems).map(([filterKey, filterValues]) => (
        <div key={filterKey} className="space-y-5 my-5">
          {/* Section Header */}
          <h2 className="text-xl font-bold text-white capitalize">
            {filterKey}
          </h2>
          {/* Filter Options */}
          <div className="flex flex-col justify-center gap-3 ml-3">
            {filterValues.map((item) => (
              <Label
                key={item.id}
                className="flex items-center gap-2 text-white"
              >
                <Checkbox
                  className="border-white"
                  value={item.id}
                  onCheckedChange={() => handleFilter(filterKey, item.id)}
                  checked={filter?.[filterKey]?.includes(item.id) || false}
                />
                {item.label}
              </Label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseFilters;
