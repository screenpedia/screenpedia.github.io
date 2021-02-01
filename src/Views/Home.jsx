import { useEffect, useState } from 'react'

import api from '../service'
import Carrousel from '../Styled/Carrousel/Carrousel'
import CarrouselItem from '../Styled/Carrousel/CarrouselItem'
import Section from '../Styled/Section/Section'
import SectionTitle from '../Styled/Section/SectionTitle'

const Home = () => {
    const [popular, setPopular] = useState(null),
    [trending, setTrending] = useState([])

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
            <Section>
                <SectionTitle>Trending</SectionTitle>
                <Carrousel rotate={+true}>
                    {trending.map((data, index) => <CarrouselItem rotate={+true} key={index} data={data} firstChild={index === 0} lastChild={index === trending.length-1}/>)}
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