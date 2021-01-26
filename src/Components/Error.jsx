import styled from "styled-components"

const ErrorWrapper = styled.div`
    background: rgba(255,0,0,0.5);
    padding: 20px;
    margin: 10px;
    border-radius: 10px;
`

const Error = ({error}) => {
    return(
        <ErrorWrapper>
            {error}
        </ErrorWrapper>
    )
}

export default Error