import { LiHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

type MenuListProps = LiHTMLAttributes<HTMLLIElement> & {
  link: string;
  name: string;
};

function MenuList({ link, name, ...liProps }: MenuListProps) {
  return (
    <li {...liProps}>
      <Link className='block max-w-max' to={link}>
        {name}
      </Link>
    </li>
  );
}

const links = [
  { name: 'Profile', link: '/profile' },
  { name: 'Edit Profile', link: '/profile-settings' },
  { name: 'About', link: '/about' },
  { name: 'MusicVisualization', link: '/music-visualizer' },
];

export default function Popup() {
  return (
    <div className=' max-w-max rounded-2xl bg-black/30 font-semibold backdrop-blur-sm'>
      <ul className='block overflow-hidden text-black'>
        {links.map((_, index) => {
          return (
            <MenuList
              key={crypto.randomUUID()}
              link={links[index].link}
              name={links[index].name}
              className=' rounded-2xl px-5 py-2 text-gray-100 transition-all duration-300 hover:bg-gray-200/30 hover:text-blue-400'
            />
          );
        })}
      </ul>
    </div>
  );
}
