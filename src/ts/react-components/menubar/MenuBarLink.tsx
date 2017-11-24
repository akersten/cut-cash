import {connect} from "react-redux";
import {MenuBarComponent} from "./MenuBarComponent";

/**
 * Created by akersten on 6/4/17.
 */


const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export const MenuBarLink = connect(mapStateToProps, mapDispatchToProps)(MenuBarComponent);