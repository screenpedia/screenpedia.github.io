import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router-dom'

import api from '../../service'
import Loading from '../../Components/Loading'
import Carrousel from '../../Styled/Carrousel/Carrousel'
import CarrouselItem from '../../Styled/Carrousel/CarrouselItem'
import ErrorComponent from '../../Components/Error'
import Section from '../../Styled/Section/Section'
import SectionTitle from '../../Styled/Section/SectionTitle'

const PagingLink = styled.button`
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    transition: background-color .3s;
    border: 0;
    border-radius: 10px;
    margin: 0 4px;
    cursor: pointer;
    &.active{
        cursor: auto;
        background-color: white;
        border: none;
    }
    &:focus{
        outline: none;
    }
`

const Genre = () => {
    const [search, setSearch] = useState(null),
        [error, setError] = useState(null),
        [page, setPage] = useState(1),
        [totalPages, setTotalPages] = useState(0),
        history = useHistory(),
        {name, type} = useParams()
        
    useEffect(() => {
        if(name !== ""){
            api.genreMedia(type, name, page)
                .then(res => {
                    if(res.total_results === 0) throw new Error("No movie/serie match with input")
                    setSearch(res.results)
                    setTotalPages(Math.ceil(res.total_results / 20))
                })
                .catch(err => setError(err.message))
        }else{
            history.push('/')
        }
    }, [name, type, history, page])

    return (
        <Section>
            <SectionTitle>Movie's {name} genre</SectionTitle>
            {!name ?
                <p style={{textAlign:"center"}}>Waiting to search</p> :
                !search && !error ? 
                    <Loading /> :
                    error ?
                        <ErrorComponent error={error} /> :
                        <>
                            <Carrousel style={{flexWrap: 'wrap', alignContent:"center", justifyContent:"center"}}>
                                {search.map((data, index) => <CarrouselItem key={index} data={data}/>)}
                            </Carrousel>
                            <div style={{textAlign:'center'}}>
                                <div style={{display: 'inline-block'}}>
                                    {page > 1 && <PagingLink onClick={() => setPage(page-1)}>&laquo;</PagingLink>}
                                    <PagingLink className={page===1 ? "active" : ''} onClick={() => setPage(1)}>1</PagingLink>
                                    {page !== 1 && page !== totalPages && <PagingLink className="active">{page}</PagingLink>}
                                    <PagingLink className={page===totalPages ? "active" : ''} onClick={() => setPage(totalPages)}>{totalPages}</PagingLink>
                                    {page < totalPages && <PagingLink onClick={() => setPage(page+1)}>&raquo;</PagingLink>}
                                </div>
                            </div>
                        </>
            }
        </Section>
    )
}

export default Genre