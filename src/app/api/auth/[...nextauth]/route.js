import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { },
        password: { }
      },
      async authorize(credentials) {
        // এখানে তুমি user validate করবে
        // উদাহরণস্বরূপ:
        const user = { id: 1, name: "Demo", email: credentials.email }
        if (user) {
          return user
        } else {
          return null
        }
      }
    })
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session({ session, user, token }) {
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token
    }
  }
}

export { handler as GET, handler as POST }