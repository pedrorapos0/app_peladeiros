interface ICreateUserEventDTO {
  title: string;

  responsible_id: string;

  start_date: Date;

  end_date: Date;

  minimum_number_guests: number;

  maximum_number_guests?: number;
}

export default ICreateUserEventDTO;
