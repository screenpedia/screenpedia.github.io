import styled from "styled-components"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import ColorThief from 'colorthief'
import tinycolor from 'tinycolor2'

import ErrorComponent from '../Components/Error'
import SectionTitle from '../Styled/Section/SectionTitle'
import Carrousel from '../Styled/Carrousel/Carrousel'
import CarrouselItem from '../Styled/Carrousel/CarrouselItem'
import Loading from '../Components/Loading'
import Context from "../context"
import Api from "../service"

const Banner = styled.div`
    background: radial-gradient(rgba(${({r,g,b})=>`${r},${g},${b}`},.75),rgba(${({r,g,b})=>`${r},${g},${b}`},.75)), url(${({backdropSrc}) => backdropSrc ? 'https://image.tmdb.org/t/p/w1280'+backdropSrc : ''});
    background-attachment: fixed;
    height: calc(75vh-20px);
    background-size: cover;
    background-position: center top;
    background-origin: top;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items:center;
    padding: 20px;
    border-bottom-left-radius:10px;
    color: ${({light}) => light ? 'black' : 'white'};
    & *{
        color: ${({light}) => light ? 'black' : 'white'};
    }
    @media(max-width: 991px){
        display:block;
        border-bottom-right-radius:10px;
    }
`

const MediaPoster = styled.img`
    border-radius: 10px;
    margin: 0 20px 0 0;
    display: flex;
    height: 400px;
    width: 287px;
    @media(max-width:991px){
        height: 200px;
        width: 133.5px;
        margin: 0;
    }
`

const MediaData = styled.div`
    margin: 5px 0;
    display: flex;
    width: 100%;
    flex-direction: column;
    @media(max-width: 991px){
        display:block;
        flex-wrap: wrap;
    }
`

const MediaDataAttr = styled.div`
    width: auto;
    display: flex;
`

const Genre = styled(Link)`
    margin: 2px 10px 2px 0px;;
    border-radius: 10px;
    text-decoration: none;
    transition: 0.5s all;
    &:hover{
        opacity: 0.5;
    }
`

const StyledButton = styled.a`
    border-radius: 50%;
    background: white;
    margin: 4px;
    height: 42px;
    width: 42px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    text-decoration: none;
    color: black;
    transition: 0.5s all;
    &:hover{
        opacity: 0.8;
        transform: scale(0.95);
    }
}
`

const MediaTitle = styled.h2`
    display: flex;
    fontSize: 35px;
    @media(max-width:991px){
        flex-wrap: wrap;
        & h1, & span{
            width: 100vw;
            margin: 0!important;
        }
    }
`

const AddToListButton = ({data, type, light}) => {
    const addToList = (list, title, notify) => {
        Api.addTitleToList(list.author, list.id, title)
            .then(notify("Successfully added"))
            .catch(err => {
                console.error(err)
                notify("Ups somthing wents wrong", true)
            })
    },
    removeFromList = (list, title, notify) => {
        Api.removeTitleFromList(list.author, list.id, title)
            .then(notify("Successfully removed"))
            .catch(err => {
                console.error(err)
                notify("Ups something wents wrong", true)
            })
    }
    return (
        <Context.Consumer>
            {({user, lists, notify}) => {
                if(!user || user.loading || !lists || lists.length === 0) return null
                return <>
                    {lists.length === 1 ?
                        !lists[0].list.find(t => t.id.toString() === data.id.toString()) ?
                            <StyledButton onClick={() => addToList(lists[0], {id: data.id, name: type === "movie" ? data.title : data.name, type: type}, notify)} style={{borderRadius: '10px', height:'auto', width:'auto', padding: '5px 10px', background: "rgba(0,255,0,0.5)", fontWeight: 'bold', color: light  ? 'black' : 'white', margin: 0, cursor: "pointer"}}>
                                Add to list
                            </StyledButton>
                            :
                            <StyledButton onClick={() => removeFromList(lists[0], {id: data.id, name: type === "movie" ? data.title : data.name, type: type}, notify)} style={{borderRadius: '10px', height:'auto', width:'auto', padding: '5px 10px', background: "rgba(255,0,0,0.5)", fontWeight: 'bold', color: light  ? 'black' : 'white', margin: 0, cursor: "pointer"}}>
                                Remove from list
                            </StyledButton>
                        :
                            <StyledButton onClick={() => removeFromList(lists[0], {id: data.id, name: type === "movie" ? data.title : data.name, type: type}, notify)} style={{borderRadius: '10px', height:'auto', width:'auto', padding: '5px 10px', background: "rgba(255,0,0,0.5)", fontWeight: 'bold', color: light  ? 'black' : 'white', margin: 0, cursor: "pointer"}}>
                                Edit lists
                            </StyledButton>
                    }
                </>
            }}
        </Context.Consumer>
    )
}

