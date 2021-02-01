import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

import Api from '../../service';
import Loading from '../../Components/Loading'
import Section from "../../Styled/Section/Section";
import SectionTitle from "../../Styled/Section/SectionTitle";
import Container from '../../Styled/Container'
import styled from "styled-components";
import Error from "../../Components/Error";

const Genre = styled(Link)`
    padding: 5px 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    background: rgba(0,0,0,0.1);
    text-decoration: none;
    color: black;
    transition: 0.5s all;
    width: calc(50% - 20px - 20px);
    &:hover{
        background: rgba(0,0,0,0.2);
    }
    @media(max-width: 991px){
        width: calc(100% - 20px);
    }
`

const TypeGenre = () => {
    const { type } = useParams(),
        [data, setData] = useState(null),
        [error, setError] = useState(null)

    useEffect(() => {
        Api.typeGenre(type).then(res => setData(res.genres)).catch(({message}) => setError(message))
    },[type])

    useEffect(() => {
        if(type){
            document.title = `Screenpedia | ${type === 'tv' ? 'Serie' : type.charAt(0).toUpperCase() + type.slice(1)}s genres`
            return () => {
                document.title = "Screenpedia"
            }
        }
    })

    return(
        <Section>
            <SectionTitle>{type === 'tv' ? 'Serie' : type.charAt(0).toUpperCase() + type.slice(1)}s genres</SectionTitle>
            {!data && !error ?
                <Loading /> : 
                error ?
                    <Error error={error} /> :
                    <Container style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                        {data.map(genre => (
                            <Genre key={genre.id} to={`/genre/${type}/${genre.id}`}>
                                {genre.name}
                            </Genre>
                        ))}
                    </Container>
            }
        </Section>
    )
}

export default TypeGenre