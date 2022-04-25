import { v4 as uuidV4 } from 'uuid';

import User from '../../../../users/infra/typeorm/entites/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

@Entity('user_event')
class UserEvent {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  responsible_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'responsible_id' })
  responsible: User;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'event_guests',
    joinColumns: [{ name: 'event_id' }],
    inverseJoinColumns: [{ name: 'guest_id' }],
  })
  guests: User[];

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  minimum_number_guests: number;

  @Column()
  maximum_number_guests?: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose()
  user_avatar_url() {
    return `http://localhost:3333/events/${this.id}`;
  }

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export default UserEvent;
