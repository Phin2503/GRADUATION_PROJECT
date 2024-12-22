import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Movie } from '../movie/movie.entity';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Movie, (Movie) => Movie.genre)
  movie: Movie[];
}
