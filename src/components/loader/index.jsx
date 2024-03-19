import React from "react";

const InitLoader = React.memo(function () {
    return (
        <div className={ 'main-loader--wrapper' } >
            <h3>Loading...</h3>
        </div>
    );
})
export default InitLoader