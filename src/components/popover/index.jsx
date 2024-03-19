import {useState, useRef, useEffect} from "react";
import PropTypes from "prop-types";
import {ArrowDownIcon} from "../svg.icon";

const PopoverDropdown = function (props) {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [popoverRef]);

    const togglePopover = (event) => {
        event.stopPropagation()
        setIsOpen(!isOpen);
    }

    return <div className={"popover-dropdown__wrapper"}>
        <button
            className="popover-trigger--btn"
            onClick={togglePopover}
        >
            {props.buttonChildren}

            <span className={"caret-icon"}>
                <ArrowDownIcon size={20}/>
            </span>
        </button>

        {isOpen && <div className={"popover-content--body"} ref={popoverRef}>
            {props.children}
        </div>}
    </div>
};
PopoverDropdown.propTypes = {
    buttonChildren: PropTypes.node
}
export default PopoverDropdown;