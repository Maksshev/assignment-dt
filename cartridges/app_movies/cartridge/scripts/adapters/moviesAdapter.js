'use strict';

const URLUtils = require('dw/web/URLUtils');

function MoviesAdapter(movies, queryString) {
    this.movies = movies;
    this.queryString = queryString;
}

MoviesAdapter.POSTER_BASE_URL = 'https://image.tmdb.org/t/p/original';
MoviesAdapter.PAGE_SIZE = 20;

MoviesAdapter.prototype.adapt = function () {

    return {
        productSearch: {
            productSort: {
                options: []
            },
            count: this.movies['total_results'],
            pageNumber: this.queryString.page,
            showMoreUrl: buildShowMoreUrl(this.queryString),
            isCategorySearch: false,
            pageSize: MoviesAdapter.PAGE_SIZE,
            productIds: this.movies.data.results
                .filter(movie => !!movie['poster_path'])
                .map(movie => {
                    return {
                        'urls': {
                            product: '#',
                            quickView: URLUtils.url('Movie-QuickView', 'id', movie.id)
                                .relative()
                                .toString()
                        },
                        'uuid': '',
                        'id': movie.id,
                        'productName': movie['original_title'],
                        'productType': 'master',
                        'brand': null,
                        'images': {
                            'medium': [
                                {
                                    'alt': movie['original_title'],
                                    'url': MoviesAdapter.POSTER_BASE_URL + movie['poster_path'],
                                    'title': movie['original_title'],
                                    'index': '0',
                                    'absURL': MoviesAdapter.POSTER_BASE_URL + movie['poster_path']
                                }
                            ]
                        },
                        'rating': movie['vote_average']
                    };
                })
        }
    };
};

function buildShowMoreUrl(queryString) {
    const URLUtils = require('dw/web/URLUtils');
    const urlUtils = require('*/cartridge/scripts/util/urlUtils');

    const baseURL = URLUtils.url('Search-ShowAjax')
        .toString();

    queryString.page = queryString.page ? Number(queryString.page) + 1 : 2;

    return baseURL + urlUtils.buildQueryStringFromObject({
        page: queryString.page,
        q: queryString.q
    });
}

module.exports = MoviesAdapter;
