import React, { Component } from "react";
import Login from "../../auth/login";
import { withRouter } from "react-router-dom";
import Cartsidebar from "../web/views/cart-sidebar";
import { GetUserLogin, GetCategoryDetails } from "../../components/services";
import { getCookie } from "../../../function";
import Searchproduct from "./search-product";
import classes from "./Header.module.css"

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      searchtxt: "",
      width: window.innerWidth,
      categoryList: [],
    };
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  async getCategoryList() {
    let list = await GetCategoryDetails.getAllMainCategorlist();
    if (list) {
      this.setState({ categoryList: list.data });
    }
  }
  async componentDidMount() {
    this.getCategoryList();
    let email = getCookie("email");
    if (email) {
      let user = await GetUserLogin.getCustomerDetail(email);
      if (user) {
        this.setState({ userName: user.data.firstName });
      }
    }
  }
  handleLogout = async (event) => {
    event.preventDefault();
    await GetUserLogin.logout();
  };
  convertToSlug(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  }
  handleClickSearch = (event) => {
    event.preventDefault();
    let text = this.convertToSlug(this.state.searchtxt);
    this.props.history.push("/product/catalogsearch/result/" + text);
  };
  handleRedirectButton = (slug) => {
    this.props.history.push(`/shop/${slug}`);
    window.location.reload();
  };
  //mobile view
  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }
  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  //end mobile view
  render() {
    let token = getCookie("token");
    let { userName, categoryList, width } = this.state;
    const isMobile = width <= 700;
    return (
      <div>
        <header className="header clearfix">
          <nav className="navbar navbar-light navbar-expand-lg bg-theme osahan-menu">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
                {" "}
                {isMobile ? (
                  <div className="mobile-logo-bk">
                    <h1>
                      SuperMarket
                      <br />
                      {/* <h5>Online Shop</h5> */}
                    </h1>
                  </div>
                ) : (
                  <h6 style={{ color: "#fff" }}>
                    SuperMarket
                    <br />
                    {/* <h6 style={{ color: "#fff" }}>Online Shop</h6> */}
                  </h6>
                )}{" "}
              </a>
              {/* <button
                className="navbar-toggler navbar-toggler-white"
                type="button"
                data-toggle="dropdown"
                data-target="#navbarText"
                aria-controls="navbarText"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button> */}
              <div className="navbar-collapse" id="navbarNavDropdown">
                <div className="navbar-nav mr-auto mt-2 mt-lg-0 margin-auto top-categories-search-main">
                  <form onSubmit={this.handleClickSearch} >
                    <div className="top-categories-search ">
                      <div className={classes.search_grid}>
                        {isMobile ? (
                          <button
                            type="button"
                            className="btn btn-info"
                            data-toggle="modal"
                            data-target="#catModal"
                          >
                            <i className="fa fa-th" aria-hidden="true"></i>
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-info"
                            data-toggle="modal"
                            data-target="#catModal"
                          >
                            <i className="fa fa-th" aria-hidden="true"></i>
                            Categories
                          </button>
                        )}
                       
                        {/* <input className="form-control" placeholder="Search products in Your City" aria-label="Search products in Your City" type="text" name="searchtxt" onChange={(e) => this.handleChange(e)} />
                                             */}
                                                <span className="input-group-btn">
                                                <Searchproduct />
                                                </span>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="my-2 my-lg-0">
                  <ul className="list-inline main-nav-right">



                    <li className="list-inline-item">
                      <span
                        data-target="#bd-example-modal"
                        data-toggle="modal"
                        className={!token ? "btn btn-link" : "d-none"}
                      >
                        <i className="mdi mdi-account-circle" /> Login/Sign Up
                      </span>

                      <div className={token ? "dropdown" : "d-none"} style={{ fontSize: "16px" }}>
                        <button
                          className="btn btn-account dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <div style={{
                            whiteSpace: "nowrap",
                            width: "70px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontSize: "16px"
                          }}>
                            {userName}
                          </div>

                        </button>

                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <a className="dropdown-item" href="/account/view">
                            <i className="uil uil-apps" />
                            Dashboard
                          </a>
                          <a className="dropdown-item" href="/account/profile">
                            <i
                              className="mdi mdi-account-outline"
                              aria-hidden="true"
                            ></i>
                            My Profile
                          </a>
                          {/* <a className="dropdown-item" href="/account/wishlist"><i className="mdi mdi-heart-outline" aria-hidden="true"></i>Wish List</a> */}
                          <a
                            className="dropdown-item"
                            href="/account/order/list"
                          >
                            <i
                              className="mdi mdi-format-list-bulleted"
                              aria-hidden="true"
                            ></i>{" "}
                            Orders List
                          </a>
                          <div className="dropdown-divider"></div>
                          <span
                            className="dropdown-item"
                            onClick={this.handleLogout}
                          >
                            <i className="mdi mdi-lock" aria-hidden="true"></i>{" "}
                            Logout
                          </span>
                        </div>
                      </div>
                    </li>
                    <li className="list-inline-item cart-btn">
                      <Cartsidebar />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </header>

        <div
          className="modal fade  category-modal"
          id="catModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select Category</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>

              <div className="modal-body">
                {/* start */}
                <div className="row">
                  {categoryList.map((row, index) => {
                    return row.status ? (
                      <div
                        className="item col-sm-3"
                        key={row.id}
                        onClick={() => this.handleRedirectButton(row.slug)}
                      >
                        <div className="category-item">
                          <img
                            className="img-fluid"
                            src={row.thumbnail}
                            alt={row.name}
                          />
                          <h6>{row.name}</h6>
                        </div>
                      </div>
                    ) : (
                      ""
                    );
                  })}
                </div>

                {/* end */}
              </div>
            </div>
          </div>
        </div>

        {/* login popup */}
        <Login />
      </div>
    );
  }
}
export default withRouter(Navigation);
