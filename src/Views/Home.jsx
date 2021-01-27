import { useEffect, useState } from 'react'

import api from '../service'
import Carrousel from '../Styled/Carrousel/Carrousel'
import CarrouselItem from '../Styled/Carrousel/CarrouselItem'
import Section from '../Styled/Section/Section'
import SectionTitle from '../Styled/Section/SectionTitle'
import SearchBar from '../Components/SearchBar'

const Home = () => {
    const [popular, setPopular] = useState([]),
    [trending, setTrending] = useState([])

    useEffect(() => {
        api.popular().then(res => res.results).then(setPopular)
        api.trending().then(res => res.results).then(setTrending)
    }, [])

    return (
        <div>
            <SearchBar />
            <Section>
                <SectionTitle>Popular</SectionTitle>
                <Carrousel>
                    {popular.map((data, index) => <CarrouselItem key={index} data={data} firstChild={index === 0} lastChild={index === popular.length-1}/>)}
                </Carrousel>
            </Section>
            <Section>
                <SectionTitle>Trending</SectionTitle>
                <Carrousel>
                    {trending.map((data, index) => <CarrouselItem key={index} data={data} firstChild={index === 0} lastChild={index === trending.length-1}/>)}
                </Carrousel>
            </Section>
        </div>
    )
}

export default Home