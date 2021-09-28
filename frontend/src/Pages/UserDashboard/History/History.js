import React, { useState, useEffect } from 'react'

const History = () => {
    const [value, setValue] = useState([]);

    useEffect(async() => {
        const res = await fetch(`/user/${localStorage.getItem("id")}`);
        const data = await res.json()
        console.log(data);
        setValue(data.data);
    },[])
    return (
        <div className="History">
            <h1>Bike Booking History</h1>
            {
                value?.map(() => {
                    return(
                        <div className="HistoryBike">

                        </div>
                    )
                })
            }
            
        </div>
    )
}

export default History;