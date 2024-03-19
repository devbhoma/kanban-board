import React, { useState} from "react";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import useQuery from "../components/query.hook";
import { DotsHorizontalIcon, UserAvatarIcon } from "../components/svg.icon";
import {UserAvatar} from "../components/avatar";
import {TypographyPrimary, TypographySecondary} from "../components/typography";
import {FILTERS_MAP, PRIORITY_MAP, STATUS_MAP} from "./helper";
import BoardHeader from "./header";


const MainBoard = function (props) {
    const query = useQuery()
    const navigate = useNavigate()
    const data = props.data;
    const validateQueryValue = (key) => {
        if (query.has(key) && query.get(key) !== "") {
            if (typeof FILTERS_MAP[key] !== "undefined" && FILTERS_MAP[key].length > 0) {
                if (FILTERS_MAP[key].some( s => s.attr === query.get(key))) {
                    return query.get(key)
                }
            }
        }
        return ""
    }

    const [state, setState] = useState({
        _update: null,
        group: validateQueryValue("group") || "status",
        order: validateQueryValue("order") || "title:asc"
    })

    const updateState = (arg = {}) => setState(preState => {
        return {
            ...preState,
            ...arg
        }
    })


    const getStore = () => {
        const users = data.users && Array.isArray(data.users) ? data.users : []
        const tickets = data.tickets && Array.isArray(data.tickets) ? data.tickets : []
        return {
            users,
            tickets
        }
    }

    const tickets = getStore().tickets
    const users = getStore().users

    const getUserById = (id) => {
        const user = users.find(u => u.id === id)
        return user && typeof user !== "undefined" && user.id ? user : {
            id: "anony-1",
            name: "Anonymous",
            available: false
        } // default anonymous user
    }

    const groupByTicket = () => {
        const groups = {}
        for (let item of tickets) {
            // @group by default - status
            let key = item.status.replaceAll(" ", "_").toLowerCase();
            let title = item.status;
            let icon = typeof STATUS_MAP[key] !== "undefined" ? STATUS_MAP[key].icon : STATUS_MAP["todo"].icon
            item.user = getUserById(item.userId)
            if (state.group === "priority") {
                key = item.priority;
                title = PRIORITY_MAP[item.priority].title
                icon = PRIORITY_MAP[item.priority].icon
            } else if (state.group === "userId") {
                icon = <UserAvatar size={"md"} status={item.available}><UserAvatarIcon/></UserAvatar>
                key = item.userId;
                title = item.user.name
            }


            if (typeof groups[key] === "undefined") {
                groups[key] = {
                    title,
                    icon,
                    tickets: []
                }
            }

            groups[key].tickets.push(item)
        }

        // @ordering
        const [attr, order] = state.order.split(":")
        for (let key in groups) {
            if (attr === "title") {
                // @title value type string
                groups[key].tickets.sort((a, b) => order === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title))
            } else if (attr === "priority") {
                // @priority value type numeric
                groups[key].tickets.sort((a, b) => {
                    return order === "asc" ? a[attr] - b[attr] :  b[attr] - a[attr]
                })
            }
        }
        return groups
    }

    const updateQueryParams = (key, value) => {
        updateState({[key]: value})

        const prvSearch = window.location.search.replace("?", "")
        query.set(key, value)
        const search = query.toString()

        if (search !== prvSearch) {
            navigate({
                pathname: window.location.pathname,
                search
            })
        }
    }

    const groupsItems = groupByTicket()

    return <div className="main-dashboard--wrapper">

        <BoardHeader
            filter={{
                group: state.group,
                order: state.order,
            }}
            updateQuery={updateQueryParams}
        />

        <div className={"board-body--wrapper"}>
            {groupsItems && Object.keys(groupsItems).length > 0 ? Object.keys(groupsItems).map(groupKey => {
                const groups = groupsItems[groupKey]
                return (<div key={groupKey} className={"board-group"}>
                    <div className={"group-header"}>
                        <div className={"avtar"}>{groups.icon}</div>
                        <TypographyPrimary>{groups.title} - {groups.tickets.length}</TypographyPrimary>

                        <button className={"btn-action"}><DotsHorizontalIcon size={20}/></button>
                    </div>

                    <div className={"group-tickets"}>
                        {groups.tickets.map((item) => {
                            return <div key={item.id} className={"board-card"}>
                                <div className={"card-header"}>
                                <TypographySecondary style={{color: "#c1c1c1"}}>{item.id}</TypographySecondary>
                                    {state.group !== "userId" && <UserAvatar size={"sm"} title={item.user.name} status={item.available}><UserAvatarIcon/></UserAvatar>}
                                </div>
                                <TypographySecondary>{item.title}</TypographySecondary>
                                <div className={"card-footer"}>
                                    <div className={"priority-icon"} title={PRIORITY_MAP[item.priority].title}>{PRIORITY_MAP[item.priority].icon}</div>
                                    {item.tag && Array.isArray(item.tag) && <div className={"board-tags"}>
                                        {item.tag.map((tag, i) => {
                                            return <span key={i} className={"tag-badge"}>{tag}</span>
                                        })}
                                    </div>}
                                </div>
                            </div>
                        })}
                    </div>
                </div>)
            }) : <div className={"empty-board--placeholder"}>
                <p>No tickets available</p>
            </div>}
        </div>
    </div>
}

MainBoard.propTypes = {
    data: PropTypes.object,
}
export default MainBoard