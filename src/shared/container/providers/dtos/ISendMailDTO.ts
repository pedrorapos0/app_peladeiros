interface ISendMailDTO {
  to: string;
  subject: string;
  from?: string;
  text: string;
  templateData?: string;
}

export default ISendMailDTO;
