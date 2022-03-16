import { compare, hash } from 'bcryptjs';
import IHashProvider from '@shared/container/providers/HashProvider/interfaces/IHashProvider';

class BcryptjsHashProvider implements IHashProvider {
  public async hash(payload: string): Promise<string> {
    const newHash = await hash(payload, 8);
    return newHash;
  }

  public async compare(payload: string, hashed: string): Promise<boolean> {
    return await compare(payload, hashed);
  }
}

export default BcryptjsHashProvider;
