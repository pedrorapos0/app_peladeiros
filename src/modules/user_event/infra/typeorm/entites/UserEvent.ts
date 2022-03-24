import { v4 as uuidV4 } from 'uuid';

import User from '@modules/users/infra/typeorm/entites/User';

class UserEvent {
  id: string;

  title: string;

  responsible_id: string;

  responsible: User;

  guests: User[];

  start_date: Date;

  end_date: Date;

  minimum_number_guests: number;

  maximum_number_guests?: number;

  created_at: Date;

  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export default UserEvent;
