import {useEffect, useState} from "react";

const TotalPrice = () => {
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        fetch(`/getCount`)
            .then(r => {
                if(!r.ok)
                    throw new Error("0")
                return r.json()
            })
            .then(data => setTotalPrice(data))
            .catch(() => setTotalPrice(0))
    }, [])

    return(
        <div className="row">
            <div className="col-md-8">Total Price:</div>
            <div className="col-md-4">${totalPrice}</div>
        </div>
    )
}

export default TotalPrice;