import React from 'react';
import { Link } from 'react-router-dom';
import Like from './common/like';
import Table from './common/table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'


class MoviesTable extends React.Component {




    columns = [
        {
            path: 'title',
            label: 'Title',
            content: movie => <Link to={`/Vidly-movielist/movies/${movie._id}`}>{movie.title}</Link>
        },
        { path: 'genre.name', label: 'Genre' },
        { path: 'dailyRentalRate', label: 'Rate' },
        {
            key: "like",
            content: movie => <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
        },
        {
            key: 'delete',
            content: movie => (

                <FontAwesomeIcon
                    size='lg'
                    icon={faTrashAlt}
                    onClick={() => this.props.onDelete(movie)}
                    className='icon-delete'
                />

            )

        }

    ]

    render() {
        const { onSort, sortColumn, movies } = this.props
        return (
            <Table
                columns={this.columns}
                data={movies}
                sortColumn={sortColumn}
                onsort={onSort} />
        );
    }
}


export default MoviesTable;