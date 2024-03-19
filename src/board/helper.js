import {
    CircleCheckedIcon,
    CircleCloseIcon,
    CircleDashedIcon, CircleThreeQuartersIcon,
    DotsHorizontalIcon,
    SingleHighIcon,
    SingleLowIcon,
    SingleMediumIcon,
    WarningIcon
} from "../components/svg.icon";


export const PRIORITY_MAP = {
    "4": {title: "Urgent", icon: <WarningIcon size={16}/>},
    "3": {title: "High", icon: <SingleHighIcon size={16}/>},
    "2": {title: "Medium", icon: <SingleMediumIcon size={16}/>},
    "1": {title: "Low", icon: <SingleLowIcon size={16}/>},
    "0": {title: "No priority", icon: <DotsHorizontalIcon size={16}/>},
}


export const STATUS_MAP = {
    "todo": {title: "Todo", icon: <CircleDashedIcon size={16}/>},
    "in_progress": {title: "In progress", icon: <CircleThreeQuartersIcon size={16}/>},
    "backlog": {title: "Backlog ", icon: <CircleCloseIcon color={"#868686"} size={16}/>},
    "done": {title: "Done ", icon: <CircleCheckedIcon size={16}/>},
}

export const FILTERS_MAP = {
    group: [
        { label: "By Status", attr: "status" },
        { label: "By User", attr: "userId" },
        { label: "By Priority", attr: "priority" }
    ],
    order: [
        {label: "Priority - Low ↓", attr: "priority:asc"},
        {label: "Priority - High ↑", attr: "priority:desc"},
        {label: "Title - Asc", attr: "title:asc"},
        {label: "Title - Desc", attr: "title:desc"},
    ]
}