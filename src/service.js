import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyArf-MkYyUeuL8_hcovgjY7UVumVuuRCRA",
    authDomain: "my-to-watch-list-mo.firebaseapp.com",
    projectId: "my-to-watch-list-mo",
    storageBucket: "my-to-watch-list-mo.appspot.com",
    messagingSenderId: "59132483814",
    appId: "1:59132483814:web:0603e396d094fe13720327"
};
firebase.initializeApp(firebaseConfig);

const Api = {
    // THE MOVIE DATABASE
    url: "https://api.themoviedb.org/3",
    key: "6e885cd41366c8a6fb42f767d0b93a6c",
    get: async function(route, params = "", appendToResponse = "", lang = "en-US") {
        if(!route){
            throw new Error("Not route provided")
        }
        return await fetch(`${this.url}/${route}?api_key=${this.key}&language=${lang}&${params}&append_to_response=vote_average,vote_count,${appendToResponse}`).then(res => res.json())
    },
    trending: async function() {
        return await this.get("trending/all/day")
    },
    popular: async function() {
        var movies,
            tv;
        return await this.get("movie/popular").then(m => {
            m.results = m.results.map(d => ({...d, media_type:"movie"}))
            movies = m;
            return this.get("tv/popular")
        }).then(t => {
            t.results = t.results.map(d => ({...d, media_type:"tv"}))
            tv = t;
            return {
                page: movies.page,
                results: [...movies.results, ...tv.results].sort((a,b) => b.popularity - a.popularity)
            }
        })
    },
    find: async function(query, page = 1) {
        if(!query) throw new Error("Query needed")
        return await this.get("search/multi",`query=${query}&page=${page}`);
    },
    typeGenre: async function(type) {
        if(!type) throw new Error("Type needed")
        return await this.get(`genre/${type}/list`);
    },
    genreMedia: async function(type, id, page = 1 ) {
        if(!id) throw new Error("ID needed")
        var genreName = ""
        return await this.typeGenre(type)
            .then(({genres}) => {
                genreName = genres.find(g => g.id.toString() === id).name
                return this.get(`discover/${type}`,`with_genres=${id}&page=${page}`)
            }).then(genre => ({name: genreName, ...genre}));
    },
    getRecomendationsById: async function(type, id) {
        if(!type) throw new Error("Type needed")
        else if(!id) throw new Error("ID needed")
        return await this.get(`${type}/${id}/recommendations`);
    },
    getVideosById: async function(type, id) {
        if(!type) throw new Error("Type needed")
        else if(!id) throw new Error("ID needed")
        return await this.get(`${type}/${id}/videos`);
    },
    getById: async function(type, id) {
        if(!id) throw new Error("ID needed")
        var data = null;
        return await this.get(`${type}/${id}`)
            .then(d => {
                if(!d.success && d.status_message) throw new Error(d.status_message)
                const formatTime = (initial) => {
                    var hours = Math.floor(initial / 60),
                        minutes = initial % 60;
                    return {
                        hours,
                        minutes
                    };
                }
                data = d;
                if(type === 'movie') data.runtime=formatTime(data.runtime)
                return this.getRecomendationsById(type, id)
            })
            .then(r => {
                data.recomendations = r.results;
                return this.getVideosById(type, id)
            })
            .then(v => {
                data.video = v.results
                return data
            })
    },

    // FIREBASE
    db: firebase.firestore(),
    login: async function(lang = "en"){
        return await firebase.auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((result) => {
                return result.user;
            });
    },
    logout: async function() {
        return await firebase.auth().signOut();
    },
    getListsUser: async function(author, callback){
        if(!author) throw new Error("Author needed")
        const firestore = this.db;
        return await firestore.collection("lists").where("author", "==", author).orderBy("name").onSnapshot(function(snapshot) {
            const docs =[]
            snapshot.forEach(doc => {
                docs.push(({...doc.data(), id:doc.id}))
            })
            if(docs.length === 0){
                firestore.collection("lists").add({
                    name: "Your list",
                    author,
                    list: []
                })
            }
            callback(docs)
        })
    },
    deleteList: async function(author, listId){
        if(!author) throw new Error("Author needed")
        else if(!listId) throw new Error("List id needed")
        return await this.db.collection("lists").doc(listId).delete();
    },
    updateName: async function(author, listId, newName){
        if(!author) throw new Error("Author needed")
        else if(!listId) throw new Error("List id needed")
        else if(!newName) throw new Error("New name needed")
        return await this.db.collection("lists").doc(listId).update({name: newName});
    },
    addTitleToList: async function(author, listId, title){
        if(!author) throw new Error("Author needed")
        else if(!listId) throw new Error("List id needed")
        else if(!title) throw new Error("Title data needed")
        return await this.db.collection("lists").doc(listId).update({
            list: firebase.firestore.FieldValue.arrayUnion(title)
        });
    },
    removeTitleFromList: async function(author, listId, title){
        if(!author) throw new Error("Author needed")
        else if(!listId) throw new Error("List id needed")
        else if(!title) throw new Error("Title data needed")
        return await this.db.collection("lists").doc(listId).update({
            list: firebase.firestore.FieldValue.arrayRemove(title)
        });
    }
}

export default Api;