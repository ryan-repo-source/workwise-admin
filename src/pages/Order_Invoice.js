import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Order_Invoice = () => {

    const { id } = useParams();
    const [data, SetData] = useState(null);
    const getData = async () => {
        axios.get(`https://works.demo-customproject.com:4001/get-orders-single/${id}`, { headers: { 'Auth': localStorage.getItem('accessToken') } }).then((res) => {
            SetData(res.data[0]);
        })
    }

    useEffect(() => {
        getData();
    }, [id])
    function format(date) {
        return date.replace('T', ' , ').replace('Z', '').slice(0, -4);
    }
    if(data === null){
        return <div className='Loading'></div>        
    }
    return (<div className="container-fluid">
        <div className="row">
            <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 className="mb-sm-0 font-size-18"> Orders Invoice </h4>
                    <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item">
                                <a href="/admin"> Admin </a>
                            </li>
                            <li className="breadcrumb-item active"> Orders </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        {/* end page title */}
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table cellSpacing={0} style={{ borderCollapse: 'collapse', padding: 40, width: '100%' }} width="100%">
                                <tbody>
                                    <tr>
                                        <td width="5px" style={{ padding: 0 }} />
                                        <td style={{ clear: 'both', display: 'block', margin: '0 auto', maxWidth: 600, padding: '10px 0' }}>
                                            <table width="100%" cellSpacing={0} style={{ borderCollapse: 'collapse' }}>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ padding: 0 }}>
                                                            <div style={{ fontSize: 20, fontWeight: 600 }}>{data.company_name}</div>
                                                            <div style={{ fontSize: 15, fontWeight: 500 }}>{data.email}</div>
                                                        </td>
                                                        <td style={{ color: '#999', fontSize: 12, padding: 0, textAlign: 'right' }} align="right">
                                                            <b> Invoice #{data.id}<br />
                                                                {format(data.created_at)}</b>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td width="5px" style={{ padding: 0 }} />
                                    </tr>
                                    <tr>
                                        <td width="5px" style={{ padding: 0 }} />
                                        <td bgcolor="#FFFFFF" style={{ border: '1px solid #000', clear: 'both', display: 'block', margin: '0 auto', maxWidth: 600, padding: 0 }}>
                                            <table width="100%" style={{ background: '#f9f9f9', borderBottom: '1px solid #eee', borderCollapse: 'collapse', color: '#999' }}>
                                                <tbody>
                                                    <tr>
                                                        <td width="50%" style={{ padding: 20 }}><strong style={{ color: '#333', fontSize: 24 }}>${data.price}</strong> Paid</td>
                                                        {/* <td align="right" width="50%" style={{ padding: 20 }}>Thanks for using <span className="il">Bootdey.com</span></td> */}
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td style={{ padding: 0 }} />
                                        <td width="5px" style={{ padding: 0 }} />
                                    </tr>
                                    <tr>
                                        <td width="5px" style={{ padding: 0 }} />
                                        <td style={{ border: '1px solid #000', borderTop: 0, clear: 'both', display: 'block', margin: '0 auto', maxWidth: 600, padding: 0 }}>
                                            <table cellSpacing={0} style={{ borderCollapse: 'collapse', margin: '0 auto', maxWidth: 600,  width: '100%' }}>
                                                <tbody>
                                                    <tr>
                                                        <td valign="top" style={{ padding: 20 }}>
                                                            <h3 style={{ borderBottom: '1px solid #000', color: '#000', fontFamily: '"Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif', fontSize: 18, fontWeight: 'bold', lineHeight: '1.2', margin: 0, marginBottom: 15, paddingBottom: 5 }}>
                                                                Summary
                                                            </h3>
                                                            <table cellSpacing={0} style={{ borderCollapse: 'collapse', width: '100%' }}>
                                                                <tbody>
                                                                    <tr>
                                                                        <td style={{ padding: '5px 0' }}>{data.title}</td>
                                                                        <td align="right" style={{ padding: '5px 0' }}>${data.price}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style={{ borderBottom: '2px solid #000', borderTop: '2px solid #000', fontWeight: 'bold', padding: '5px 0' }}>Amount paid</td>
                                                                        <td align="right" style={{ borderBottom: '2px solid #000', borderTop: '2px solid #000', fontWeight: 'bold', padding: '5px 0' }}>${data.price}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td width="5px" style={{ padding: 0 }} />
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Order_Invoice