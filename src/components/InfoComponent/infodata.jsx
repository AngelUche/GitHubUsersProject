import { GoRepo, GoGist } from 'react-icons/go';
import { FiUsers, FiUserPlus } from 'react-icons/fi';
// since the info is inform of array, we set up an array o iterate over the data
export const infoItems = [
  
    {
      id: 1,
      icon: <GoRepo className='icon' />,
      label: 'repos',
      value: public_repos,
      color:'pink'
    },
    {
      id: 2,
      icon: <FiUsers className='icon' />,
      label: 'followers',
      value: followers,
      color:'green'
    },
    {
      id: 3,
      icon: <FiUserPlus className='icon' />,
      label: 'following',
      value: following,
      color:'purple'
    },
    {
      id: 4,
      icon: <GoGist className='icon' />,
      label: 'gist',
      value: public_gists,
      color:'yellow'
    },
  ]