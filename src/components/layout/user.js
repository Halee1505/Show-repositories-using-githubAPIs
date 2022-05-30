import React, { useContext } from "react";
import githubStateContext from '../../state/context'

import "../../css/style.css";
import { Navbar, Button, Card, Container } from 'react-bootstrap'

export default function User() {
    const githubState = useContext(githubStateContext);
    const showRepos = (id) => {
        if (id !== 0) {
            githubState.setShowUser(githubState.user.filter(user => user.id === id))
        }
        else {
            githubState.setShowUser(githubState.user)
        }
        githubState.setShowRepos(true);
    }

    return (
        <React.Fragment>
            {
                (githubState.user.length !== 0 || githubState.notFoundUser.length !== 0) ?
                    <Navbar bg="light justify-content-center" expand="lg">
                        <Container>
                            {
                                githubState.user.length !== 0 ?
                                    <Button onClick={() => {
                                        showRepos(0)
                                    }}>
                                        View all repositories
                                    </Button>
                                    : ""
                            }
                            {
                                githubState.notFoundUser.length !== 0 ?
                                    `Users/Orgs not found: ${githubState.notFoundUser.toString()}`
                                    : ""
                            }
                        </Container>
                    </Navbar>
                    :
                    ""
            }
            <div className='content-overlay'>
                {

                    githubState.user.length !== 0 && githubState.user.map((item, index) => {
                        return (

                            <Card style={{ width: '10rem' }} key={index}>
                                <Card.Img variant="top" src={item.avatar_url} />
                                <Card.Body>
                                    <Card.Title>{item.login}</Card.Title>
                                    <Card.Text>
                                        {item.type}
                                    </Card.Text>
                                    <Button variant="primary" size='sm' onClick={() => { showRepos(item.id) }}>Show Repositories</Button>
                                    <a href={item.html_url}><Button variant="primary" size='sm'>Go to github</Button></a>
                                </Card.Body>
                            </Card>

                        )
                    }
                    )
                }
            </div>
        </React.Fragment>
    );
}