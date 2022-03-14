'use strict';

function MovieAdapter(movie) {
    this.movie = movie;
}

MovieAdapter.prototype.adapt = function () {
    return {
        product: {
            id: this.movie.data.id,
            images: {
                large: this.movie.videos.toArray()
                    .filter(video => !!video && video.site === 'YouTube')
                    .map(video => {
                        video.url = 'https://www.youtube.com/embed/' + video.key + '?autoplay=1&origin=https://zzgd-003.sandbox.us01.dx.commercecloud.salesforce.com'

                        return video;
                    })
            },
            productName: this.movie.data['original_title'],
            variationAttributes: [],
            promotions: [
                {
                    calloutMsg: 'Overview',
                    details: this.movie.data.overview
                }
            ]
        }
    };
};

module.exports = MovieAdapter;

