import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';


const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext()

function GithubProvider({ children }) {
  // setting up the default values for the data provider
  const [githubUsers, setGithubUsers] = useState(mockUser)
  const [folowers, seFollowers] = useState(mockFollowers)
  const [repos, setRepos] = useState(mockRepos)


  // set up the rate request
  const [request, setRequest] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // setting the erroe to be displayed when rate is exceeded
  const [error, setError] = useState({ isErrorTrue: false, message: " " })

  

  // function to get the githubUser from the ApAI when seraching th==fhor the user
  // returns the types user on the search bar
  const getGithubUser = async (user) => {
    // toggle the error message if no user is found
    toggleEror();
    setIsLoading(true)

    // fetching the repos and followers from the api
    const response = await axios(`${rootUrl}/users/${user}`).catch((error) => console.log(error));
      if (response) {
        setGithubUsers(response.data)
        const { login, followers_url } = response.data;
        
        // setting up the login to fecth the repo api
        // https://api.github.com/users/AngelUche/followers

           // setting up the login to fecth the followers api
        // axios(`${followers_url}?per_page=100`).
        //   then((response) => {
        //     seFollowers(response.data)
        //     console.log(response)
        //   })

        // this is used tp fetch more than one urls 
        await Promise.allSettled([axios(`${rootUrl}/users/${login}/repos?per_page=100`),
          axios(`${followers_url}?per_page=100`)]).then((result) => {
            console.log(result);
            const [repos, followers] = result;
            console.log(repos);
            const status = 'fulfilled';
            if (repos.status === status) {
              setRepos(repos.value.data)
            }
              if (followers.status === status) {
              seFollowers(followers.value.data)
            }
        }).catch((error)=>console.log(error))

      } else {
        toggleEror(true, 'sorry there is no such user')
      }
    CheckRequest()
    setIsLoading(false)
  }
  
  // cfunction to get the request limit of the user
  const CheckRequest = () => {
    axios(`${rootUrl}/rate_limit`).then(({ data }) => {

      // destructuirng the remaing request from the data
      let { rate: { remaining } } = data;
      setRequest(remaining);
      if (remaining === 0) {
        //    throw an error
        toggleEror(true, "sorry, you have exceeded your hourly search limit")
      }
    }).catch((error) => console.log(error))
  };
  useEffect(CheckRequest, []);

      
      

  function toggleEror(isErrorTrue = false, message= '') {
    setError({isErrorTrue, message});
  }
  const values = {
    githubUsers,
    folowers,
    repos,
    request,
    error,
    getGithubUser,
    isLoading
  }
  return (
    <GithubContext.Provider
      value={values}>
      {children}
    </GithubContext.Provider>
  )
}

export {GithubContext, GithubProvider}