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

export const getColorCode = (index) => {
    const colors = ["#8A741A", "#229B9D", "#949318", "#941F86", "#7134A6", "#8308FC", "#381f05", "#688AB5", "#9A0EBA",  "#A0B616", "#113724", "#383436", "#845DC4", "#72C568", "#149C92", "#3B9E7B", "#735b6a", "#20078B", "#7D284E", "#CB918A", "#41A6E1", "#03A814", "#EDA54B",  "#9E293E", "#CB9412", "#739B77", "#AE5912", "#0221CF", "#4073E4", "#060874", "#6456b7", "#CC43D9", "#965467", "#A63CA9", "#ff8c69", "#D8342C", "#D1C54E", "#7C7D47" ];
    return colors[index % colors.length];
}