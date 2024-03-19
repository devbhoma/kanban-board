import React from "react";
import PropTypes from "prop-types";

export const UserAvatar = React.memo(function (props) {
    return <div className={`user-avatar ${props.size || ""}`} title={props.title || ""}>
        {props.children}
        <span className={`status-badge ${props.status ? "active" : ""}`}/>
    </div>
})

UserAvatar.propTypes = {
    size: PropTypes.oneOf(['sm', 'md']),
    status : PropTypes.bool,
    title : PropTypes.string
}
