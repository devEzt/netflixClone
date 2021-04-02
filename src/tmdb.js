const API_KEY = '83968b8c90459e664f82caaa5b887a51'; //primeira coisa a se fazer....
const API_BASE = 'https://api.themoviedb.org/3'; //base do request.

/*
- Originais da netflix
- Recomendados/em destaque (trending)
- Em alta (top rated)
- Ação
- Animes
- Comédia
- Terror
- Romance
- Documentários
*/

//depois de fazer a lista abaixo, vou fazer uma função auxiliar 
//dar um fetch na url q quero pegar e vai pegar o json resultado e retornar esse JSON

const basicFetch = async(endpoint) =>{
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json(); // a gente vai pegar o json dessa requesição
    return json;
}

export default{
    getHomeList: async() => {
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
                //array com os filmes.lista, só vai aparecer seriados da netflix
            },
            {
                slug: 'trending',
                title: 'Recomendados para você',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
                //naquela semana qual é o filmes q estão mais em destaque
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'anime',
                title: 'Animação',
                items: await basicFetch(`/discover/movie?with_genres=16&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            },
        ];
    }, //pegar as infos da home do netflix
    getMovieInfo: async (movieId, type) => {
        let info = {};

        if(movieId){
            switch(type) {
                case 'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;
                case 'tv':
                    info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`);
                break;
                default:
                    info = null;
                break;
            }
        }
        return info;
    }
}