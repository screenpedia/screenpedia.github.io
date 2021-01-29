import api from '../service'
import Context from '../context'
import styled from 'styled-components'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const UserWrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    padding: 20px 10px;
`,
StyledLists = styled.div`
`,
StyledList = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
    border-radius: 10px;
    margin: 5px 0;
    background: rgba(0,0,0,0.05);
`,
StyledListHeader = styled.div`
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    flex-wrap: wrap;
    width: 100%;
    max-width: 100%;
    padding: 10px;
    background: rgba(255,255,255,0.5);
    border-radius: 10px;
    min-height: calc(40px);
`,
Actions = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: auto;
    transition: 1s all;
    &:first-child{
        margin-left: 0;
    }
`,
Action = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    height: 32px;
    width: 32px;
    margin-left: 5px;
    border-radius: 50%;
    border: 0;
    transition: 0.5s all;
    background: transparent;
    &:hover{
        background: rgba(0,0,0,0.1);
        cursor: pointer;
        &.fa-times, &.fa-trash{
            background: rgba(255,0,0,0.5);
        }
        &.fa-check{
            background: rgba(0,255,0,0.5);
        }
    }
    &:focus{
        outline: none;
    }
`,
StyledInput = styled.input`
    width: 100%;
    box-sizing: border-box;
    padding: 10px;  
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 10px;
    background: rgba(255,255,255,0.5);
    &:focus{
        outline: 0;
    }
`,
StyledListData = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 10px;
    max-height: ${({open}) => open? '100vh' : '0'};
    overflow: hidden;
    transition: 0.5s all ease;
`,
StyledTitle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    box-sizing: border-box;
    padding: 5px 10px;
    border-radius: 10px;
    background: rgba(255,255,255,0.5);
    margin-top: 5px;
    transition: 0.5s all;
    @media(min-width: 991px){
        & div button{
            opacity: 0;
        }
    }
    &:hover div button{
        opacity: 1;
    }
`,
Title = ({notify, userId, listId, data}) => {
    const del = () => {
        api.removeTitleFromList(userId, listId, data)
            .then(notify("Successfully deleted"))
            .catch((err) => {
                notify("Ups somthing wents wrong", true)
                console.error(err)
            })
    }

    return (
        <StyledTitle>
            <Link to={`/${data.type}/${data.id}`} style={{textDecoration: 'none', color: 'black'}}>
                {data.name}
            </Link>
            <Actions>
                <Action onClick={del} className="fas fa-trash"/>
            </Actions>
        </StyledTitle>
    )
},
List = ({unique, data, userId, notify}) => {
    const [edit, setEdit] = useState(false),
        [newName, setNewName] = useState(data.name),
        [open, setOpen] = useState(unique),
        del = () => {
            if(window.confirm(`Do you want to delete ${data.name} list?`)){
                api.deleteList(data.author, data.id)
                    .then(notify("Successfully deleted"))
                    .catch((err) => {
                        notify("Ups somthing wents wrong", true)
                        console.error(err)
                    })
            }
        },
        confirmNameEdit = () => {
            if(newName !== data.name &&window.confirm(`Do you want to save changes?`)){
                api.updateName(data.author, data.id, newName)
                    .then(notify("Successfully edited"))
                    .catch((err) => {
                        notify("Ups somthing wents wrong", true)
                        console.error(err)
                    })
            }
            setEdit(false)
        }

    return (
        <StyledList>
            <StyledListHeader open={open}>
                <div style={{display: 'flex', justifyContent: 'center', flexDirection:'column'}}>
                    {edit ? 
                        <StyledInput placeholder="List name" value={newName} onInput={(e) => setNewName(e.currentTarget.value)} />
                        :
                        <>
                            <b>{data.name}</b>
                            <p>To Watch: {data.list.length}</p>
                        </>
                    }
                </div>
                <Actions>
                    {!unique &&
                        <Action onClick={()=>setOpen(!open)} className='fas fa-chevron-up' style={{transform: `rotate(${open ? '180deg' : '0'})`}} />
                    }
                    <Action onClick={()=>setEdit(!edit)} className={`fas fa-${edit ? 'times' : 'pen'}`} />
                    {edit ? 
                        <Action onClick={confirmNameEdit} className="fas fa-check" />
                        :
                        unique ? null :
                            <Action onClick={del} className="fas fa-trash" />
                    }
                </Actions>
            </StyledListHeader>
            <StyledListData open={open}>
                {data.list.map(title => <Title key={title.id} notify={notify} userId={userId} listId={data.id} data={title} />)}
            </StyledListData>
        </StyledList>
    )
},  
User = () => {
    return (
        <Context.Consumer>
            {({user, lists, notify}) => (
                <UserWrapper>
                    <h2 style={{maxWidth: "calc(100% - 40px)"}}>{user.displayName}</h2>
                    <StyledLists>
                        {lists.map(list => (
                            <List notify={notify} unique={lists.length === 1} key={list.id} data={list} userId={user.uid} />
                        ))}
                    </StyledLists>
                </UserWrapper>
            )}
        </Context.Consumer>
    )
}

export default User