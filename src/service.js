const Api = {
    url: "http://api.themoviedb.org/3",
    key: "6e885cd41366c8a6fb42f767d0b93a6c",
    get: async function(route, params = "", lang = "en-US") {
        if(!route){
            throw new Error("Not route provided")
        }
        return await fetch(`${this.url}/${route}?api_key=${this.key}&language=${lang}&${params}&append_to_response=vote_average,vote_count`).then(res => res.json())
    },
    trending: async function() {
        return await this.get("trending/all/day")
    },
    popular: async function() {
        var movies,
            tv,
            results;
        return await this.get("movie/popular").then(m => {
            m.results = m.results.map(d => ({...d, media_type:"movie"}))
            movies = m;
            return this.get("tv/popular")
        }).then(t => {
            t.results = t.results.map(d => ({...d, media_type:"tv"}))
            tv = t;
            results = {
                page: movies.page,
                results: [...movies.results, ...tv.results].sort((a,b) => b.popularity - a.popularity)
            }
            console.log(results)
            return results
        })
    },
    find: async function(query, page = 1) {
        if(!query) throw new Error("Query needed")
        return await this.get("search/multi",`query=${query}&page=${page}`);
    },
    getRecomendationsById: async function(type, id) {
        if(!id) throw new Error("ID needed")
        return await this.get(`${type}/${id}/recommendations`);
    },
    getById: async function(type, id) {
        if(!id) throw new Error("ID needed")
        var data = null;
        return await this.get(`${type}/${id}`).then(d => {
            if(!d.success && d.status_message) throw new Error(d.status_message)
            data = d;
            return this.getRecomendationsById(type, id);
        }).then(rec => ({...data, recomendations: rec.results, media_type: type}))
    }
}

export default Api;