export const handleCheckboxChange = (
  value, label, selectedFilter, setSelectedFilter, setSelectedFilters,
  setFilterValue, setFilterVisible, setIsFilterCollapsed
) => {
  const isSame = selectedFilter === value;

  setSelectedFilter(isSame ? null : value);
  setSelectedFilters(isSame ? [] : [value]);
  setFilterValue(isSame ? "" : label);
  setFilterVisible(!isSame); 
  setIsFilterCollapsed(false);
};

export const handleResetFilter = (
  setSelectedFilter, setSelectedFilters, setFilterValue,
  setIsFilterCollapsed
) => {
  setSelectedFilter(null);
  setSelectedFilters([]);
  setFilterValue("");
  setIsFilterCollapsed(false); 
};
export const handleClickOutside = (event, filtersUserRef, setFilterVisible) => {
    if (filtersUserRef.current && !filtersUserRef.current.contains(event.target)) {
    setFilterVisible(false);
    }
  };