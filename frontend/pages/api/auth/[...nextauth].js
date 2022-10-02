import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
    {
      id: "orcid",
      name: "ORCID",
      type: "oauth",
      version: "0.1",
      wellKnown: "https://orcid.org/oauth/authorize",
      clientId: process.env.ORCID_ID,
      clientSecret: process.env.ORCID_SECRET,
      // wellKnown: "https://sandbox.orcid.org/oauth/authorize",
      // token: process.env.ORCID_TOKEN_URL,
      // userinfo: {
      //   request: () => {},
      // },
      authorization: {
        url: process.env.ORCID_AUTH_URL,
        params: { scope: "openid" }
      },
      idToken: true,
      profile(profile) {
        console.log(`profile: ${JSON.stringify(profile)}`)
        return {
          id: profile.orcid,
        }
      }
    }
  ],
}

export default NextAuth(authOptions)