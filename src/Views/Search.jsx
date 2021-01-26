import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Loading from '../Components/Loading'
import api from '../service'

import Carrousel from '../Styled/Carrousel/Carrousel'
import CarrouselItem from '../Styled/Carrousel/CarrouselItem'
import ErrorComponent from '../Components/Error'

const SectionTitle = styled.h3`
    margin-bottom: 5px;
`

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

const getQuery = (query) => {
    var querys = window.location.href.split("?")[1].split("&"),
        data = querys.map(q => ({key:q.split("=")[0], value:q.split("=")[1]}))
    return data.find(d => d.key === query) ? data.find(d => d.key === query).value : null;
}

const Search = () => {
    const [search, setSearch] = useState([]),
        [error, setError] = useState(null),
        [page, setPage] = useState(null),
        [totalPages, setTotalPages] = useState(0),
        name = getQuery("name")
    // if(!name) history.push("/")
    useEffect(() => {
        api.find(name, page)
            .then(res => {
                if(res.total_results === 0) throw new Error("No movie/serie match with input")
                setError(null)
                setSearch(res.results)
                setPage(res.page)
                setTotalPages(Math.ceil(res.total_results / 20))
            })
            .catch(err => setError(err.message))
    }, [name, page])

    return (
        <div style={{padding: '10px'}}>
            <SectionTitle>Search</SectionTitle>
            {search === 0 && !error ? 
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
        </div>
    )
}

export default Search