import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Input, Space, Spin } from 'antd'

const Countrycard = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [value, setValue] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const onSearch = (value) => console.log(value);
    const { Search } = Input;

    const handleChange = (e) => {
        setValue(e.target.value)
    }
    const filteredCountries = data
        .sort((a, b) => a.name.common.localeCompare(b.name.common))
        .filter((country) => {
            return country.name.common.toLowerCase().includes(value.toLowerCase())
        })

    const getData = async () => {
        try {
            setLoading(true)
            const res = await axios.get("https://restcountries.com/v3.1/all")
            setData(res.data)
            console.log(res.data);
        }catch (err){
            setError(err)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        getData();
    }, [])

    if (loading) return <>
        <Spin />
    </>
    return (
        <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "columns", gap: 30 }}>
            <div className='input' style={{ marginTop: 20 }}>
                <Space direction="vertical">
                    <Search
                        placeholder="input search text"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={onSearch}
                        onChange={handleChange}
                    />
                </Space>
            </div>
            <div className='search'>
                {filteredCountries.map(c => (
                    <Card
                        cover={<img alt="example" src={c.flags.png} style={{ height: 200 }} />}
                        title={c.name.common}
                        bordered={false}
                        style={{
                            width: 300,
                            cursor: "pointer"
                        }}
                        onClick={() => navigate(`${c.capital}`)}
                    >
                        <p key={c.population}>Population: {c.population}</p>
                        <p key={c.id}>Region: {c.region}</p>
                        <p key={c.capital}>Capital: {c.capital}</p>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Countrycard