import IHashProvider from '../interfaces/IHashProvider';

class HashProviderFake implements IHashProvider {
  public async hash(payload: string): Promise<string> {
    return payload;
  }
  public async compare(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed ? true : false;
  }
}

export default HashProviderFake;
