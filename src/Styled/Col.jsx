import styled from 'styled-components';

const StyledCol = styled.div`
    flex: 0 0 ${({maxCol = 10, col = 10}) => col * 100 / maxCol}%;
    max-width: ${({maxCol = 10, col = 10}) => col * 100 / maxCol}%;
`

export default StyledCol;