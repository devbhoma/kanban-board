import React from "react"
import PopoverDropdown from "../components/popover";
import {ListButtonIcon} from "../components/svg.icon";
import PropTypes from "prop-types";
import {FILTERS_MAP} from "./helper";


const BoardHeader = (props) => {

    return (<div className={"board-header"}>
        <PopoverDropdown buttonChildren={<React.Fragment>
            <ListButtonIcon size={15}/>
            <span>Display</span>
        </React.Fragment>}>

            {Object.keys(FILTERS_MAP).map(key => {
                return (<div key={key} className={"filter-body"}>
                    <label>{key}ing</label>
                    <select value={props.filter[key]} onChange={(e) => {
                        props.updateQuery(key, e.target.value)
                    }}>
                        {FILTERS_MAP[key].map(item => {
                            return <option key={item.attr} value={item.attr}>{item.label}</option>
                        })}
                    </select>
                </div>)
            })}

        </PopoverDropdown>

    </div>)
}

BoardHeader.propTypes = {
    filter: PropTypes.shape({
        order: PropTypes.string,
        group: PropTypes.string,
    }),
    updateQuery: PropTypes.func
}
export default BoardHeader