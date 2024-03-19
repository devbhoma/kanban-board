import React, {useEffect, useState} from "react";
import InitLoader from "./components/loader";
import MainBoard from "./board";

function App() {
    const [state, setState] = useState({
        data: {},
        inflight: true,
        err: ""
    })

    const updateState = (arg = {}) => setState(preState => {
        return {
            ...preState,
            ...arg
        }
    })

    useEffect(() => {
        fetch(`https://api.quicksell.co/v1/internal/frontend-assignment`)
            .then(async response => {
                const json = await response.json();
                updateState({data: json, inflight: false})
            }).catch( err => {
            updateState({
                data: {},
                inflight: false,
                err:  err.message
            })
        });

    }, []);


    return (<React.Suspense fallback={<InitLoader/>}>
        {state.inflight ? <InitLoader/> : <MainBoard data={state.data}/>}
    </React.Suspense>);
}

export default App;
