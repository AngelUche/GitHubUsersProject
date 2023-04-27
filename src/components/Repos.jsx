import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';

const Repos = () => {
  const { repos } = React.useContext(GithubContext)
  // use the reduce function to iterate over the repos
  // returns:the total laguage in the repo
  // items:the total number of language in the repo

  const languages = repos.reduce((total, item) => {
    // destructuring language fro the repo
    const { language, stargazers_count } = item;
    // check if the value for the language is emptyy, return the 
    // the total
    if (!language) return total;

    // check if there is no language 
    // return: create the laguage in the language fioled and assign the value of 1 to it
    if (!total[language]) {
      total[language] = {
        label: language, value: 1,
        stars: stargazers_count
      };
    }
    
    // else return the language and assign the different languages to label and the 
    // number of languages to value
    else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars:total[language].stars + stargazers_count || 1
      };
    }
    // return total number of  languages and the different languages
    return total;

  }, {})
  
  // MOST USED LANGUAGES
  const mostUsedLanguages = Object.values(languages).sort((a, b) => {
    // sort the languages acording to the the highest most populous languages
    //  slice {cutoff } off the others and display only the 7 most popular languages
    return b.value - a.value;
  }).slice(0, 6)


  // MOST POPULOUS LANGUAGES
  const mostPopularLanguages = Object.values(languages).sort((a, b) => { 
    return b.stars - a.stars
  }).map((item) => {
    return {...item, value:item.stars }
  }).slice(0, 6)
  // STEP 2 - Chart Data


// MOST STATRS AND THE MOST FORKED REPOS
  let { stars, forks } = repos.reduce((total, item) => {
    // get the data values from item
    const { stargazers_count, name, forks } = item;
    // get the total values and assine the name to labele and values to value
    total.stars[stargazers_count] = {
      label: name,
      value: stargazers_count || 2
    };
    total.forks[forks] = {
      label: name,
      value: forks ||2,
    };

    return total
  },
    {
      stars: {},
      forks: {}
    })
  // sort the stars value and revrsee the order
  stars = Object.values(stars).slice(-5).reverse()
  forks = Object.values(forks).slice(0, 6).reverse()

  const chartData = [
  {
    label: "HTML",
    value: "13"
  },
  {
    label: "CSS",
    value: "40"
  },
  {
    label: "JavScript",
    value: "9"
  },
];
  
  return (
    <section className="section">
    <Wrapper className='section-center'>
        <Pie3D data={mostUsedLanguages} />
        <Column3D data={stars}/>
        <Doughnut2D data={mostPopularLanguages} />
        <Bar3D data={forks}/>
    </Wrapper>
  </section>
    )
  
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
