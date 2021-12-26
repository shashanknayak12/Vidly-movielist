import React, { Component } from 'react';
import { getMovies } from "../services/fakeMovieService"
import Pagination from './common/pagination'
import { paginate } from "../utils/paginate"
import ListGroup from "./common/listgroup"
import { getGenres } from "../services/fakeGenreService"
import MoviesTable from './moviesTable';
import _ from "lodash"




class Movies extends React.Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        sortColumn: { path: 'title', order: 'asc' }
    };


    componentDidMount() {
        const genres = [{ _id: '', name: 'AllGenre' }, ...getGenres()]
        this.setState({ movies: getMovies(), genres })
    }


    handleDelete = movie => {
        const movies = this.state.movies.filter(m => m._id !== movie._id)
        this.setState({ movies })
    }


    handleLike = (movie) => {
        const movies = [...this.state.movies]
        const index = movies.indexOf(movie)
        movies[index] = { ...movies[index] }
        movies[index].liked = !movies[index].liked
        this.setState({ movies })
    }


    handlePageChange = page => {
        this.setState({ currentPage: page })
    }

    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre })
    }


    handleSort = sortColumn => {
        console.log(sortColumn)

        this.setState({ sortColumn })

    }


    getPageData = () => {
        const {
            pageSize,
            currentPage,
            selectedGenre,
            movies: allMovies,
            sortColumn
        } = this.state

        const filtered =
            selectedGenre && selectedGenre._id
                ? allMovies.filter(m => m.genre._id === selectedGenre._id)
                : allMovies

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])
        const movies = paginate(sorted, currentPage, pageSize)

        return { totalCount: filtered.length, data: movies }
    }

    render() {

        const { length: count } = this.state.movies
        const {
            pageSize,
            currentPage,
            sortColumn
        } = this.state



        if (count === 0) return <p>There is no movies in database</p>

        const { totalCount, data: movies } = this.getPageData()
        return (
            <div className='row'>
                <div className='col-3'>
                    <ListGroup
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect} />
                </div>

                <div className='col'>
                    <p>Showing {totalCount} from movies database</p>
                    <MoviesTable
                        movies={movies}
                        sortColumn={sortColumn}
                        onDelete={this.handleDelete}
                        onLike={this.handleLike}
                        onSort={this.handleSort} />

                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange} />

                </div>
            </div>

        )


    }




}


export default Movies;