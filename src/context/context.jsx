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
  return(
    <GithubContext.Provider
      value={{ githubUsers, folowers, repos }}>
      {children}
    </GithubContext.Provider>
  )
}

export {GithubContext, GithubProvider}