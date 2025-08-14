import React, {Fragment} from 'react';
import DECRET_HautDodo from "../../data/decret_Haute_dodo.pdf";

function HautDodo() {
    return (
        <Fragment>
            <div>
                <iframe
                    src={DECRET_HautDodo}
                    width="100%"
                    height="1000px"
                    allow="autoplay"
                    title="DECRET AGROFORETS"
                />
            </div>
        </Fragment>
    )

}


export default HautDodo;