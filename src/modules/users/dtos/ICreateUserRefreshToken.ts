interface ICreateUserRefreshToken {
  refresh_token: string;

  user_id: string;

  date_expiration: Date;
}

export default ICreateUserRefreshToken;
