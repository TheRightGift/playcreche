import Navbar from "../../Navbar";
import kiddies from "../../../data/kids";
import { reports, disposition } from "../../../data/reports.data";
import { useState } from "react";
import moment from 'moment';
import { useLocation } from "react-router-dom";


const TableDataItems = (props) => {
    return (
        props.kids.map((data) =>
            <tr key={data.id} className="shadow bg-white fw-normal" >
                <td className="cursor-pointer" data-bs-toggle="modal" data-bs-target="#view" onClick={() => { props.setDataToDelete(data); }}>{data.first_name} {data.last_name}</td>
                <td className="bg-primary text-white"><span onClick={() => { props.setDataToDelete(data); props.setView('feeding') }} className={'btnTime text-system shadow cursor-pointer'} data-bs-toggle="modal" data-bs-target="#feeding">Add</span></td>
                <td className="bg-primary text-white"><span onClick={() => { props.setDataToDelete(data); props.setView('diaper') }} className={'btnTime text-system shadow cursor-pointer'} data-bs-toggle="modal" data-bs-target="#diaper">Add</span></td>
                <td className="bg-primary text-white"><span onClick={() => { props.setDataToDelete(data); props.setView('naps') }} className={'btnTime text-system shadow cursor-pointer'} data-bs-toggle="modal" data-bs-target="#nap">Add</span></td>
                <td className="bg-primary text-white"><span onClick={() => { props.setDataToDelete(data); props.setView('arrival') }} className={'btnTime text-system shadow cursor-pointer'} data-bs-toggle="modal" data-bs-target="#attendance">Add</span></td>
                <td className="bg-primary text-white rounded-0"><span onClick={() => { props.setDataToDelete(data); props.setView('departure') }} className={'btnTime text-system shadow cursor-pointer'} data-bs-toggle="modal" data-bs-target="#departure">Add</span></td>

            </tr >
        )
    );
}

