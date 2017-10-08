import {connect} from "react-redux";
import {createParty, deleteParty} from "../../redux-actions/partyActions";
import {PartiesComponent} from "./PartiesComponent";

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

            // Create a new party!
            // TODO: should really check for duplicates. RIght now our select is keyed off of the name which is not ideal
            // and can be prevented. but for now let's not allow two payers with the same name.
            dispatch(createParty($t.val() as string));
            $t.val("");
        },

        onPartyDeleteClick: (event, partyId: string): void => {
            let $el = $(".cw-fx-expand-on-create[data-id='" + partyId + "']");
            $el.removeClass("cw-fx-expand-on-create");
            $el.addClass("cw-fx-collapse");
            $el.on("animationend",
                () => {
                    dispatch(deleteParty(partyId));
                }
            );
        }
    }
};


export const PartiesLink = connect(mapStateToProps, mapDispatchToProps)(PartiesComponent);
