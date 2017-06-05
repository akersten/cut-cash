import {ReceiptsComponent} from "./ReceiptsComponent";
import {connect} from "react-redux";
/**
 * Created by akersten on 6/4/17.
 */


const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) =>
{
    return {
        onTestEvent: () => {
            //dispatch(action(param))
        }
    }
};


export const ReceiptsLink = connect(mapStateToProps, mapDispatchToProps)(ReceiptsComponent);
