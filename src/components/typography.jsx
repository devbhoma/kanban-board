import React from "react";
import PropTypes from "prop-types";


export const TypographyPrimary = React.memo(function (props) {
    const {className, ...rest} = props;
    return <h1 className={`typography-heading typography-heading--primary ${className || ""}`} {...rest}>{props.children}</h1>
})
TypographyPrimary.propTypes = {
    className : PropTypes.string
}
export const TypographySecondary = React.memo(function (props) {
    const {className, ...rest} = props;
    return <h2 className={`typography-heading typography-heading--secondary ${className || ""}`} {...rest}>{props.children}</h2>
})
TypographySecondary.propTypes = {
    className : PropTypes.string
}
