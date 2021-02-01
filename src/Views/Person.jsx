import styled from "styled-components"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import ErrorComponent from '../Components/Error'
import SectionTitle from '../Styled/Section/SectionTitle'
import Carrousel from '../Styled/Carrousel/Carrousel'
import CarrouselItem from '../Styled/Carrousel/CarrouselItem'
import Loading from '../Components/Loading'
import Api from "../service"

const Banner = styled.div`
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
    color: black;
    & *{
        color: black;
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
    max-height: 400px;
    max-width: 267px;
    @media(max-width:991px){
        height: 200px
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

const Person = () => {
    const { type, id } = useParams(),
        [error, setError] = useState(null),
        [data, setData] = useState(null)

    useEffect(() => {
        setError(null)
        setData(null)
        Api.getById(type, id).then(setData).catch(({message}) => setError(message))
    },[id, type])

    useEffect(() => {
        if(data){
            document.title = "Screenpedia | " + data.name
            return () => {
                document.title = "Screenpedia"
            }
        }
    })

    return(
        <>
            {!data && !error ? <Loading/> :
                error ? <ErrorComponent error={error} /> :
                    <>
                        <Banner style={{background: 'rgba(0,0,0,0.1)', color: 'white'}}>
                            <MediaPoster src={!!data.profile_path ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${data.profile_path}` : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAJFBMVEX4+vvb4OTx9PXl6ezf4+f19/nt8PLz9vfq7fDi5unc4eTs7/GWhAgrAAACGUlEQVR4nO3b23KqMBiAUQEtsn3/961OtydIJEUmaXCtS7n5v5FTEHc7AAAAAAAAAAAAAAAAAAAAAAAAzvr2PX3pgNf6oXnf8Icjjyv0XZxKh8R8rRTYNF+lU8IOqwU2zaF0TNBa++jFsXRM0H7Fwn3pmKAVA5umdEzQhxXuT/3h0B7/bbbwdrpfevopGRIVnq/dZOHT1WzZfUCpiJdu040uZovuVcskzIhNt2g/LVIw5zrcENuwmcLJHdeS3bREwKzrcJO1z+YKJ99h/IZ138bOtCUCZl2HSz8OL/fXkTVXgfnnxaaLnkt/FhDhxPzjJ7hNNzoQY4fhdYUUTMw+fYr7eEn3NPclYCgx+/QpwvPF9tHHNW4gMffwSR4HbK8fxtYWz4v4aWL26VM8F5z68/cXXTuNn1JMEosUzInVJAROEwvMP++dwEli9ulTvBU4Tsw8e5r3AkeJWSdPFaoZ+lNq4HNixrnTBQK73eSC+OpZ7+H+aC7X0L8SDhwlvn6Y3VVW2P3f0KYG1lbY3ba0iYGVFXYPm9q0wLoKu6dtbVJgVYXdaGOb9ItZRYXjwPMyMeUnwXoKp4FpqilcGlhN4eRhW7JaChd/hQpLU5hAYWEfVDgsfrl0qKRwDaVjghTWX7j9dxO3/37pmrtp6ZSIzb/nvdtNnm8v9Gff1f+A/1tcbPw/MwAAAAAAAAAAAAAAAAAAAAAAALl8A7+jEA62Pbx2AAAAAElFTkSuQmCC'} />
                            <MediaData>
                                <MediaDataAttr style={{opacity: 0.75, marginTop: '5px'}}>
                                    {data.known_for_department}
                                </MediaDataAttr>
                                <MediaTitle>
                                    <div>{data.name}</div>
                                    <span style={{fontWeight: 'normal', marginLeft: '5px', opacity: 0.8}}>
                                        ({data.birthday.split("-").join("/")}{data.deathday ? ` - ${data.deathday.split("-").join("/")}` : ''})
                                    </span>
                                </MediaTitle>
                                <hr style={{background: 'transparent', width: '50%', height: '0.1px', margin:'5px 0', border: 0}}/>
                                <div>
                                    <b>Biography</b>
                                    <p>{data.biography}</p>
                                </div>
                            </MediaData>
                        </Banner>
                        <div style={{padding: '10px'}}>
                            <SectionTitle>Recomendations</SectionTitle>
                            <Carrousel>
                                {data.recomendations.map((d, i) => <CarrouselItem key={i} data={d} firstChild={i === 0} lastChild={i === data.recomendations.length-1}/>)}
                            </Carrousel>
                        </div>
                    </>
            }
        </>
    )
}

export default Person