export default function Report() {
    let localKids = localStorage.getItem('kids');
    localKids = JSON.parse(localKids);
    const [kids, setKids] = useState(localKids ?? reports);
    const [report, setReports] = useState(reports);
    const [dataToDelete, setDataToDelete] = useState({});
    const [inputs, setInputs] = useState({});
    const [dipsose, setDisposal] = useState(false)
    const [view, setView] = useState('');
    const [checked, setChecked] = useState([]);

    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let newValues = { id: dataToDelete.reports ? `${dataToDelete.reports.length + 1}` : 1, created_at: moment(), ...inputs };
        let updatedArr;

        if (view == 'feeding') {
            if (dataToDelete.feeding) {
                dataToDelete.feeding.push(newValues);
                updatedArr = kids.map(obj => {
                    if (obj.id === dataToDelete.id) {
                        return {
                            ...dataToDelete
                        };
                    }
                    return obj;
                });
            }
        }
        if (view == 'diaper') {
            if (dataToDelete.diaper) {
                dataToDelete.diaper.push({ ...newValues, ...{ type: checked } });
                updatedArr = kids.map(obj => {
                    if (obj.id === dataToDelete.id) {
                        return {
                            ...dataToDelete
                        };
                    }
                    return obj;
                });
            }
        }
        if (view == 'naps') {
            if (dataToDelete.nap) {
                dataToDelete.nap.push(newValues);
                updatedArr = kids.map(obj => {
                    if (obj.id === dataToDelete.id) {
                        return {
                            ...dataToDelete
                        };
                    }
                    return obj;
                });
            }
        }
        if (view == 'arrival') {
            if (dataToDelete.arrival) {
                dataToDelete.arrival.push(newValues);
                updatedArr = kids.map(obj => {
                    if (obj.id === dataToDelete.id) {
                        return {
                            ...dataToDelete
                        };
                    }
                    return obj;
                });
            }
        }
        if (view == 'departure') {
            if (dataToDelete.departure) {
                dataToDelete.departure.push(newValues);
                updatedArr = kids.map(obj => {
                    if (obj.id === dataToDelete.id) {
                        return {
                            ...dataToDelete
                        };
                    }
                    return obj;
                });
            }
        }
        console.log(newValues, dataToDelete);

        console.log(updatedArr);
        const updatedKids = updatedArr;
        document.getElementById('feeding').getElementsByClassName('btn-close')[0].click();
        document.getElementById('attendance').getElementsByClassName('btn-close')[0].click();
        document.getElementById('departure').getElementsByClassName('btn-close')[0].click();
        document.getElementById('nap').getElementsByClassName('btn-close')[0].click();
        document.getElementById('diaper').getElementsByClassName('btn-close')[0].click();
        alert(view == 0 ? `${dataToDelete.first_name} report for ${moment()} succesfully saved!` : `${dataToDelete.first_name} report for ${moment()} succesfully updated!`);
        setKids(updatedKids);
        // This is Kids report
        localStorage.setItem('kids', JSON.stringify(updatedKids));
        setInputs({});
    };
    const checkList = ["Wet", "SB"];
    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    }
    return (
        <main>
            <section className="reports">
                <div className="row">
                    <div className="col-lg-12 py-4 justify-content-center">
                        <Navbar />
                        <section id="report">
                            <div className="table-responsive" tabIndex="1" >
                                <table className="table table-custom table-lg mb-0" id="products">
                                    <thead className="bg-primary text-white shadow">
                                        <tr>
                                            <th className="bg-white text-muted">Full Name</th>
                                            <th>Feeding</th>
                                            <th>Diaper</th>
                                            <th>Napping</th>
                                            <th>Arrival</th>
                                            <th>Departure</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-system">
                                        <TableDataItems kids={kids} setDataToDelete={setDataToDelete} setView={setView} />
                                    </tbody>
                                </table>
                            </div>

                            <div className="modal fade" id="reports" tabIndex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="reportsLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-scrollable">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="reportsLabel">{view == 1 ? 'Update' : 'Take'} Report for {dataToDelete.first_name}</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setInputs({})}></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className='card my-1 p-2'>
                                                <form className="row g-3 needs-validation dropzone" onSubmit={handleSubmit}>
                                                    <p>Kid Info</p>
                                                    <div className="col-md-4">
                                                        <label htmlFor="validationCustom03" className="form-label">Arrival</label>
                                                        <input type="time" className="form-control" name="arrival" value={inputs.arrival || ""} onChange={handleChange} required />

                                                    </div>

                                                    <div className="col-md-4">
                                                        <label htmlFor="validationCustom01" className="form-label">Feeding Time</label>
                                                        <input type="time" className="form-control" name="feeding" value={inputs.feeding || ""} onChange={handleChange} required />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label htmlFor="validationCustom02" className="form-label">Diaper Time</label>
                                                        <input type="time" className="form-control" name="diaper" value={inputs.diaper || ""} onChange={handleChange} required />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label htmlFor="validationCustomUsername" className="form-label">Nap Time</label>
                                                        <div className="input-group has-validation">
                                                            <input type="time" className="form-control" name="nap" value={inputs.nap || ""} onChange={handleChange} required />
                                                        </div>
                                                        <p className="text-center">to</p>
                                                        <div className="input-group has-validation">
                                                            <input type="time" className="form-control" name="nap_to" value={inputs.nap_to || ""} onChange={handleChange} required />
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <label htmlFor="validationCustom05" className="form-label">Toileting</label>
                                                        <input type="time" className="form-control" name="toileting" value={inputs.toileting || ""} onChange={handleChange} required />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label htmlFor="validationCustom05" className="form-label">Departure</label>
                                                        <input type="time" className="form-control" name="departure" value={inputs.departure || ""} onChange={handleChange} required />
                                                    </div>
                                                    <div className="col-md-12">

                                                        {/* {
                                                            disposition.map(data =>
                                                                <div className="form-check form-check-inline">
                                                                    <input className="form-check-input" type="checkbox" id="flexCheckDefault" name="disposition" value={data} onChange={handleChange} />
                                                                    <label className="form-check-label" for="flexCheckDefault">
                                                                        {data}
                                                                    </label>
                                                                </div>

                                                            )
                                                        } */}

                                                        <label htmlFor="validationCustom05" className="form-label">Disposition</label>
                                                        <input type="text" className="form-control" name="disposition" value={inputs.disposition || ""} onChange={handleChange} required />
                                                    </div>
                                                    <div className="col-12">
                                                        <button className="btn btn-primary" type="submit">{view == 0 ? 'Submit' : 'Update'}</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Feeding Modal */}
                            <div class="modal fade" id="feeding" tabindex="-1" aria-labelledby="feedingLabelModal" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="reportsLabel">{view == 1 ? 'Update' : 'Take'} Feeding Report for {dataToDelete.first_name} {dataToDelete.last_name}</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setInputs({})}></button>
                                        </div>
                                        <div class="modal-body">
                                            <form className="row g-3 needs-validation dropzone" onSubmit={handleSubmit} >
                                                <div className="col-md-6">
                                                    <label htmlFor="validationCustom03" className="form-label">Feeding</label>
                                                    <input type="time" className="form-control" name="feeding_time" value={inputs.feeding_time || ""} onChange={handleChange} required />
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="validationCustom03" className="form-label">Meal</label>
                                                    <input type="input" className="form-control" name="feeding_meal" value={inputs.feeding_meal || ""} onChange={handleChange} required />
                                                </div>
                                                <div className="col-md-6">
                                                    <input type="text" className="form-control d-none" name="forFeeding" value="forFeeding" onChange={handleChange} required />
                                                </div>
                                                <button type="submit" class="btn btn-primary">Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Diaper Modal */}
                            <div class="modal fade" id="diaper" tabindex="-1" aria-labelledby="feedingLabelModal" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="reportsLabel">{view == 1 ? 'Update' : 'Take'} Diaper Report for {dataToDelete.first_name} {dataToDelete.last_name}</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setInputs({})}></button>
                                        </div>
                                        <div class="modal-body">
                                            <form className="row g-3 needs-validation dropzone" onSubmit={handleSubmit} >
                                                <div className="col-md-6">
                                                    <label htmlFor="validationCustom03" className="form-label">Diaper</label>
                                                    <input type="time" className="form-control" name="diaper_time" value={inputs.diaper_time || ""} onChange={handleChange} required />
                                                </div>
                                                <div className="col-md-6">
                                                    <p>Diaper Type</p>
                                                    {checkList.map((item, index) => (
                                                        <div key={index} class="form-check">
                                                            <input value={item} type="checkbox" class="form-check-input" onChange={handleCheck} />
                                                            <label class="form-check-label" for="flexCheckDefault">
                                                                {item}
                                                            </label>
                                                        </div>
                                                    ))}

                                                </div>
                                                <div className="col-md-6">
                                                    <input type="text" className="form-control d-none" name="forFeeding" value="forFeeding" onChange={handleChange} required />
                                                </div>
                                                <button type="submit" class="btn btn-primary">Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Nap Modal */}
                            <div class="modal fade" id="nap" tabindex="-1" aria-labelledby="feedingLabelModal" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="reportsLabel">{view == 1 ? 'Update' : 'Take'} Nap Report for {dataToDelete.first_name} {dataToDelete.last_name}</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setInputs({})}></button>
                                        </div>
                                        <div class="modal-body">
                                            <form className="row g-3 needs-validation dropzone" onSubmit={handleSubmit} >
                                                <div className="col-sm-12">
                                                    <label htmlFor="validationCustomUsername" className="form-label">Nap Time</label>
                                                    <div className="input-group has-validation">
                                                        <input type="time" className="form-control" name="nap" value={inputs.nap || ""} onChange={handleChange} required />
                                                    </div>
                                                    <p className="text-center">to</p>
                                                    <div className="input-group has-validation">
                                                        <input type="time" className="form-control" name="nap_to" value={inputs.nap_to || ""} onChange={handleChange} required />
                                                    </div>
                                                </div>
                                                <button type="submit" class="btn btn-primary">Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Nap Modal */}
                            <div class="modal fade" id="attendance" tabindex="-1" aria-labelledby="feedingLabelModal" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="reportsLabel">{view == 1 ? 'Update' : 'Take'} Arrival Report for {dataToDelete.first_name} {dataToDelete.last_name}</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setInputs({})}></button>
                                        </div>
                                        <div class="modal-body">
                                            <form className="row g-3 needs-validation dropzone" onSubmit={handleSubmit} >
                                                <div className="col-sm-12">
                                                    <label htmlFor="validationCustom03" className="form-label">Arrival</label>
                                                    <input type="time" className="form-control" name="arrival" value={inputs.arrival || ""} onChange={handleChange} required />

                                                </div>

                                                <button type="submit" class="btn btn-primary">Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal fade" id="departure" tabindex="-1" aria-labelledby="feedingLabelModal" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="reportsLabel">{view == 1 ? 'Update' : 'Take'} departure Report for {dataToDelete.first_name} {dataToDelete.last_name}</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setInputs({})}></button>
                                        </div>
                                        <div class="modal-body">
                                            <form className="row g-3 needs-validation dropzone" onSubmit={handleSubmit} >
                                                <div className="col-sm-12">
                                                    <label htmlFor="validationCustom05" className="form-label">Departure</label>
                                                    <input type="time" className="form-control" name="departure" value={inputs.departure || ""} onChange={handleChange} required />
                                                </div>

                                                <button type="submit" class="btn btn-primary">Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* View Kid */}
                            <div class="modal fade" id="view" tabindex="-1" aria-labelledby="feedingLabelModal" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="reportsLabel">View Report for {dataToDelete.first_name} {dataToDelete.last_name}</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setInputs({})}></button>
                                        </div>
                                        <div className="modal-body">
                                            {
                                                Object.keys(dataToDelete).length > 0 ?
                                                    <section>
                                                        <div className="row">
                                                            <div className="card col-md-6 my-3">
                                                                <div className="card-body shadow">
                                                                    <p>Nap Time</p>
                                                                    {
                                                                        dataToDelete.nap.length != 0 ?
                                                                            dataToDelete.nap.map(el => {
                                                                                return (
                                                                                    <div className="d-flex">
                                                                                        <p>{el.nap} to </p>
                                                                                        <p>&nbsp;{el.nap_to}</p>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                            :
                                                                            <p>Nap Time not taken yet</p>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="card col-md-6 my-3">
                                                                <div className="card-body shadow">
                                                                    <p>Diaper</p>
                                                                    {
                                                                        dataToDelete.diaper.length != 0 ?
                                                                            dataToDelete.diaper.map(el => {
                                                                                return (
                                                                                    <div className="row">
                                                                                        <p className="col-sm-6">{el.diaper_time}</p>
                                                                                        {el.type.map(ele =>
                                                                                            <p className="col-sm-3">
                                                                                                {ele}
                                                                                            </p>
                                                                                        )}
                                                                                    </div>
                                                                                )
                                                                            })
                                                                            :
                                                                            <p>Diaper Time not taken yet</p>
                                                                    }
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="row">
                                                            <div className="card col-md-6 my-3">
                                                                <div className="card-body shadow">
                                                                    <p>Feeding</p>
                                                                    {
                                                                        dataToDelete.feeding.length != 0 ?
                                                                            dataToDelete.feeding.map(el => {
                                                                                return (
                                                                                    <div className="d-flex justify-content-between">
                                                                                        <p>{el.feeding_time}</p>
                                                                                        <p>{el.feeding_meal}</p>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                            :
                                                                            <p>Feeding Time not taken yet</p>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="card col-md-6 my-3">
                                                                <div className="card-body shadow">
                                                                    <p>Arrival</p>
                                                                    {
                                                                        dataToDelete.arrival.length != 0 ?
                                                                            dataToDelete.arrival.map(el => {
                                                                                return (
                                                                                    <div className="d-flex justify-content-between">
                                                                                        <p>{el.arrival}</p>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                            :
                                                                            <p>Arrival Time not taken yet</p>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="card col-md-6 my-3">
                                                                <div className="card-body shadow">
                                                                    <p>Departure</p>
                                                                    {

                                                                        dataToDelete.departure.length != 0 ?
                                                                            dataToDelete.departure.map(el => {
                                                                                return (
                                                                                    <div className="d-flex justify-content-between">
                                                                                        <p>{el.departure}</p>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                            :
                                                                            <p>Departure Time not taken yet</p>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                    :
                                                    null

                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </main>
    )
}
