import {ReceiptsComponent} from "./ReceiptsComponent";
import {connect} from "react-redux";
import {createReceipt} from "../../redux-actions/receiptActions";
import {togglePartyOnReceipt} from "../../redux-actions/partyActions";

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
            dispatch(createReceipt($t.val() as string));
            $t.val("");
        },

        onReceiptPartyChange: (event, receiptId, partyId) => {
            dispatch(togglePartyOnReceipt(receiptId, partyId, event.currentTarget.checked))
        }
    }
};


export const ReceiptsLink = connect(mapStateToProps, mapDispatchToProps)(ReceiptsComponent);
