import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Button } from "./Button";

interface ISideBarProps {
  setSelectedGenre: (data: IGenreResponseProps) => void;
  handleClickButton: (id: number) => void;
  selectedGenreId: number;
}

interface IGenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function SideBar({ setSelectedGenre, handleClickButton, selectedGenreId }: ISideBarProps) {
  
  const [genres, setGenres] = useState<IGenreResponseProps[]>([]);

  useEffect(() => {
    api.get<IGenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<IGenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
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