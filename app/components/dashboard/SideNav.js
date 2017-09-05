// @flow
import React, { Component } from "react";
import Toggle from "react-toggle";
import Select from "react-select";
import { setAddInfo, setPayDate, setCurrency } from "../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const currencyData = require("./data.json");

type Props = {
    setAddInfo: Function,
    setPayDate: Function,
    setCurrency: Function,
    currency: Object,
    addInfo: {
        discount: ?number,
        tax: ?number,
        amountPaid: ?number
    },
    payDate: ?boolean
};

class SideNav extends Component {
    constructor(props: Props) {
        super(props);
    }

    handleChange = (e: Event) => {
        if (e.target instanceof HTMLInputElement) {
            let discount = e.target.name == "discount" ? e.target.value : this.props.addInfo.discount;
            let tax = e.target.name == "tax" ? e.target.value : this.props.addInfo.tax;
            let amountPaid = e.target.name == "amountPaid" ? e.target.value: this.props.addInfo.amountPaid;
            this.props.setAddInfo(discount, tax, amountPaid);
        }
    }

    selectChange = (val: {value: ?string, label: ?string}) => {
        if (val) {
            this.props.setCurrency(val);
        }
        else {
            this.props.setCurrency({ "value": "$", "label": "USD" });
        }      
    }

    render() {
        let paidAmountInput;
        let { payDate } = this.props;
        if (payDate) {
            paidAmountInput = (
                <div className="setting setting--paid">
                    <input 
                        type="text"
                        name="amountPaid"
                        value={this.props.addInfo.amountPaid}
                        onChange={this.handleChange} />
                </div>
            );
        }
        return (
            <div className="side-nav">
                <h4>Invoice Settings</h4>
                <hr />
                <div className="side-nav__element">
                    <div className="setting">
                        <span>Discount</span>
                        <input 
                            type="text"
                            name="discount"
                            value={this.props.addInfo.discount}
                            onChange={this.handleChange} />
                    </div>
                    <div className="setting">
                        <span>Tax</span>
                        <input 
                            type="text"
                            name="tax"
                            value={this.props.addInfo.tax}
                            onChange={this.handleChange} />
                    </div>
                    <div className="setting setting--inline">
                        <span>Paid to date</span>
                        <label>
                            <Toggle
                                checked={this.props.payDate}
                                icons={false}
                                onChange={() => {this.props.setPayDate(!this.props.payDate)}} />
                        </label>
                    </div>
                    {paidAmountInput}
                </div>
                <hr />
                <div className="side-nav__element">
                    <div className="setting">
                        <span>Currency</span>
                        <Select 
                            name="currency"
                            value={this.props.currency}
                            options={currencyData}
                            onChange={this.selectChange}
                        />
                    </div>
                </div>
                <hr className="full-line" />
                <div className="side-nav__element">
                    <div className="setting">
                        <div className="solid-btn solid-btn--ghost">
                            <Link to="preview" className="ghost-btn"><i className="fa fa-eye" aria-hidden="true"></i> Preview</Link>
                            <a className="ghost-btn"><i className="fa fa-arrow-circle-down" aria-hidden="true"></i> Download</a>
                        </div>
                        <a className="solid-btn solid-btn--rect">
                            <i className="fa fa-paper-plane" aria-hidden="true"></i> Send Invoice
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        addInfo: state.addInfo,
        payDate: state.payDate,
        currency: state.currency
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setAddInfo: (discount, tax, amountPaid) => dispatch(setAddInfo(discount, tax, amountPaid)),
        setPayDate: (payDate) => dispatch(setPayDate(payDate)),
        setCurrency: (currency) => dispatch(setCurrency(currency))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideNav);