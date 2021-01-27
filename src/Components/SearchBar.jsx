import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import Section from "../Styled/Section/Section"

const InputSearch = styled.input`
    width: calc(100% - 20px);
    border-radius: 10px 0 0 10px;
    padding: 10px;
    border: 0;
    &:focus{
        outline: 0;
    }
`,
ButtonSearch = styled.button`
    border: 0;
    padding: 10px;
    border-radius: 0 10px 10px 0;
    &:hover{
        cursor: pointer;
    }
    &:focus{
        outline: 0;
    }
`

const StyledSection = styled(Section)`
    padding: 50px;
    border-radius: 0 0 0 10px;
    @media (max-width: 991px){  
        border-radius: 0 0 10px 10px;
    }
`

const Search = () => {
    const history = useHistory(),
        [search, setSearch] = useState((new URLSearchParams(history.location.search)).get("name") || "")
        
    useEffect(() => {
        setSearch((new URLSearchParams(history.location.search)).get("name") || "")
    }, [history.location.search])

    return (
        <StyledSection background={"linear-gradient(90deg,#4a00e0,#8e2de2)"}>
            <h2 style={{marginBottom: '15px', color: 'white', textAlign: 'center', filter: "drop-shadow(0px 5px 5px rgba(0,0,0,0.25))"}}>Search any movie or serie</h2>
            <div style={{display: 'flex', flexDirection: 'row', filter: "drop-shadow(0px 5px 5px rgba(0,0,0,0.25))"}}>
                <InputSearch value={search} placeholder="Movie or serie name" onInput={(e) => setSearch(e.currentTarget.value)} onKeyPress={(e) => e.code === "Enter" ? history.push(`/search/?name=${search}`) : null} />
                <ButtonSearch onClick={() => history.push(`/search/?name=${search}`)}>
                    <i className="fas fa-search"></i>
                </ButtonSearch>
            </div>
        </StyledSection>
    )
}

export default Search