import React, {Fragment} from 'react';
import DECRET_RapidGrah from "../../data/decret_Rapide_grah.pdf";

function RapidGrah() {
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


export default RapidGrah;