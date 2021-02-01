import React, { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import styled from "styled-components"
import Context from "../context"
import Api from '../service'

const StyledMenu = styled.div`
    width: auto;
    padding: 10px;
    background: white;
    height: calc(100vh - 20px);
    position: sticky;
    top: 0;
    left: 0;
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    z-index: 3;
    transition: all 0.2s ease;
    overflow-y: auto;
    @media (max-width: 991px){
        width: 100%;
        width: calc(100vw - 20px);
        max-width: ${({open}) => open ? 'calc(100vw - 20px)' : '0px'};
        position: fixed;
        padding: ${({open}) => open ? '10px' : '10px 0px'};
        align-items: center;
        justify-content: start;
    }
`

const StyledNavLink = styled(NavLink)`
    margin: 2px auto;
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
    cursor: ${({div}) => div ? "auto" : "pointer"};
    transition: all 0.5s;
    font-weight: bold;
    font-size: unset;
    justify-content: center;
    white-space: nowrap;
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
        & i{
            transition: all 0.2s ease;
            overflow: hidden;
            padding: ${({open, div}) => open && div ? 'auto' : !div ? 'auto' : '0'};
            max-width: ${({open, div}) => open && div ? '100vw' : !div ? '100vw' : '0'};
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
    const [open, setOpen] = useState(window.innerWidth > 991),
        login = (notify) => {
            Api.login().then(u => {
                notify("Welcome " + u.displayName + "! ♥")
            }).catch(console.error)
        },
        logout = (notify, user) => {
            Api.logout().then(u => {
                notify("Bay " + user.displayName + "! 😞")
            }).catch(console.error)
        }

    useEffect(() => {
        var body = document.querySelector('body')
        if(open) body.classList.add("oHidden")
        else body.classList.remove("oHidden")
    }, [open])

    return(
        <Context.Consumer>
            {({user, notify}) => (
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
                        
                        <div>
                            <StyledNavLink replace onClick={() => window.innerWidth < 991 && setOpen(false)} open={open} exact to="/">
                                <Icon className={`fas fa-home`}/>
                                <span>Home</span>
                            </StyledNavLink>
                            <StyledNavLink replace onClick={() => window.innerWidth < 991 && setOpen(false)} open={open} to="/search">
                                <Icon className={`fas fa-search`}/>
                                <span>Search</span>
                            </StyledNavLink>
            
                            <hr style={{width: "50%"}}/>
                            <StyledNavLink div={+true} as="div" open={open} >
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
                            <StyledNavLink div={+true} as="div" open={open} >
                                <span style={{padding:'0'}}>User</span>
                            </StyledNavLink>
                            {!user ? 
                                <StyledNavLink as="button" onClick={() => login(notify, user)} open={open}>
                                    <Icon className={`fas fa-sign-in-alt`}/>
                                    <span>Login</span>
                                </StyledNavLink>
                                :
                                user.loading ? 
                                    <StyledNavLink as="div" div={+true}>
                                        <img alt="Loading spinner" src={process.env.PUBLIC_URL + "/media/spinner.gif"} style={{display: "block", margin: 'auto'}} height="40" width="40" />
                                    </StyledNavLink>
                                    :
                                    <>
                                        <StyledNavLink replace onClick={() => window.innerWidth < 991 && setOpen(false)} open={open} to="/user">
                                            <Icon className={`fas fa-user`}/>
                                            <span>{user.displayName.split(" ")[0]}</span>
                                        </StyledNavLink>
                                        <StyledNavLink as="button" div={+true} onClick={() => logout(notify, user)} open={open} style={{cursor:'pointer'}}>
                                            <Icon className={`fas fa-sign-out-alt`}/>
                                            <span>Logout</span>
                                        </StyledNavLink>
                                    </>
                            }
                        </div>
        
                        <StyledNavLink hiddenCondition={'max-width: 991px'} as="button" open={open} onClick={() => setOpen(!open)}>
                            <Icon padding={'0 3px'} style={{transition: '0.2s all linear', transform: `rotate(${open ? '0' : "180deg"})`}} className={`fas fa-chevron-left`}/>
                            <span>Hide</span>
                        </StyledNavLink>
                    </StyledMenu>
                </>
            )}
        </Context.Consumer>
    )
}

export default Menu;