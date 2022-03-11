import MailProvider from '@shared/container/providers/MailProvider/interfaces/IMailProvider';
import ISendMailDTO from '../../dtos/ISendMailDTO';

class MailProviderFake implements MailProvider {
  private messages: ISendMailDTO[] = [];
  public async sendMailProvider(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}

export default MailProviderFake;
