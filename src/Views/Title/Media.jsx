import styled from "styled-components"
import SectionTitle from '../../Styled/Section/SectionTitle'
import Carrousel from '../../Styled/Carrousel/Carrousel'
import CarrouselItem from '../../Styled/Carrousel/CarrouselItem'

const Banner = styled.div`
    background: radial-gradient(rgba(255,255,255,0.75),rgba(255,255,255,.75)), url(https://image.tmdb.org/t/p/w1280${({backdropSrc}) => backdropSrc});
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
    @media(max-width: 991px){
        border-bottom-right-radius:10px;
    }
`

const MediaPoster = styled.img`
    border-radius: 10px;
    margin: 0 20px 0 0;
    display: flex;
    height: 400px;
    @media(max-width:991px){
        height: 200px
    }
`

const MediaData = styled.div`
    display: flex;
    width: auto;
    flex-direction: column;
`

const Media = ({data}) => {
    console.log(data)
    return(
        <div>
            <Banner backdropSrc={data.backdrop_path}>
                <MediaPoster src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} />
                <MediaData>
                    <h2>{data.title ? data.title : data.name }</h2>
                    <p>{data.overview}</p>
                </MediaData>
            </Banner>
            <div style={{padding: '10px'}}>
                <SectionTitle>Recomendations</SectionTitle>
                <Carrousel>
                    {data.recomendations.map((d, i) => <CarrouselItem key={i} data={d} firstChild={i === 0} lastChild={i === data.recomendations.length-1}/>)}
                </Carrousel>
            </div>
        </div>
    )
}

export default Media