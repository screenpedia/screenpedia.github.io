import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

import Api from '../../service';
import ErrorComponent from '../../Components/Error'
import MediaComponent from './Media'
import Loading from '../../Components/Loading'

const Title = () => {
    const { type, id } = useParams();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        Api.getById(type, id).then(setData).catch(({message}) => setError(message))
    },[id, type])

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