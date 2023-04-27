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
  const [loading, setloading] = useState(false);

  // setting the erroe to be displayed when rate is exceeded
  const [error, setError] = useState({isErrorTrue:false, message:" "})
  
 
  useEffect(() => async function fetchData() {
     try {
       const response = await axios(`${rootUrl}/rate_limit`);
       let { rate } = response.data
       console.log(rate.remaining);
       setRequest(rate.remaining);
       if (rate.remaining === 0) {
      //    throw an error
        //  ivoking the error 
         toggleEror(true, "sorry, you have exceeded your hourly search limit")
       }
    } catch (error) {
      console.log(error);
    }
  }, []);

  function toggleEror(isErrorTrue = false, message= '') {
    setError({isErrorTrue, message});
  }
  const values = { githubUsers, folowers, repos, request, error }
  return (
    <GithubContext.Provider
      value={values}>
      {children}
    </GithubContext.Provider>
  )
}

export {GithubContext, GithubProvider}