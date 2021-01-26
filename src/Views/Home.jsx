import { useEffect, useState } from 'react'

import api from '../service'
import Carrousel from '../Styled/Carrousel/Carrousel'
import CarrouselItem from '../Styled/Carrousel/CarrouselItem'
import SectionTitle from '../Styled/Section'

const Home = () => {
    const [popular, setPopular] = useState([])
    const [trending, setTrending] = useState([])

    useEffect(() => {
        api.popular().then(res => res.results).then(setPopular)
        api.trending().then(res => res.results).then(setTrending)
    }, [])

    return (
        <div style={{padding: '10px'}}>
            <div>
                <SectionTitle>Popular</SectionTitle>
                <Carrousel>
                    {popular.map((data, index) => <CarrouselItem key={index} data={data}/>)}
                </Carrousel>
            </div>
            <div>
                <SectionTitle>Trending</SectionTitle>
                <Carrousel>
                    {trending.map((data, index) => <CarrouselItem key={index} data={data}/>)}
                </Carrousel>
            </div>
        </div>
    )
}

export default Home