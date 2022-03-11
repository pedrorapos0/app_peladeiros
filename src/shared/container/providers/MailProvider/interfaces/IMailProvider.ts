import ISendMailDTO from '@shared/container/providers/dtos/ISendMailDTO';

interface IMailProvider {
  sendMailProvider(data: ISendMailDTO): Promise<void>;
}

export default IMailProvider;
