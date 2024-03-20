import React from "react";
import PropTypes from "prop-types";

export const UserAvatar = React.memo(function (props) {
    const name = props.name ? props.name.charAt(0) + props.name.charAt(props.name.length - 1) : "";
    return <div className={`user-avatar ${props.textAvatar ? "text-avatar" : ""} ${props.size || ""}`} title={props.title || ""} style={props.style || {}}>
        {name}
        {props.children}
        <span className={`status-badge ${props.status ? "active" : ""}`}/>
    </div>
})

UserAvatar.propTypes = {
    size: PropTypes.oneOf(['sm', 'md']),
    status : PropTypes.bool,
    textAvatar : PropTypes.bool,
    title : PropTypes.string,
    style : PropTypes.object,
    name : PropTypes.string,
}

