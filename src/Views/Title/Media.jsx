import styled from "styled-components"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import ColorThief from 'colorthief'
import tinycolor from 'tinycolor2'

import SectionTitle from '../../Styled/Section/SectionTitle'
import Carrousel from '../../Styled/Carrousel/Carrousel'
import CarrouselItem from '../../Styled/Carrousel/CarrouselItem'
import Loading from '../../Components/Loading'

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
        border-bottom-right-radius:10px;
    }
`

const MediaPoster = styled.img`
    border-radius: 10px;
    margin: 0 20px 0 0;
    display: flex;
    height: 400px;
    width: 267px;
    @media(max-width:991px){
        height: 200px
    }
`

const MediaData = styled.div`
    display: flex;
    width: auto;
    flex-direction: column;
`

const MediaDataAttr = styled.span`
    &:before{
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        display: inline-flex;
        align-content: center;
        align-items: center;
        justify-content: center;
        font-style: normal;
        font-variant: normal;
        text-rendering: auto;
        line-height: 1;
        font-weight: 600;
        padding: ${({first}) => first ? null : '0 5px'};
        font-size: 8px;
        vertical-alignment: center;
        font-family: "Font Awesome 5 Free";
        opacity: 0.8;
        // content: '${({first}) => first ? null : '\f192'}';
        content: '${({first}) => first ? null : ''}';
    }
`

const Genre = styled(Link)`
    padding: 2px 4px;
    margin: 0 2px;
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

const Media = ({data}) => {
    const [r, setR] = useState(null),
        [g, setG] = useState(null),
        [b, setB] = useState(null),
        [light, setLight] = useState(false)

    useEffect(() => {
        setLight(tinycolor(`rgb (${r},${g},${b})`).isLight())
    }, [r,g,b])

    useEffect(()=>{
        if(data.poster_path){
            const img = new Image(),
                colorThief = new ColorThief();
            img.setAttribute('crossOrigin', 'Anonymous')
            img.addEventListener("load", function(){
                const color = colorThief.getColor(img)
                setR(color[0])
                setG(color[1])
                setB(color[2])
            })
            img.src = `https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=https://image.tmdb.org/t/p/w300_and_h450_bestv2/${data.backdrop_path ? data.backdrop_path : data.poster_path}`
        }else{
            setR(255)
            setG(255)
            setB(255) 
        }
    }, [data.poster_path, data.backdrop_path])
    
    return(
        <>
            {!r || !g || !b ? 
                <Loading/> : 
                <div>
                    <Banner light={light} backdropSrc={data.backdrop_path} r={r} g={g} b={b}>
                        <MediaPoster src={!!data.poster_path ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${data.poster_path}` : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAJFBMVEX4+vvb4OTx9PXl6ezf4+f19/nt8PLz9vfq7fDi5unc4eTs7/GWhAgrAAACGUlEQVR4nO3b23KqMBiAUQEtsn3/961OtydIJEUmaXCtS7n5v5FTEHc7AAAAAAAAAAAAAAAAAAAAAAAAzvr2PX3pgNf6oXnf8Icjjyv0XZxKh8R8rRTYNF+lU8IOqwU2zaF0TNBa++jFsXRM0H7Fwn3pmKAVA5umdEzQhxXuT/3h0B7/bbbwdrpfevopGRIVnq/dZOHT1WzZfUCpiJdu040uZovuVcskzIhNt2g/LVIw5zrcENuwmcLJHdeS3bREwKzrcJO1z+YKJ99h/IZ138bOtCUCZl2HSz8OL/fXkTVXgfnnxaaLnkt/FhDhxPzjJ7hNNzoQY4fhdYUUTMw+fYr7eEn3NPclYCgx+/QpwvPF9tHHNW4gMffwSR4HbK8fxtYWz4v4aWL26VM8F5z68/cXXTuNn1JMEosUzInVJAROEwvMP++dwEli9ulTvBU4Tsw8e5r3AkeJWSdPFaoZ+lNq4HNixrnTBQK73eSC+OpZ7+H+aC7X0L8SDhwlvn6Y3VVW2P3f0KYG1lbY3ba0iYGVFXYPm9q0wLoKu6dtbVJgVYXdaGOb9ItZRYXjwPMyMeUnwXoKp4FpqilcGlhN4eRhW7JaChd/hQpLU5hAYWEfVDgsfrl0qKRwDaVjghTWX7j9dxO3/37pmrtp6ZSIzb/nvdtNnm8v9Gff1f+A/1tcbPw/MwAAAAAAAAAAAAAAAAAAAAAAALl8A7+jEA62Pbx2AAAAAElFTkSuQmCC'} />
                        <MediaData>
                            <h2 style={{display:'flex', fontSize: "35px"}}>
                                {data.title ? data.title : data.name }
                                {data.release_date && 
                                    <span style={{color: light  ? 'black' : 'white', fontWeight: 'normal', marginLeft: '5px', opacity: 0.8}}>
                                        ({data.release_date.split('-')[0]})
                                    </span>
                                }
                            </h2>
                            <div>
                                <MediaDataAttr first={+true}>
                                    {data.release_date ? data.release_date.split("-").join("/") : "Unknow"}
                                </MediaDataAttr>
                                <MediaDataAttr>
                                    {data.genres && data.genres.map(g =>
                                        <Genre key={g.id} to={`/genre/${g.id}`}>{g.name}</Genre>
                                    )}
                                </MediaDataAttr>
                                <MediaDataAttr>
                                    {data.runtime.hours}h {data.runtime.minutes}m 
                                </MediaDataAttr>
                            </div>
                            {data.video.lenght > 0 && 
                                <div>
                                    <StyledButton target='_blank' href={`https://www.youtube.com/watch?v=${data.video[0].key}`}>
                                        <span className="fas fa-play"></span>
                                    </StyledButton>
                                </div>
                            }
                            <hr style={{background: light  ? 'black' : 'white', width: '50%', height: '0.1px', margin:'5px 0', border: 0}}/>
                            <div>
                                <b>Overview</b>
                                <p>{data.overview}</p>
                            </div>
                        </MediaData>
                    </Banner>
                    <div style={{padding: '10px'}}>
                        <SectionTitle>Recomendations</SectionTitle>
                        <Carrousel>
                            {data.recomendations.map((d, i) => <CarrouselItem key={i} data={d} firstChild={i === 0} lastChild={i === data.recomendations.length-1}/>)}
                        </Carrousel>
                    </div>
                </div>}
        </>
    )
}

export default Media