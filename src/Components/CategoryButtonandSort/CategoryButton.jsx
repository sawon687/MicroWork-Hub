'use client'

import React, { useState } from "react";
import Button from '../Ui/Button';

const CategoryButton = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    console.log('activeCategory',activeCategory)
  return (
    <>
      {/* Category Buttons */}
      <div className="flex flex-wrap gap-2">
        {[
          "All",
          "Review",
          "Translation",
          "Testing",
          "Data Entry",
          "Writing",
          "Design",
        ].map((item, i) => (
          <Button onClick={()=> setActiveCategory(item)} key={i} className={`${activeCategory===item ? 'primary' : 'secondary'}`}>
            {item}
          </Button>
        ))}
      </div>
    </>
  );
};

export default CategoryButton;
