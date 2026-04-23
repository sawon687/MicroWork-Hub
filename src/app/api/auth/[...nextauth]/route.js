import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connect from "../../../../lib/dbconnect";
import bcrypt from "bcryptjs";
export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
      
          const userColl = await connect("userCOllection");
          const user = await userColl.findOne({ email: credentials.email });

          if (!user) return new Error("Invalid email or password");
          const isMatch = await bcrypt.compare(
            credentials.password,
            user.password,
          );
          if (!isMatch) {
            throw new Error("Invalid email or password");
          }

          return {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            coin: user.coin,
            photo: user.photo,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),

         GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
 async jwt({ token, user, account }) {
   if(user)
   {     
  
      token.user=user
      token.role=user?.role
   }
  

  return token;
},
  async session({ session, token}) {
        if(token)
        {
             session.user=token.user
        
        }
          
    return session;
  },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/new-user",
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
