import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('user')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  birth_date: Date;

  @Column()
  user_avatar: string;

  @Column()
  admin: boolean;

  constructor() {
    if (this.id === undefined) {
      this.id = uuidV4();
      this.admin = false;
    }
  }
}

export default User;
