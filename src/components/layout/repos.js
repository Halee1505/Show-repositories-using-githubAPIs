import githubStateContext from '../../state/context'
import { Button, Navbar, Container } from 'react-bootstrap';
import '../../css/style.css';
import { useState, useContext, useEffect } from 'react';

export default function Repos({ users }) {
    const githubState = useContext(githubStateContext);
    const [sortType, setSortType] = useState("most stars");
    const getRepos = async () => {
        await githubState.setRepos(repos => []);
        githubState.setRepos(repos => []);

        for (let i = 0; i < users.length; i++) {
            await githubState.setSearchRepo([users[i].type, users[i].login, Math.ceil(users[i].public_repos / 100)])
        }
    }
    useEffect(() => {
        getRepos();
    }
        // eslint-disable-next-line
        , [users])
    githubState.setRepos(githubState.Sort(githubState.repos, sortType));

    return (
        <div className="reposOverlay">

            <div className="repos">

                <Navbar bg='dark' variant="dark">
                    <Container>
                        <Button variant="light" onClick={() => { githubState.setShowRepos(false); }}>Back</Button>
                        <Navbar bg="dark" expand="lg">
                            <select name="sort" id="sort" onChange={e => { setSortType(e.target.value) }}>
                                <option value="most stars">Most Stars</option>
                                <option value="most popular">Most popular</option>
                                <option value="most popular original work">Most popular original work</option>
                                <option value="most popular react">Most popular react</option>

                            </select>
                        </Navbar>
                    </Container>
                </Navbar>
            </div>
            <div className="overflow">
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Owner</th>
                            <th scope="col">Owner Type</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Star</th>
                            <th scope="col">Fork</th>
                            <th scope="col">Original Fork</th>
                            <th scope="col">Watch</th>
                            <th scope="col">{sortType}</th>
                            <th scope="col">View Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            githubState.repos.map((dat, index) => {
                                return (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{dat.owner.login}</td>
                                        <td>{dat.owner.type}</td>
                                        <td>{dat.name}</td>
                                        <td>{dat.description}</td>
                                        <td>{dat.stargazers_count}</td>
                                        <td>{dat.fork ? dat.forks_count + 1 : dat.forks_count}</td>
                                        <td>{dat.forks_count}</td>
                                        <td>{dat.watchers_count}</td>
                                        {
                                            sortType === "most stars" ?
                                                <td>{dat.stargazers_count}</td>
                                                :
                                                sortType === "most popular" ?
                                                    <td>{dat.stargazers_count + dat.forks_count + dat.watchers_count}</td>
                                                    :
                                                    sortType === "most popular original work" ?
                                                        <td>{dat.fork ? dat.stargazers_count + dat.forks_count + dat.watchers_count + 1 : dat.stargazers_count + dat.forks_count + dat.watchers_count}</td>
                                                        :
                                                        sortType === "most popular react" ?
                                                            <td>{dat.fork ? dat.stargazers_count + dat.forks_count + dat.watchers_count + 1 + dat.open_issues_count : dat.stargazers_count + dat.forks_count + dat.watchers_count + dat.open_issues_count}</td>
                                                            :
                                                            ""
                                        }
                                        <td><a href={dat.html_url}>View</a></td>
                                    </tr>
                                )
                            }
                            )
                        }
                    </tbody>


                </table>
            </div>

        </div>
    )
}