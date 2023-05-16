import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const CardDetails = () => {
    const params = useParams()
    const [category, setCategory] = useState([])
    console.log(params);

    const getCategory = async () => {
        const result = await axios.get(`https://restcountries.com/v3.1/capital/${params.capital}`)
        setCategory(result.data)
        console.log(result);
    }

    useEffect(() => {
        getCategory()
    }, [])
    return (
        <div>

            {category.map(a => (
                <div className='card'>
                    <div className='image'>
                        <img src={a.flags.png} alt="" />
                    </div>
                    <div className='info'>
                        <h1>{a.name.common}</h1>
                        <p>Population: {a.population}</p>
                        <p>Region: {a.region}</p>
                        <p>Sub Region: {a.subregion}</p>
                        <p>Capital: {a.capital}</p>
                        <p>Top Level Domain: {a.tld}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CardDetails