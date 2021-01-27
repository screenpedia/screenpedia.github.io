import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import api from '../service'
import Loading from '../Components/Loading'
import Carrousel from '../Styled/Carrousel/Carrousel'
import CarrouselItem from '../Styled/Carrousel/CarrouselItem'
import ErrorComponent from '../Components/Error'
import SearchBar from '../Components/SearchBar'
import Section from '../Styled/Section/Section'

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

const Search = () => {
    const [search, setSearch] = useState(null),
        [error, setError] = useState(null),
        [page, setPage] = useState(null),
        [totalPages, setTotalPages] = useState(0),
        history = useHistory(),
        [name, setName] = useState((new URLSearchParams(history.location.search)).get("name") || null)
        
    useEffect(() => {
        if(name !== ""){
            setError(null)
            api.find(name, page)
                .then(res => {
                    if(res.total_results === 0) throw new Error("No movie/serie match with input")
                    setSearch(res.results)
                    setPage(res.page)
                    setTotalPages(Math.ceil(res.total_results / 20))
                })
                .catch(err => setError(err.message))
        }
    }, [name, page])

    useEffect(() => {
        setName((new URLSearchParams(history.location.search)).get("name") || "")
    }, [history.location.search])

    return (
        <div>
            <SearchBar />
            <Section>
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
        </div>
    )
}

export default Search