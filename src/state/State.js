import { useState, useEffect } from "react";
import React from "react";
import githubStateContext from "./context";
import { Octokit } from "@octokit/core";
const octokit = new Octokit({
    auth: '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'
})



export const State = ({ children }) => {
    const [error, setError] = useState('');
    const [notFoundUser, setNotFoundUser] = useState([]);
    const [searchUser, setSearchUser] = useState('');
    const [user, setUser] = useState([]);
    const [showUser, setShowUser] = useState([]);

    const [repos, setRepos] = useState([]);
    const [searchRepo, setSearchRepo] = useState(['', '', 0]);

    const [showRepos, setShowRepos] = useState(false);

    useEffect(() => {
        const getUser = u => {
            if (u !== '') {
                octokit.request('GET /users/{user}', {
                    user: u
                }).then(response => {
                    setUser(user => user.concat(response.data));
                }
                ).catch(err => {
                    setNotFoundUser(notFoundUser => notFoundUser.concat(u));
                }
                );
            }
        }
        getUser(searchUser);
    }, [searchUser]);

    useEffect(() => {
        const getUserRepos = (user, page) => {
            octokit.request('GET /users/{user}/repos', {
                user: user,
                per_page: 100,
                page: page

            }).then
                (response => {
                    setRepos(userRepos => userRepos.concat(response.data));
                }
                ).catch(err => {
                    setError(err)
                }
                );
        }
        const getOrgRepos = (org, page) => {
            octokit.request('GET /orgs/{org}/repos', {
                org: org,
                per_page: 100,
                page: page

            }).then(response => {
                setRepos(orgRepos => orgRepos.concat(response.data));
            }
            ).catch(err => {
                setError(err)
            }
            );
        }
        if (searchRepo[0] === 'User') {
            for (let i = 1; i <= searchRepo[2]; i++) {
                getUserRepos(searchRepo[1], i);
            }
        }
        if (searchRepo[0] === 'Organization') {
            for (let i = 1; i <= searchRepo[2]; i++) {
                getOrgRepos(searchRepo[1], i);
            }
        }
    }
        , [searchRepo]);


    const Sort = (array, key) => {

        if (key === 'most stars') {

            return array.sort(function (a, b) {
                var x = a['stargazers_count'];
                var y = b['stargazers_count'];
                return ((x < y) ? 1 : ((x > y) ? -1 : 0));
            });
        }
        else if (key === 'most popular') {
            return array.sort(function (a, b) {
                var x = a['watchers_count'] + a['forks_count'] + a['stargazers_count'] + (a['fork']?1:0);
                var y = b['watchers_count'] + b['forks_count'] + b['stargazers_count'] + (b['fork']?1:0);
                return ((x < y) ? 1 : ((x > y) ? -1 : 0));
            });
        }
        else if (key === 'most popular original work') {
            return array.sort(function (a, b) {
                var x = a['watchers_count'] + a['forks_count'] + a['stargazers_count'];
                var y = b['watchers_count'] + b['forks_count'] + b['stargazers_count'];
                return ((x < y) ? 1 : ((x > y) ? -1 : 0));
            });
        }
        else if(key === 'most popular react'){
            return array.sort(function (a, b) {
                var x = a['watchers_count'] + a['forks_count'] + a['stargazers_count'] + (a['fork']?1:0) + a['open_issues_count'];
                var y = b['watchers_count'] + b['forks_count'] + b['stargazers_count'] + (b['fork']?1:0) + b['open_issues_count'];
                return ((x < y) ? 1 : ((x > y) ? -1 : 0));
            });
        }
        else {
            return array
        }
    }

    return (
        <githubStateContext.Provider
            value={{
                error,
                user,
                notFoundUser,
                searchUser,
                repos,
                searchRepo,
                showRepos,
                showUser,
                setError,
                setUser,
                setNotFoundUser,
                setSearchUser,
                setRepos,
                setSearchRepo,
                setShowRepos,
                setShowUser,
                Sort
            }}>
            {children}
        </githubStateContext.Provider>
    )
}
export default State;