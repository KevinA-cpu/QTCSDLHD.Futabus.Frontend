import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Validate() {
    const [formData, setFormData] = useState({
        query_key: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/validation', {
                query_key: formData.query_key,
            });
            console.log(response);
            if (response.status === 200) {
                console.log('query oke', response);
                navigate(`/info/${formData.query_key}`)
            }
        }
        catch (error) {
            console.error('There was an error while saving the login information:', error);
            alert("errorr");
        }
    };

    return (
        <div className="row justify-content-center my-5">
            <div className="col-4">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title text-center">Search For Ticket</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="query_key" className="form-label">Secret Key</label>
                                <input type="text" className="form-control" name='query_key' value={formData.query_key} onChange={handleChange} required/>
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn-primary" onClick={handleSubmit}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Validate;