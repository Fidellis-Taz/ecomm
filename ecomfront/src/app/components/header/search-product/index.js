import React, { useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { GetCategoryDetails } from "../../../components/services";
import { useHistory } from "react-router-dom";

import "./index.css";
const Searchproduct = () => {
  let history = useHistory();
  const [data, setData] = useState([]);

  const handleOnSearch = async (string, results) => {
    if (string.length > 1) {
      let p = { search_text: string };
      let list = await GetCategoryDetails.getSearchByCatList(p);
      setData(list.data);
    }
  };

  const handleOnSelect = (item) => {
    history.push("/product/catalogsearch/result/" + item.name);
  };

  return (
    <div className="search_bar_enw">
      <ReactSearchAutocomplete
        className="form-control"
        items={data.length ? data : ""}
        placeholder="Search for products"
        onSearch={handleOnSearch}
        // onHover={handleOnHover}
        onSelect={handleOnSelect}
        // onFocus={handleOnFocus}
        autoFocus
      />
    </div>
  );
};
export default Searchproduct;
