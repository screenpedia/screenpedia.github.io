import React, { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import styled from "styled-components"

const StyledMenu = styled.div`
    width: auto;
    padding: 10px;
    background: white;
    height: calc(100vh - 20px);
    position: sticky;
    top: 0;
    left: 0;
    display: flex;
    flex-shrink:0;
    flex-direction: column;
    z-index: 3;
    transition: all 0.2s ease;
    @media (max-width: 991px){
        width: 100%;
        overflow: hidden;
        width: calc(100vw - 20px);
        max-width: ${({open}) => open ? 'calc(100vw - 20px)' : '0px'};
        position: fixed;
        padding: ${({open}) => open ? '10px' : '10px 0px'};
        justify-content: center;
        align-items: center;
    }
`

const StyledNavLink = styled(NavLink)`
    margin-bottom: 5px;
    display: flex;
    border: none;
    width: auto;
    flex-wrap: nowrap;
    align-items: center;
    padding: 5px;
    border-radius: 10px;
    background: transparent;
    color: black;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.5s;
    font-weight: bold;
    font-size: unset;
    justify-content: center;
    &.active{
        background: rgba(0,0,0,0.10);
    }
    &:focus{
        outline:none;
    }
    & i{
        padding: 5px;
        font-size: 16px;
    }
    @media (min-width: 991px){
        & span{
            transition: all 0.2s ease;
            overflow: hidden;
            max-width: ${({open}) => open ? '100vw' : '0'};
            padding-right: ${({open}) => open ? '5px' : '0'};
            max-height: ${({open, div}) => open && div ? '100vh' : !div ? '100vh' : '0'};
        }
        padding: ${({open, div}) => open && div ? 'auto' : !div ? 'auto' : '0'};
    }

    @media (${({hiddenCondition}) => hiddenCondition}){
        display: none;
    }
`

const Button = styled.button`
    border: 0;
    border-radius: 10px;
    padding: 5px;
    transition: 0.2s all;
    background: transparent;
    &:focus{
        outline:0;
    }
    &:hover{
        cursor: pointer;
    }
`

const StyledMenuButton = styled(Button)`
    display: flex;
    align-items: center;
    position: fixed;
    padding: 10px 10px 15px 15px;
    height: 50px;
    width: 50px;
    justify-content:center;
    border-radius: 0 0 0 50%;
    background: white;
    top:0;
    right:0;
    z-index: 4;
    font-size: 30px;
    color: transparent;
    @media (min-width: 991px){
        display: none;
    }
    & i::before{
        color: black;
    }
`

const Icon = styled.i`
    &::before{
        padding: ${({padding}) => padding};
    }
`

const Menu = () => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        var body = document.querySelector('body')
        if(open) body.classList.add("oHidden")
        else body.classList.remove("oHidden")
    }, [open])

    return(
        <>
            <StyledMenuButton onClick={() => setOpen(!open)}>
                <i className={`fas fa-${open ? 'times' : 'bars'}`}></i>
            </StyledMenuButton>
            <StyledMenu open={open}>
                <Link replace onClick={() => window.innerWidth < 991 && setOpen(false)} to="/" style={{color: 'black', textDecoration: 'none'}}>
                    <h1 style={{padding:"10px", marginBottom: '5px', display: 'flex'}}>
                        M
                        <div style={{display: 'flex', transition: 'all 0.2s ease', maxWidth: open ? '100vh' : '0', overflow: "hidden"}}>ovies</div>
                    </h1>
                </Link>
                <StyledNavLink replace onClick={() => window.innerWidth < 991 && setOpen(false)} open={open} exact to="/">
                    <Icon className={`fas fa-home`}/>
                    <span>Home</span>
                </StyledNavLink>
                <StyledNavLink replace onClick={() => window.innerWidth < 991 && setOpen(false)} open={open} to="/search">
                    <Icon className={`fas fa-search`}/>
                    <span>Search</span>
                </StyledNavLink>

                <hr style={{width: "50%"}}/>
                <StyledNavLink div={+true} as="div" open={open} style={{cursor:'auto'}}>
                    <span style={{padding:'0'}}>Genres</span>
                </StyledNavLink>
                <StyledNavLink replace onClick={() => window.innerWidth < 991 && setOpen(false)} open={open} to="/genre/movie">
                    <Icon className={`fas fa-film`}/>
                    <span>Movie</span>
                </StyledNavLink>
                <StyledNavLink replace onClick={() => window.innerWidth < 991 && setOpen(false)} open={open} to="/genre/tv">
                    <Icon className={`fas fa-tv`}/>
                    <span>Tv</span>
                </StyledNavLink>

                <hr style={{width: "50%"}}/>
                <StyledNavLink hiddenCondition={'max-width: 991px'} as="button" open={open} onClick={() => setOpen(!open)}>
                    <Icon padding={'0 3px'} style={{transition: '0.2s all linear', transform: `rotate(${open ? '0' : "180deg"})`}} className={`fas fa-chevron-left`}/>
                    <span>Hide</span>
                </StyledNavLink>
            </StyledMenu>
        </>
    )
}

export default Menu;