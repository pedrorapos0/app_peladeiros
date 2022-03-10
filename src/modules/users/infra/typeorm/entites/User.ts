import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Exclude, Expose } from 'class-transformer';

@Entity('user')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  birth_date: Date;

  @Column()
  user_avatar: string;

  @Column()
  admin: boolean;


  @Expose()
  user_avatar_url() {
    return `http://localhost:3333/avatar/${this.user_avatar}`;
  }

  constructor() {
    if (this.id === undefined) {
      this.id = uuidV4();
      this.admin = false;
    }
  }
}

export default User;
