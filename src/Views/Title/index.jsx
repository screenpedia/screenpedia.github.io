import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"

import Api from '../../service';
import ErrorComponent from '../../Components/Error'
import MediaComponent from './Media'
import Loading from '../../Components/Loading'

const Title = () => {
    const { type, id } = useParams(),
        [data, setData] = useState(null),
        [error, setError] = useState(null),
        history = useHistory()

    useEffect(() => {
        Api.getById(type, id).then(setData).catch(({message}) => setError(message))
    },[id, type])

    useEffect(() => {
        setData(null)
    },[history])

    return(
        <>
            {!data && !error ?
                <Loading /> :
                error ?
                    <ErrorComponent error={error} /> :
                    <MediaComponent data={data} />
            }
        </>
    )
}

export default Title