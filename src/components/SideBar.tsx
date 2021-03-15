import { useContext } from 'react';
import { Button } from './Button';
import { ApiContext } from '../context/ApiContext';

import '../styles/sidebar.scss';

export function SideBar() {
  const { genres, selectedGenreId, handleClickButton } = useContext(ApiContext);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            id={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}