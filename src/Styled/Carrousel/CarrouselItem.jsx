import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const CarrouselItemWrapper = styled.div`
        // Pq el carousel esta rotado 180 asi queda la scrollbar arriba
        transform: rotateX(${({rotate}) => rotate ? '180deg' : 0});
        margin: 10px ${({lastChild}) => lastChild ? '0' : '10px'} 10px  ${({firstChild}) => firstChild ? '0' : '10px'};
        display: flex;
        flex-wrap: no-wrap;
        overflow: hidden;
        min-width: 220px;
        max-width: 220px;
        min-height: 300px;
        flex-direction: column;
        &:hover button{
            opacity:1;
        }
    `,
    StyledImg = styled.img`
        border-Radius: 10px;
        transition: 0.5s all;
        height: 334px;
        width: 220px;
        &:hover{
            transform: scale(.99); 
        }
    `,
    CarrouselItemImg = ({titleType, titleId, src})=>(
        <Link to={`/${titleType}/${titleId}`} style={{
            borderRadius: '10px',
            transition: '0.5s all'
        }}>
            <StyledImg src={src}/>
        </Link>
    ),
    CarrouselItemPercentaje = ({ number }) => (
        <div style={{ height: '15px', position: 'relative', top: '-27px', display: 'flex' }}>
            <p style={{
                margin: 0,
                height: '18px',
                width: '18px',
                borderRadius: '50%',
                background: '#081c22',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                padding: '12px',
                fontWeight: 'bold',
                color: 'white',
                transition: '0.5s all'
            }}>
                {number === 0 ? "NR" : `${number}%`}
            </p>
        </div>
    ),
    CarrouselItemData = styled.div`
        border-radius: 10px;
        margin: 0 5px;
        padding: 0px 5px 5px 5px;
        background: rgba(255,255,255,0.5);
        // background: white;
        position: relative;
        transition: all 0.5s ease;
        margin-top: ${({open}) => open ? `-110px` : '0px'};
        display: block;
        z-index: 2;
        backdrop-filter: blur(10px);
    `,
    CarrouselItemTitle = styled.div`
        font-weight: bold;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    `,
    CarrouselItemOverview = styled.div`
        width: 100%;
        height: ${({open}) => open ? '110px' : '0'};
        overflow-y: auto;
        border-color: rgba(0, 0, 0, 0.0);
        transition: border-color 0.5s linear, height 0.5s ease;
    
        &:hover {
            border-color: rgba(0, 0, 0, 0.1);
            transition: border-color 0.125s linear;
        }
    
        &::-webkit-scrollbar,
        &::-webkit-scrollbar-thumb,
        &::-webkit-scrollbar-corner {
            border-radius: 10px;
            width: 5px;
            border-right-style: inset;
            border-right-width: calc(100vw + 100vh);
            border-color: inherit;
        }
    `,
    CarrouselItemOverviewExpandButton = styled.button`
        border: 0;
        opacity: 0;
        transition: 0.5s all;
        &:focus{
            outline:0;
        }
        &:hover{
            cursor: pointer;
        }
        @media(max-width: 991px){
            opacity: 0.5;
        }
    `;

const CarrouselItem = ({data, lastChild, firstChild, rotate}) => {
    const [open, setOpen] = useState(false)
    if(!data.media_type) data.media_type = data.title ? "movie" : data.birthday ? "person" : "tv"
    
    return (
        <CarrouselItemWrapper rotate={rotate} lastChild={lastChild} firstChild={firstChild}>
            <CarrouselItemImg titleId={data.id} titleType={data.media_type} src={!!data.profile_path ? `https://image.tmdb.org/t/p/w220_and_h330_face${data.profile_path}` : !!data.poster_path ? `https://image.tmdb.org/t/p/w220_and_h330_face${data.poster_path}` : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAJFBMVEX4+vvb4OTx9PXl6ezf4+f19/nt8PLz9vfq7fDi5unc4eTs7/GWhAgrAAACGUlEQVR4nO3b23KqMBiAUQEtsn3/961OtydIJEUmaXCtS7n5v5FTEHc7AAAAAAAAAAAAAAAAAAAAAAAAzvr2PX3pgNf6oXnf8Icjjyv0XZxKh8R8rRTYNF+lU8IOqwU2zaF0TNBa++jFsXRM0H7Fwn3pmKAVA5umdEzQhxXuT/3h0B7/bbbwdrpfevopGRIVnq/dZOHT1WzZfUCpiJdu040uZovuVcskzIhNt2g/LVIw5zrcENuwmcLJHdeS3bREwKzrcJO1z+YKJ99h/IZ138bOtCUCZl2HSz8OL/fXkTVXgfnnxaaLnkt/FhDhxPzjJ7hNNzoQY4fhdYUUTMw+fYr7eEn3NPclYCgx+/QpwvPF9tHHNW4gMffwSR4HbK8fxtYWz4v4aWL26VM8F5z68/cXXTuNn1JMEosUzInVJAROEwvMP++dwEli9ulTvBU4Tsw8e5r3AkeJWSdPFaoZ+lNq4HNixrnTBQK73eSC+OpZ7+H+aC7X0L8SDhwlvn6Y3VVW2P3f0KYG1lbY3ba0iYGVFXYPm9q0wLoKu6dtbVJgVYXdaGOb9ItZRYXjwPMyMeUnwXoKp4FpqilcGlhN4eRhW7JaChd/hQpLU5hAYWEfVDgsfrl0qKRwDaVjghTWX7j9dxO3/37pmrtp6ZSIzb/nvdtNnm8v9Gff1f+A/1tcbPw/MwAAAAAAAAAAAAAAAAAAAAAAALl8A7+jEA62Pbx2AAAAAElFTkSuQmCC'} alt=""/>
            <CarrouselItemData open={open} id={data.id}>
                <CarrouselItemPercentaje number={data.vote_average ? data.vote_average * 10 : data.media_type === "person" && data.popularity ? Math.round(data.popularity) : 0}/>
                <CarrouselItemTitle>
                    {data.media_type === "movie" ? data.title : data.name}
                </CarrouselItemTitle>
                <CarrouselItemOverview open={open}>
                    {data.overview ? data.overview : data.biography ? data.biography : ''}
                </CarrouselItemOverview>
                {(data.overview || data.biography) && 
                    <CarrouselItemOverviewExpandButton onClick={() => setOpen(!open)}>
                        {open ? 'Hide overview' : 'Show overview'}
                    </CarrouselItemOverviewExpandButton>
                }
            </CarrouselItemData>
        </CarrouselItemWrapper>
    )
}

export default CarrouselItem;