export const signedGoogle = async (token) => {
  const res = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`)
  return await res.json()
}
