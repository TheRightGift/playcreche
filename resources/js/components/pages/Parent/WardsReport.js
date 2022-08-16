import Navbar from "../../Navbar";
import kiddies from "../../../data/kids";
import { reports, disposition } from "../../../data/reports.data";
import { useEffect, useState } from "react";
import moment from 'moment';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: false,
            text: 'Chart.js Line Chart',
        },
    },
};
const labels = ['Nap Time', 'Feeding Time', 'Diaper Time', 'Attendance',];
// export const data = {
//     labels,
//     datasets: [
//         {
//             label: 'Dataset 1',
//             data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
//             borderColor: 'rgba(19, 100, 220, 1)',
//             backgroundColor: 'rgba(19, 100, 220, 1)',
//         },
//     ],
// };


const TableDataItems = (props) => {

    return (
        props.kids.map((data) =>
            <tr key={data.id} className="shadow bg-white fw-normal">
                <td className="text-pink">{data.first_name} {data.last_name}</td>
                <td className="bg-pink text-white">{moment(data && data.arrival.length != 0 ? data && data.arrival[0] && data.arrival[0].arrival.created_at : new Date()).format('LL')}</td>
                <td className="bg-pink text-white">
                    {
                        data && data.arrival && data.arrival.length != 0 ?
                            data && data.arrival && data.arrival.map((el) => {
                                return (
                                    <div>
                                        <span className={'btnTime text-pink'}>
                                            {el.arrival}
                                        </span>
                                    </div>
                                )
                            })
                            :
                            <p>Not taken</p>
                    }
                </td>

                <td className="bg-pink text-white">
                    {data.feeding.length != 0 ?
                        data.feeding.map((el) => {
                            return (
                                <span className={'btnTime text-pink d-block my-1'}>{el.feeding_time} / {el.feeding_meal}</span>
                            )
                        })
                        :
                        <p>Not taken</p>
                    }
                </td>
                <td className="bg-pink text-white">
                    {data.diaper.length != 0 ?
                        data.diaper.map((el) => {
                            return (
                                <span className={'btnTime text-pink d-block my-1'}>{el.diaper_time + `/` + el.type.map(type => { return (type) })}</span>
                            )
                        })
                        :
                        <p>Not taken</p>
                    }
                </td>

                <td className="bg-pink text-white">
                    {data.nap.length != 0 ?
                        data.nap.map((el) => {
                            return (
                                <div>
                                    <span className={'btnTime text-pink'}>
                                        {el.nap}
                                    </span> <span>&nbsp; to &nbsp; </span>
                                    <span className={'btnTime text-pink'} >
                                        {el.nap_to}
                                    </span>
                                </div>
                            )
                        })
                        :
                        <span>Not taken</span>
                    }
                </td>
                <td className="bg-pink text-white">
                    {
                        data.departure.length != 0 ?
                            data.departure.map((el) => {
                                return (
                                    <div>
                                        <span className={'btnTime text-pink'}>
                                            {el.departure}
                                        </span>
                                    </div>
                                )
                            })
                            :
                            <p>Not taken</p>
                    }
                </td>

                {/* <td className="bg-pink text-white"><span className={data.reports ? data.reports[0].feeding ? 'btnTime text-pink' : null : ""}>{data.reports ? data.reports[0].diaper : null}</span></td>
                <td className="bg-pink text-white"><span className={data.reports ? data.reports[0].feeding ? 'btnTime text-pink' : null : ""}>{data.reports ? data.reports[0].nap : null}</span>{data.reports ? data.reports[0].nap ? ' to ' : null : ''} <span className={data.reports ? data.reports[0].feeding ? 'btnTime text-pink' : null : ""}> {data.reports ? data.reports[0].nap_to : null}</span></td>
                <td className="bg-pink text-white"><span className={data.reports ? data.reports[0].feeding ? 'btnTime text-pink' : null : ""}>{data.reports ? data.reports[0].arrival : null}</span></td>
                <td className="bg-pink text-white"><span className={data.reports ? data.reports[0].feeding ? 'btnTime text-pink' : null : ""}>{data.reports ? data.reports[0].departure : null}</span></td> */}

            </tr >
        )
    );
}

