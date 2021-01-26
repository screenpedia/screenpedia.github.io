const Loading = () => {
    var dots = '',
        toggleDots = () =>{
            if(dots.length === 3) dots = ''
            else dots += '.'
            return dots
        }
    return (
        <>
            Loading{toggleDots()}
        </>
    )
}

export default Loading;