const Media = () => {
    const { type, id } = useParams(),
        [error, setError] = useState(null),
        [data, setData] = useState(null),
        [load, setLoad] = useState(false),
        [r, setR] = useState(229),
        [g, setG] = useState(229),
        [b, setB] = useState(229),
        light = tinycolor(`rgb (${r},${g},${b})`).isLight()

    useEffect(() => {
        setLoad(false)
        setError(null)
        setData(null)
        Api.getById(type, id).then(setData).catch(({message}) => setError(message))
    },[id, type])

    useEffect(()=>{
        if(data){
            if(data.poster_path || data.backdrop_path){
                const img = new Image(),
                    colorThief = new ColorThief();
                img.setAttribute('crossOrigin', 'Anonymous')
                img.addEventListener("load", function(){
                    img.removeEventListener("load", this)
                    const color = colorThief.getColor(img)
                    setR(color[0])
                    setG(color[1])
                    setB(color[2])
                    setLoad(true)
                })
                img.src = `https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=https://image.tmdb.org/t/p/w300_and_h450_bestv2/${data.backdrop_path ? data.backdrop_path : data.poster_path}`
            }else{
                setLoad(true)
            }
            
        }
    }, [data])

    useEffect(() => {
        if(data){
            document.title = "Screenpedia | " + (type === "movie" ? data.title : data.name)
            return () => {
                document.title = "Screenpedia"
            }
        }
    })

    return(
        <>
            {!load && !error ? <Loading/> :
                error ? <ErrorComponent error={error} /> :
                    <>
                        <Banner light={light} backdropSrc={data.backdrop_path} r={r} g={g} b={b}>
                            <MediaPoster src={!!data.poster_path ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${data.poster_path}` : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAJFBMVEX4+vvb4OTx9PXl6ezf4+f19/nt8PLz9vfq7fDi5unc4eTs7/GWhAgrAAACGUlEQVR4nO3b23KqMBiAUQEtsn3/961OtydIJEUmaXCtS7n5v5FTEHc7AAAAAAAAAAAAAAAAAAAAAAAAzvr2PX3pgNf6oXnf8Icjjyv0XZxKh8R8rRTYNF+lU8IOqwU2zaF0TNBa++jFsXRM0H7Fwn3pmKAVA5umdEzQhxXuT/3h0B7/bbbwdrpfevopGRIVnq/dZOHT1WzZfUCpiJdu040uZovuVcskzIhNt2g/LVIw5zrcENuwmcLJHdeS3bREwKzrcJO1z+YKJ99h/IZ138bOtCUCZl2HSz8OL/fXkTVXgfnnxaaLnkt/FhDhxPzjJ7hNNzoQY4fhdYUUTMw+fYr7eEn3NPclYCgx+/QpwvPF9tHHNW4gMffwSR4HbK8fxtYWz4v4aWL26VM8F5z68/cXXTuNn1JMEosUzInVJAROEwvMP++dwEli9ulTvBU4Tsw8e5r3AkeJWSdPFaoZ+lNq4HNixrnTBQK73eSC+OpZ7+H+aC7X0L8SDhwlvn6Y3VVW2P3f0KYG1lbY3ba0iYGVFXYPm9q0wLoKu6dtbVJgVYXdaGOb9ItZRYXjwPMyMeUnwXoKp4FpqilcGlhN4eRhW7JaChd/hQpLU5hAYWEfVDgsfrl0qKRwDaVjghTWX7j9dxO3/37pmrtp6ZSIzb/nvdtNnm8v9Gff1f+A/1tcbPw/MwAAAAAAAAAAAAAAAAAAAAAAALl8A7+jEA62Pbx2AAAAAElFTkSuQmCC'} />
                            <MediaData>
                                <MediaDataAttr style={{opacity: 0.75}}>
                                    {data.tagline}
                                </MediaDataAttr>
                                <MediaTitle>
                                    <div>{data.title ? data.title : data.name }</div>
                                    <span style={{color: light  ? 'black' : 'white', fontWeight: 'normal', marginLeft: '5px', opacity: 0.8}}>
                                        ({data.release_date ? data.release_date.split('-')[0] : data.first_air_date.split('-')[0]})
                                    </span>
                                </MediaTitle>
                                <MediaDataAttr>
                                    {data.genres && data.genres.map(g =>
                                        <Genre key={g.id} to={`/genre/${type}/${g.id}`}>{g.name}</Genre>
                                    )}
                                </MediaDataAttr>
                                <MediaDataAttr>
                                    {type === "movie" ?
                                        `${data.runtime.hours}h ${data.runtime.minutes}m`
                                        :
                                        `${data.number_of_seasons} season with ${data.number_of_episodes} episodes total`
                                    } 
                                </MediaDataAttr>
                                <div style={{marginTop: '10px'}}>
                                    <b>Overview</b>
                                    <p>{data.overview}</p>
                                </div>
                                <div style={{marginTop: '10px'}}>
                                    <AddToListButton data={data} type={type} light={light} />
                                </div>
                            </MediaData>
                        </Banner>
                        {data.recomendations && data.recomendations.length > 0 && 
                            <div style={{padding: '10px'}}>
                                <SectionTitle>Recomendations</SectionTitle>
                                <Carrousel>
                                    {data.recomendations.map((d, i) => <CarrouselItem key={i} data={d} firstChild={i === 0} lastChild={i === data.recomendations.length-1}/>)}
                                </Carrousel>
                            </div>
                        }
                    </>
            }
        </>
    )
}

export default Media