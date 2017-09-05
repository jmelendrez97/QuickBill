// @flow
import { SET_INVOICE_DETAILS } from "../constants";
import type { Action } from "../actions";

export type invoiceDetailState = {
    to: string,
    from: string,
    addressTo: string,
    addressFrom: string,
    phoneTo: string,
    phoneFrom: string,
    emailTo: string,
    emailFrom: string,
    invoiceNumber: string,
    job: string,
};

const initialState: invoiceDetailState = {
    to: "",
    from: "",
    addressTo: "",
    addressFrom: "",
    phoneTo: "",
    phoneFrom: "",
    emailTo: "",
    emailFrom: "",
    invoiceNumber: "001",
    job: ""
};

export default function invoiceDetailsReducer(state: invoiceDetailState = initialState, action: Action) {
    if (action.type === SET_INVOICE_DETAILS) {
        return {...state, [action.name]: action.val};
    }
    return state;
} 