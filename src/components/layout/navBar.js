import { Navbar, Button,InputGroup, FormControl } from 'react-bootstrap'
import { useState, useContext } from 'react'
import React from 'react';
import "../../css/style.css"
import githubStateContext from '../../state/context'
import User from './user';
import Repos from './repos';

function Nvbar() {
    const githubState = useContext(githubStateContext);

    const [search, setSearch] = useState([]);
    function searchHandler(e) {
        setSearch(e.target.value.split(","));
    }
    const onSubmit = (e) => {
        githubState.setShowRepos(false)
        githubState.setUser(user=>[])
        githubState.setNotFoundUser(notFoundUser=>[])
        e.preventDefault();
        if (search.length !== 0) {
            async function set() {
                for (let i = 0; i < search.length; i++) {
                    if (search[i] !== "") {
                        await githubState.setSearchUser("")
                        await githubState.setSearchUser(search[i])
                    }
                }
            }
            set()
            setSearch([])
        }
    }

    return (
        <React.Fragment>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>Github Api</Navbar.Brand>
                <InputGroup >
                    <FormControl
                        placeholder="Search multiple usernames or orgs separated by comma"
                        aria-label="Search multiple usernames or orgs separated by comma"
                        aria-describedby="basic-addon2"
                        onChange={(e) => { searchHandler(e) }}
                        value={search}
                    />
                    <Button variant="outline-secondary" type='submit' id="button-addon2" onClick={onSubmit}>
                        Search
                    </Button>
                </InputGroup>

            </Navbar>
            {
                githubState.showRepos?
                <Repos  users={githubState.showUser}/>
                :
                <User />

            }
        </React.Fragment>
    )
}
export default Nvbar;