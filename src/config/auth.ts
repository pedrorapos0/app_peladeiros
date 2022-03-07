export default {
  secret_token: `${process.env.SECRET_TOKEN}`,
  expered_token: '15m',
  expired_token_in_minutes: 15,
  secret_refreshToken: `${process.env.SECRTE_REFRESH_TOKEN}`,
  expered_refreshToken: '30d',
  expired_refresh_token_in_days: 30,
};
