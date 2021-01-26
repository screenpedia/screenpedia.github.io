import React, { useState } from "react"
import { Link, NavLink, useHistory } from "react-router-dom"
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
    align-items: center;
    flex-direction: column;
    z-index: 3;
    transition: 0.5s max-width;
    @media (max-width: 991px){
        width: 100%;
        overflow: hidden;
        width: calc(100vw - 20px);
        max-width: ${({open}) => open ? 'calc(100vw - 20px)' : '0px'};
        position: fixed;
        padding: ${({open}) => open ? '10px' : '10px 0px'};
    }
`

const StyledNavLink = styled(NavLink)`
    display: flex;
    border: none;
    width: auto;
    flex-wrap: nowrap;
    align-items: center;
    padding: 5px 10px;
    border-radius: 10px;
    background: transparent;
    color: black;
    font-weight: bold;
    text-decoration: none;
    text-align: left;
    cursor: pointer;
    &.active{
        background: rgba(0,0,0,0.10);
    }
    & i{
        margin-right: ${({open}) => open ? "5px" : "0"};
    }
    @media (min-width: 991px){
        & span{
            display: ${({open}) => open ? "flex" : "none"};
        }
    }
`

const StyledNavItem = styled.button`
    display: flex;
    border: none;
    width: auto;
    flex-wrap: nowrap;
    align-items: center;
    padding: 5px 10px;
    border-radius: 10px;
    background: transparent;
    color: black;
    font-weight: bold;
    text-decoration: none;
    text-align: left;
    cursor: pointer;
    &.active{
        background: rgba(0,0,0,0.10);
    }
    &:focus{
        outline: 0;
    }
    & i{
        margin-right: ${({open}) => open ? "5px" : "0"};
        padding: 5px;
    }
    @media (min-width: 991px){
        & span{
            display: ${({open}) => open ? "flex" : "none"};
        }
    }
`

const StyledInput = styled.input`
    display: flex;
    width: 10vw;
    margin: 0 5px 0 0;
    border-radius: 10px;
    border: 0;
    background: transparent;
    color: black;
    font-weight: bold;
    text-decoration: none;
    &.active{
        background: rgba(0,0,0,0.10);
    }
    &:focus{
        outline: 0;
    }
    @media(max-width:991px){
        width: 100%;
    }
`

const Button = styled.button`
    border: 0;
    border-radius: 10px;
    padding: 5px;
    transition: 0.5s all;
    background: transparent;
    &:focus{
        outline:0;
    }
    &:hover{
        cursor: pointer;
    }
`

const Input = ({setOpen, open, onInput, onKeyPress, value, placeholder}) => (
    <div style={{display:'flex', flexDirection:'row', flexWrap:'nowrap', margin: '5px 10px', padding: '2.5px 5px', borderRadius: '10px', background: (open || window.innerWidth < 991) ? "rgba(0,0,0,0.1)" : ""}}>
        {(open || window.innerWidth < 991) && <StyledInput onInput={onInput} onKeyPress={onKeyPress} value={value} placeholder={placeholder} />}
        <Button onClick={() => open ? onKeyPress({code:"Enter"}) : setOpen(!open)} className="fas fa-search"/>
    </div>
)

const StyledMenuButton = styled(Button)`
    display: flex;
    align-items: center;
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 4;
    font-size: 30px;
    &:hover{
        background: rgba(0,0,0,0.1);
    }
`

const Menu = () => {
    const [open, setOpen] = useState(window.innerWidth > 991),
        [name, setName] = useState("")
    const history = useHistory();
    const input = (e) => {
        if(e.code==="Enter" && name) history.push(`/search/?name=${name}`)
        else if(e.target) setName(e.target.value)
    }
    return(
        <>
            {
                window.innerWidth < 991 &&
                <StyledMenuButton onClick={() => setOpen(!open)}>
                    <i className={`fas fa-${open ? 'times' : 'bars'}`}></i>
                </StyledMenuButton>
            }
            <StyledMenu open={open}>
                <Link to="/" style={{color: 'black', textDecoration: 'none'}}><h1 style={{marginBottom: '5px'}}>{open || window.innerWidth < 991 ? "App" : "A"}</h1></Link>
                <Input setOpen={setOpen} open={open} onInput={input} onKeyPress={e => input(e)} value={name} placeholder="Find Movie or Serie" />
                <StyledNavLink open={open} exact to="/">
                    <i className={`fas fa-home`}/>
                    <span>Home</span>
                </StyledNavLink>
                {
                    window.innerWidth > 991 &&
                    <StyledNavItem open={open} onClick={() => setOpen(!open)}>
                        <i className={`fas fa-${open ? "chevron-left" : "chevron-right"}`}/>
                        <span>Hide titles</span>
                    </StyledNavItem>
                }
            </StyledMenu>
        </>
    )
}

export default Menu;