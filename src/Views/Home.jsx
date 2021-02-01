import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import api from '../service'
import Carrousel from '../Styled/Carrousel/Carrousel'
import CarrouselItem from '../Styled/Carrousel/CarrouselItem'
import Section from '../Styled/Section/Section'
import SectionTitle from '../Styled/Section/SectionTitle'

const HomeBanner = styled.div`
    color: white;
    padding: 50px 10px;
    box-sizing: content-box;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;
    border-bottom-left-radius: 10px;
    background: #667db6;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`,
StyledForm = styled.form`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    & input{
        color: white;
        width: 100%;
        box-sizing: border-box;
        padding: 10px;
        border: 0;
        border-radius: 10px 0 0 10px;
        background: rgba(255,255,255,0.5);
        &:focus{
            outline: 0;
        }
        &::placeholder {
            color: white;
            opacity: 0.75;
        }
    }
    & button{
        color: white;
        width: auto
        box-sizing: border-box;
        padding: 10px;
        border: 0;
        border-radius: 0 10px 10px 0;
        background: rgba(255,255,255,0.5);
        cursor: pointer;
        &:before{
            opacity: 0.75;
        }
        &:focus{
            outline: 0;
        }
    }
`,
Home = () => {
    const [popular, setPopular] = useState(null),
    [trending, setTrending] = useState(null),
    [input, setInput] = useState(""),
    history = useHistory()

    useEffect(() => {
        api.popular().then(setPopular)
        api.trending().then(res => res.results).then(setTrending)
    }, [])


    useEffect(() => {
        document.title = "Screenpedia | Home"
        return () => {
            document.title = "Screenpedia"
        }
    })

    return (
        <div>
            <HomeBanner>
                <span>
                    <h2>Screenpedia</h2>
                    <p>The place where to find your favourite title details</p>
                    <StyledForm onSubmit={e => {
                        e.preventDefault()
                        if(input) history.push("/search/?name="+input)
                    }}>
                        <input placeholder="Movie, serie or person name" value={input} onInput={e => setInput(e.currentTarget.value)} />
                        <button type="submit" className="fas fa-search"></button>
                    </StyledForm>
                </span>
            </HomeBanner>
            <Section>
                <SectionTitle>Trending</SectionTitle>
                <Carrousel rotate={+true}>
                    {!!trending && trending.map((data, index) => <CarrouselItem rotate={+true} key={index} data={data} firstChild={index === 0} lastChild={index === trending.length-1}/>)}
                </Carrousel>
            </Section>
            <Section>
                <SectionTitle>Popular movies</SectionTitle>
                <Carrousel rotate={+true}>
                    {!!popular && popular.movies.map((data, index) => <CarrouselItem rotate={+true} key={index} data={data} firstChild={index === 0} lastChild={index === popular.length-1}/>)}
                </Carrousel>
            </Section>
            <Section>
                <SectionTitle>Popular series</SectionTitle>
                <Carrousel rotate={+true}>
                    {!!popular && popular.tv.map((data, index) => <CarrouselItem rotate={+true} key={index} data={data} firstChild={index === 0} lastChild={index === popular.length-1}/>)}
                </Carrousel>
            </Section>
        </div>
    )
}

export default Home