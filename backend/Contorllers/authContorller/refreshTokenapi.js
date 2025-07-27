 const refreshTokenapi = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(401);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const newAccessToken = generateAccessToken({ _id: user.id });
    
    res.json({ accessToken: newAccessToken });
  });
};
module.exports = refreshTokenapi;
