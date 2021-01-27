import styled, { keyframes } from 'styled-components'

const LoaderWrapper = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
    `,
    Rotate = keyframes`
        from {
            transform: rotate(0);
        }
        
        to {
            transform: rotate(360deg);
        }
    `,
    Loader = styled.div`
        display: flex;
        justify-content: center;
    
        & .container {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 40px;
        }
    
        & .film {
            position: relative;
            left: -5px;
            top: 2px; 
            display: flex;
        }
    
        & .film-img {
            animation: ${Rotate} 1.5s linear infinite;
        }
    `

const Loading = () => (
    <LoaderWrapper>
        <Loader>
            <div className="container">
                <div className="film">
                    <img className="film-img" src={process.env.PUBLIC_URL  + "/media/film.png"} alt="" />
                    <img className="film-img" src={process.env.PUBLIC_URL  + "/media/film.png"} alt="" />
                </div>
                <img className="camera" src={process.env.PUBLIC_URL  + "/media/camera.png"} alt="" />
                <b style={{marginTop: '10px'}}>Loading, please wait</b>
            </div>
        </Loader>
    </LoaderWrapper>
)

export default Loading;