import React, { Component } from 'react';
import { GetOrderDetails, GetDashboardDetails } from '../../../../services';
import Moment from 'react-moment';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { NotificationManager } from 'react-notifications';
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getList: [], isloaded: false, status: null, statusList: null,
            offset: 0,
            perPage: 10,
            orgtableData: [],
            currentPage: 0
        }
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };

    loadMoreData() {
        const data = this.state.orgtableData;

        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            getList: slice
        })

    }
    async getOrderList() {
        this.setState({ isloaded: true })
        let list = await GetOrderDetails.getAllOrderList();
        if (list) {
            var tdata = list.order;
            var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData: tdata,
                getList: slice,
                isloaded: false
            })
        } else {
            this.setState({ isloaded: true })
        }
    }
    async getStatusList() {
        this.setState({ isloaded: true })
        let list = await GetDashboardDetails.getAllStatusOrder();
        if (list) {
            this.setState({ statusList: list.data, isloaded: false })
        } else {
            this.setState({ isloaded: true })
        }
    }
    async handleChangeStatus(e) {
        let { value } = e.target;
        this.setState({ isloaded: true })
        let list = await GetDashboardDetails.getOrderByStatus(value);
        if (list) {
            this.setState({ getList: list.order, isloaded: false })
        }
    }
    componentDidMount() {
        this.getOrderList();
        this.getStatusList();
    }
    async handlDeleteById(data) {
        this.setState({ isLoaded: true })
        let list = { id: data.id }
        swal({
            title: "Are you sure?",
            text: "You want to delete Order from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetOrderDetails.getDeleteOrder(list);
                    if (value) {
                        NotificationManager.success("successfully Deleted");
                        window.location.reload();
                        this.setState({ isLoaded: false })
                    } else {
                        this.setState({ isLoaded: false })
                        NotificationManager.error("error");
                    }
                } else {
                    this.setState({ isLoaded: false })
                }
            });
    }
    render() {
        const { getList } = this.state;
        return (
            <div className="container-fluid">
                <h2 className="mt-30 page-title">Orders</h2>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item">Dashboard</li>
                    <li className="breadcrumb-item active">Orders</li>
                </ol>
                <div className="row justify-content-between">
                    <div className="col-lg-3 col-md-4">
                        <div className="bulk-section mb-30">
                            <div className="input-group">
                                <select id="action" name="action" className="form-control">
                                    <option selected>Bulk Actions</option>
                                    <option value={1}>Pending</option>
                                    <option value={2}>Cancel</option>
                                    <option value={3}>Process</option>
                                    <option value={4}>Complete</option>
                                    <option value={5}>Delete</option>
                                </select>
                                <div className="input-group-append">
                                    <button className="status-btn hover-btn" type="submit">Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-6">
                        <div className="bulk-section mb-30">
                            <div className="search-by-name-input">
                                <input type="text" className="form-control" placeholder="Search" />
                            </div>
                            <div className="input-group">
                                <select id="categeory" name="categeory" className="form-control">
                                    <option value={1}>Pending</option>
                                    <option value={2}>Cancel</option>
                                    <option value={3}>Process</option>
                                    <option value={4}>Complete</option>
                                </select>
                                <div className="input-group-append">
                                    <button className="status-btn hover-btn" type="submit">Search Order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <div className="card card-static-2 mb-30">
                            <div className="card-title-2">
                                <h4>All Orders</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="table-responsive">
                                    <table className="table ucp-table table-hover">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 50 }}>S.N</th>
                                                <th style={{ width: 130 }}>Order ID</th>
                                                <th style={{ width: 130 }}>Customer Name</th>
                                                <th style={{ width: 130 }}>Payment Method</th>
                                                <th style={{ width: 200 }}>Order Date</th>
                                                {/* <th style={{ width: 130 }}>Status</th> */}
                                                <th style={{ width: 130 }}>Total</th>
                                                <th style={{ width: 100 }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                getList === 'undefined' ? <p>Loading</p> :
                                                    getList.map((row, index) => (
                                                        <tr key={index}>
                                                            <td>{++index}</td>
                                                            <td>{row.number}</td>
                                                            <td>
                                                                {row.user? row.user.firstName:''}
                                                            </td>
                                                            <td>{row.paymentmethod} </td>
                                                            <td>
                                                                <span className="delivery-time"><Moment format='MMMM Do YYYY'>{row.createdAt}</Moment></span>
                                                                <span className="delivery-time"><Moment format=' h:mm:ss a'>{row.createdAt}</Moment></span>
                                                            </td>
                                                            <td>Rs{row.grandtotal}</td>
                                                            <td className="action-btns">
                                                                <Link className="views-btn" to={{
                                                                    pathname: `/admin/order/view/${row.id}`,
                                                                    state: row
                                                                }}>
                                                                    <i className="fas fa-eye" />
                                                                </Link>
                                                                <Link className="edit-btn" to={{
                                                                    pathname: `/admin/order/edit/${row.id}`,
                                                                    state: row 
                                                                }}><i className="fas fa-edit" /></Link>
                                                                
                                                                <span className="delete-btn" style={{ cursor: 'pointer' }} onClick={(e) => this.handlDeleteById(row)} ><i className="fas fa-trash-alt" /></span>

                                                            </td>
                                                        </tr>
                                                    ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <ReactPaginate
                                    previousLabel={"prev"}
                                    nextLabel={"next"}
                                    breakLabel={"..."}
                                    breakClassName={"break-me"}
                                    pageCount={this.state.pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={"pagination"}
                                    subContainerClassName={"pages pagination"}
                                    activeClassName={"active"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default List;