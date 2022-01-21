import React from 'react';
import TableBody from './tableBody';
import TableHeader from './tableheader';

const Table = ({ data, onsort, sortColumn, columns }) => {


    return (
        <table className='table respo'>
            <TableHeader
                columns={columns}
                sortColumn={sortColumn}
                onSort={onsort}
            />

            <TableBody
                columns={columns}
                data={data}
            />

        </table>);
}

export default Table;