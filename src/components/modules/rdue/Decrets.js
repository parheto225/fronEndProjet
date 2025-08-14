import React, {Fragment} from 'react';
import DECRET_UPDATE from "../../data/decret_update.pdf";

function Decret() {
    return (
        <Fragment>
            <div>
                <iframe
                    src={DECRET_UPDATE}
                    width="100%"
                    height="1000px"
                    allow="autoplay"
                    title="DECRET AGROFORETS"
                />
            </div>
        </Fragment>
    )

}


export default Decret;