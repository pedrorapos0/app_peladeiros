import { v4 as uuidV4 } from 'uuid';

class User {
  id: string;

  name: string;

  email: string;

  password: string;

  birth_date: Date;

  constructor() {
    if (this.id === undefined) {
      this.id = uuidV4();
    }
  }
}

export default User;