export default function WardsReport() {
    let localKids = localStorage.getItem('kids');
    let user = localStorage.getItem('user');
    localKids = JSON.parse(localKids);
    user = JSON.parse(user);
    let kidsToFilter = localKids == null ? kiddies : localKids;
    let myKids = kidsToFilter.filter(el => el.parent_id == user.id);
    const [kids, setKids] = useState(myKids ?? []);
    console.log(localKids);
    // const [report, setReports] = useState(reports);
    const [data, setData] = useState({
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
                borderColor: 'rgba(19, 100, 220, 1)',
                backgroundColor: 'rgba(19, 100, 220, 1)',
            },
        ],
    });
    const [tableData, setTableData] = useState(state ?? {});
    const selector = [
        'All', 'Today', '1 month', '1 year', <i className="fa-solid fa-calendar-days"></i>
    ]
    const [clickedChartSelectorView, setclickedChartSelectorView] = useState(1);
    const [clickedTableSelectorView, setclickedTableSelectorView] = useState(1);
    const navigate = useNavigate();
    let { state } = useLocation();

    const getDataToDisplay = (index) => {
        if (index == 1) {
            let report = {
                labels,
                datasets: []
            };
            let tableReport = [];
            // state != null ? state.reports != undefined ? state.reports.forEach(el => {
            //     if (moment(el.created_at).isSame(moment(), 'day')) {
            //         let toAppend = {
            //             label: 'Dataset 1',
            //             data: [el.nap, el.feeding, el.diaper, el.arrival],
            //             borderColor: 'rgba(19, 100, 220, 1)',
            //             backgroundColor: 'rgba(19, 100, 220, 1)',
            //         }


            //         report.datasets.push(toAppend);
            //         tableReport.push(el);
            //     }
            // })
            // : null : null;
            console.log(report, kids, state);
            setData(report)
        }
    }
    useEffect(() => {
        // Anything in here is fired on component mount.
        getDataToDisplay(1);
    }, []);
    console.log(tableData);
    return (
        <main>
            <section className="reports">
                <div className="row">
                    <div className="col-lg-12 py-md-4 justify-content-center">
                        <Navbar />
                        <section id="report">
                            <h1 className="text-pink mb-4">Pupil Report</h1>
                            <p>is simply dummy text of the printing and typesetting industry. <br></br>Lorem Ipsum has</p>

                            <div className="table-responsive" tabIndex="1" >
                                <table className="table table-custom table-lg mb-0" id="products">
                                    <thead className="bg-pink text-white shadow">
                                        <tr>
                                            <th className="bg-white text-muted">FullName</th>
                                            <th className="bg-white text-muted">Date</th>
                                            <th className="bg-pink">Arrival</th>
                                            <th className="bg-pink">Feedings</th>
                                            <th className="bg-pink">Diapers</th>
                                            <th className="bg-pink">Naps</th>
                                            <th className="bg-pink">Departure</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-system">
                                        <TableDataItems kids={kids} />
                                    </tbody>
                                </table>
                                <div className="d-flex justify-content-end align-items-center px-3">
                                    <p className="text-muted">page 1 of 1 &nbsp;</p>
                                    <p className="text-muted cursor-pointer paginator">
                                        <i className="fa fa-arrow-left px-2" aria-hidden="true"></i>
                                        <i className="fa fa-arrow-right" aria-hidden="true"></i></p>
                                </div>
                            </div>

                        </section>
                        <section id="reportMobile" className="pe-3 px-3 py-5">
                            <p>
                                <img onClick={() => navigate(-1)} src="/assets/return.png" className="cursor-pointer" />
                            </p>
                            <section className="pe-4 px-4">
                                <h5 className="text-pink">Reports</h5>
                                <p className="text-muted">{state != undefined ? state.first_name + ' ' + state.last_name : null}</p>

                                <button className="mobileHeaderBtn text-white mt-3 mb-4">
                                    Chart
                                </button>

                                <div className="d-flex justify-content-center">
                                    {
                                        selector.map((action, index) => {
                                            return (
                                                <p key={index} className={`ps-3 cursor-pointer ${index == clickedChartSelectorView ? "text-pink" : 'text-muted'}`} onClick={() => setclickedChartSelectorView(index)}>{action}</p>
                                            )
                                        })
                                    }
                                </div>
                                <div>
                                    <div className="bg-white shadow p-3 bg-body">
                                        <Line options={options} data={data} />
                                    </div>
                                </div>

                                <button className="mobileHeaderBtn text-white mt-5 mb-4">
                                    Table
                                </button>

                                <div className="d-flex justify-content-center">
                                    {
                                        selector.map((action, index) => {
                                            return (
                                                <p key={index} className={`ps-3 cursor-pointer ${index == clickedTableSelectorView ? "text-pink" : 'text-muted'}`} onClick={() => { setclickedTableSelectorView(index); getDataToDisplay(index) }}>{action}</p>
                                            )
                                        })
                                    }
                                </div>
                                <div>
                                    <div className="p-3">
                                        <div className="table-responsive" tabIndex="1">
                                            <table className="table table-custom table-lg mb-0" id="products">
                                                <thead className="bg-primary text-white">
                                                    <tr className="bg-dark text-white">
                                                        <th>Arrival</th>
                                                        <th>Feedings</th>
                                                        <th>Diaper</th>
                                                        <th>Naps</th>
                                                        <th>Departure</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="text-system">
                                                    {
                                                        Object.keys(tableData).length != 0 ?
                                                        <tr key={tableData.id} className="fw-normal rounded-0">
                                                            <td className="bg-pink text-white">
                                                                {
                                                                    tableData.arrival.length != 0 ?
                                                                        tableData.arrival.map((el) => {
                                                                            return (
                                                                                <div>
                                                                                    <span className={'btnTime text-pink'}>
                                                                                        {el.arrival}
                                                                                    </span>
                                                                                </div>
                                                                            )
                                                                        })
                                                                        :
                                                                        <p>Not taken</p>
                                                                }
                                                            </td>

                                                            <td className="bg-pink text-white">
                                                                {tableData.feeding.length != 0 ?
                                                                    tableData.feeding.map((el) => {
                                                                        return (
                                                                            <span className={'btnTime text-pink d-block my-1'}>{el.feeding_time} / {el.feeding_meal}</span>
                                                                        )
                                                                    })
                                                                    :
                                                                    <p>Not taken</p>
                                                                }
                                                            </td>
                                                            <td className="bg-pink text-white">
                                                                {tableData.diaper.length != 0 ?
                                                                    tableData.diaper.map((el) => {
                                                                        return (
                                                                            <span className={'btnTime text-pink d-block my-1'}>{el.diaper_time + `/` + el.type.map(type => { return (type) })}</span>
                                                                        )
                                                                    })
                                                                    :
                                                                    <p>Not taken</p>
                                                                }
                                                            </td>

                                                            <td className="bg-pink text-white">
                                                                {tableData.nap.length != 0 ?
                                                                    tableData.nap.map((el) => {
                                                                        return (
                                                                            <div>
                                                                                <span className={'btnTime text-pink'}>
                                                                                    {el.nap}
                                                                                </span> <span>&nbsp; to &nbsp; </span>
                                                                                <span className={'btnTime text-pink'} >
                                                                                    {el.nap_to}
                                                                                </span>
                                                                            </div>
                                                                        )
                                                                    })
                                                                    :
                                                                    <span>Not taken</span>
                                                                }
                                                            </td>
                                                            <td className="bg-pink text-white">
                                                                {
                                                                    tableData.departure.length != 0 ?
                                                                        tableData.departure.map((el) => {
                                                                            return (
                                                                                <div>
                                                                                    <span className={'btnTime text-pink'}>
                                                                                        {el.departure}
                                                                                    </span>
                                                                                </div>
                                                                            )
                                                                        })
                                                                        :
                                                                        <p>Not taken</p>
                                                                }
                                                            </td>
                                                        </tr >


                                                        :
                                                        <tr>
                                                            <td className="text-center text-pink" colSpan={4}>
                                                                No Data for this kid
                                                            </td>
                                                        </tr>
                                                    }

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </section>
                    </div>
                </div>
            </section>
        </main>
    )
}