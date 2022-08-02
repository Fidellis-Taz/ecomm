import React, { Component } from 'react'
import { NotificationManager } from 'react-notifications';
import {
    FormControlLabel, Checkbox
} from '@material-ui/core';
import { GetCategoryDetails } from '../../../../services';
import { Helmet } from "react-helmet";
// import parse from 'html-react-parser';

export default class FilterByBrand extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [], subcat: [], brand: []
        }
    }
    async componentDidMount() {
        let url = window.location.href.split('/');
        var lastSegment = url.pop() || url.pop();
        let data = { slug: lastSegment }
        try {
            if (data)
                var p = await GetCategoryDetails.getFilterCatBrandList(data);
            if (p) {
                this.setState({ brand: p.brand, category: p.list.category, subcat: p.list.subcat })
            }
        } catch (e) {
            NotificationManager.error("empty data in category", "Undefined");
        }
    }
    async handleChange(label, id) {
        // Find items that already exists in array
        let sub_cat = this.state.category ? this.state.category.SubChildCategories: this.state.subcat.SubChildCategories;
        const findExistingItem = sub_cat.find((item) => {
            return item.id === id;
        })
        if (findExistingItem.id) {
            let category = await GetCategoryDetails.getFilterByCategory(findExistingItem);
            if (category) {
                this.props.onSelectFilterCategory(category)
            } else {
                NotificationManager.error("empty data in category", "Undefined");
            }
        }

    }

    async handleBrand(label, id) {
        // Find items that already exists in array
        let { brand } = this.state;
        const findExistingItem = brand.find((item) => {
            return item.id === id;
        })
        let data = { brandId: findExistingItem.id, brand: findExistingItem.name, }
        if (findExistingItem.id) {
            let category = await GetCategoryDetails.getFilterByCategory(data);
            if (category) {
                this.props.onSelectFilterCategory(category)
            } else {
                NotificationManager.error("empty data in brand", "Undefined");
            }
        }

    }
    render() {
        const { brand, subcat, category } = this.state;
        return (
            <div>
                <div className="shop-filters">
                    <div id="accordion">
                        <div className="card">
                            <div className="card-header" id="headingOne">
                                <h5 className="mb-0">
                                    <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Category <span className="mdi mdi-chevron-down float-right" />
                                    </button>
                                </h5>
                            </div>
                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                <div className="card-body card-shop-filters">
                                    {
                                        category ?
                                            category.SubChildCategories ?
                                                category.SubChildCategories.map((row, index) => (
                                                    <div key={index}>
                                                        <FormControlLabel
                                                            control={<Checkbox value={row.id} onChange={e => {
                                                                this.handleChange(row.name, row.id);
                                                            }} />}
                                                            label={row.name}
                                                        />
                                                    </div>
                                                ))
                                                : null
                                            : null
                                    }

                                    {
                                        subcat ?
                                            subcat.SubChildCategories ?
                                                subcat.SubChildCategories.map((row, index) => (
                                                    <div key={index}>
                                                        <FormControlLabel
                                                            control={<Checkbox value={row.id} onChange={e => {
                                                                this.handleChange(row.name, row.id);
                                                            }} />}
                                                            label={row.name}
                                                        />
                                                    </div>
                                                ))
                                                : null
                                            : null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header" id="headingThree">
                                <h5 className="mb-0">
                                    <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        Brand <span className="mdi mdi-chevron-down float-right" />
                                    </button>
                                </h5>
                            </div>
                            <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                <div className="card-body card-shop-filters">
                                    {
                                        brand.length ?
                                            brand.map((row, index) => (
                                                <div key={index}>
                                                    <FormControlLabel
                                                        control={<Checkbox value={row.id} onChange={e => {
                                                            this.handleBrand(row.name, row.id);
                                                        }} />}
                                                        label={row.name}
                                                    />
                                                </div>
                                            ))
                                            : ''
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{category ? category.title : null}</title>
                    <meta name="title" content={category ? category.title : null}></meta>
                    <meta name="description" content={category ? category.desc : null}></meta>
                    <meta name="keyword" content={category ? category.keyword : null}></meta>
                    <link rel="canonical" href={window.location.href} />
                </Helmet>
            </div>
        )
    }
}
