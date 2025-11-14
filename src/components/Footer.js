import React from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const Footer = () => {

    const [CMS, setCMS] = useState(null);
    useEffect(() => {
        GetCMS();
    }, [])
    const GetCMS = async () => {
        await axios.get(`https://works.demo-customproject.com:4001/site-info/`, {headers : {'Auth' : localStorage.getItem('accessToken')}}).then((res) => {
            setCMS(res.data);
        })
    }

    const pathname = useLocation().pathname;
    if (pathname == '/') return false;
    return (
        <footer className="footer">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6">
                        {CMS !== null ?
                            CMS.map((item) => {
                                if(item.type == 'copyright'){
                                    return item.value;
                                }
                            })
                            : false}
                    </div>
                    <div className="col-sm-6">
                        <div className="text-sm-end d-none d-sm-block">
                            {/* Dev By DEV-R */}
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer