import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import User from './User';

@Entity('user_refresh_token')
class UserRefreshToken {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  refresh_token: string;

  @Column()
  date_expiration: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;
}

export default UserRefreshToken;
