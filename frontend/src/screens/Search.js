import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import BottomNavBar from "../components/BottomNavBar";
import axios from "axios";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { VIEW_ACCOUNT } from "../state/stateConstant";
import loadingAnimation from "../img/Ellipsis-1s-200px.svg";
import DOMPurify from "dompurify";

function Search({ dispatch, accountId }) {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [error, setError] = useState("");
  const history = useHistory();

  const onChangeHandler = (e) => {
    setSearchValue(DOMPurify.sanitize(e.target.value));
  };

  const searchHandler = async () => {
    setLoading(true);
    setError("");
    const res = await axios.get(`/api/searchUser?username=${searchValue}`);
    if (res.data.status === "success") {
      setSearchResult(res.data.result);
      setLoading(false);
    } else if (res.data.status === "not found") {
      setError("Not Found");
      setLoading(false);
    }
  };

  const viewAccount = (e) => {
    if (e.target.getAttribute("account") === accountId) {
      history.push("/account");
      return;
    }
    dispatch({ type: VIEW_ACCOUNT, payload: e.target.getAttribute("account") });
    history.push("/viewaccount");
  };

  return (
    <>
      <SearchBar
        searchHandler={searchHandler}
        onChangeHandler={onChangeHandler}
        value={searchValue}
      />
      {searchResult.map((result) => (
        <div key={result._id} className="searchResult">
          <img
            src={result.profileImage.imageUrl}
            alt="profileImage"
            height="40"
            width="40"
            account={result._id}
            onClick={viewAccount}
          />
          <p onClick={viewAccount} account={result._id}>
            {result.username}
          </p>
        </div>
      ))}
      <div className="horizontal-center mar-bottom-2">
        {loading ? (
          <img src={loadingAnimation} alt="loading" height="50" width="100" />
        ) : null}
      </div>
      <div className="error">
        <h3>{error}</h3>
      </div>
      <BottomNavBar />
    </>
  );
}

function mapStateToProps(state) {
  return {
    accountId: state.userdata.userId,
  };
}

export default connect(mapStateToProps)(Search);
