import React, {Fragment} from 'react';
import DECRET_RapidGrah from "../../data/decret_scio.pdf";

function Scio() {
    return (
        <Fragment>
            <div>
                <iframe
                    src={DECRET_RapidGrah}
                    width="100%"
                    height="1000px"
                    allow="autoplay"
                    title="DECRET AGROFORETS"
                />
            </div>
        </Fragment>
    )

}


export default Scio;