import {ReceiptsComponent} from "./ReceiptsComponent";
import {connect} from "react-redux";
import {partyToggleOnReceipt} from "../../redux-actions/partyActions";
import {IDynamicLabelValueChangeEventArgs} from "../lib/input/DynamicLabel";
import {receiptChangePayer, receiptCreate, receiptDelete} from "../../redux-actions/receiptActions";

/**
 * Created by akersten on 6/4/17.
 */


const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
        onKeyPress: (event) => {
            if (event.which !== 13) {
                return;
            }

            let $t = $(event.currentTarget);

            let str: string = $t.val() as string;
            if (str.length === 0) {
                return;
            }

            // Create a new receipt!
            dispatch(receiptCreate($t.val() as string));
            $t.val("");
        },

        onReceiptPartyChange: (event, receiptId, partyId) => {
            dispatch(partyToggleOnReceipt(receiptId, partyId, event.currentTarget.checked))
        },


        onReceiptDeleteClick: (event, receiptId: string): void => {
            // TODO: Move this component-specific stuff down to the actual component and just call this function in the callback
            let $el = $(".cw-fx-expand-on-create[data-id='" + receiptId + "']");
            $el.removeClass("cw-fx-expand-on-create");
            $el.addClass("cw-fx-collapse");
            $el.on("animationend",
                () => {
                    dispatch(receiptDelete(receiptId));
                }
            );
        },

        onReceiptDateChange: (e: IDynamicLabelValueChangeEventArgs) => {
            // TODO: Parse and change date

            return true;
        },

        onReceiptPayerChange: (e: IDynamicLabelValueChangeEventArgs) => {
            // TODO
            dispatch(receiptChangePayer(e.objectId, e.formatter(e.newValueRaw)));

            return true;
        },

        onReceiptTotalChange: (e: IDynamicLabelValueChangeEventArgs) => {
            // TODO:

            return true;
        }
    }
};


export const ReceiptsLink = connect(mapStateToProps, mapDispatchToProps)(ReceiptsComponent);
