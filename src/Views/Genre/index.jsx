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
    &:hover{
        background: rgba(0,0,0,0.2);
    }
`

const TypeGenre = () => {
    const { type } = useParams(),
        [data, setData] = useState(null),
        [error, setError] = useState(null)

    useEffect(() => {
        Api.typeGenre(type).then(res => setData(res.genres)).catch(({message}) => setError(message))
    },[type])

    return(
        <Section>
            <SectionTitle>{type} genres</SectionTitle>
            {!data && !error ?
                <Loading /> : 
                error ?
                    <Error error={error} /> :
                    <Container style={{flexWrap: 'wrap', flexDirection: 'column'}}>
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