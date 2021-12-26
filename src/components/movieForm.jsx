import React, { Component } from 'react';
const MoiveForm = ({ match, history }) => {
    return (
        <div>
            <h1>movie form :{match.params.id}</h1>
            <button className='btn btn-primary' onClick={() => history.push('/movies')}>save</button>
        </div>

    );
}

export default MoiveForm;