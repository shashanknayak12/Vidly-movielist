import React, { Component } from 'react';
import { getMovies } from "../services/fakeMovieService"
import Pagination from './common/pagination'
import { paginate } from "../utils/paginate"
import ListGroup from "./common/listgroup"
import { getGenres } from "../services/fakeGenreService"
import MoviesTable from './moviesTable';
import _ from "lodash"
import { Link } from 'react-router-dom';
import SearchBox from './searchBox';




class Movies extends React.Component {
    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        searchQuery: '',
        selectedGenre: null,
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
        this.setState({ selectedGenre: genre, searchQuery: '', currentPage: 1 })
    }
    handleSearch = query => {
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 })
    }


    handleSort = sortColumn => {
        this.setState({ sortColumn })

    }


    getPageData = () => {
        const {
            pageSize,
            currentPage,
            selectedGenre,
            searchQuery,
            movies: allMovies,
            sortColumn
        } = this.state

        let filtered = allMovies
        if (searchQuery)
            filtered = allMovies.filter(m =>
                m.title.toLowerCase().startWith(searchQuery.toLowerCase())
            )
        else if (selectedGenre && selectedGenre._id)
            filtered = allMovies.filter(m => m.genre._id === selectedGenre._id)

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

        const { totalCount, data: movies, searchQuery } = this.getPageData()
        return (
            <div className='row'>
                <div className='col-3'>
                    <ListGroup
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect} />
                </div>

                <div className='col'>

                    <Link
                        to='/movies/new'
                        className='btn btn-primary m-2'
                    >
                        New Movie
                    </Link>
                    <p>Showing {totalCount} from movies database</p>
                    <SearchBox value={searchQuery} onChange={this.handleSearch} />
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