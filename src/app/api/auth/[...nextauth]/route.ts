import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const res = await fetch('http://localhost:3001/auth/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        // If no error and we have user data, return it
        if (res.ok && data.metadata) {
          return {
            id: data.metadata.user.id,
            name: data.metadata.user.name,
            email: data.metadata.user.email,
            role: data.metadata.user.role,
            accessToken: data.metadata.accessToken,
            ...data.metadata.user // Includes other user details
          };
        }
        // Return null if user data could not be retrieved
        return null;
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60 // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async jwt({ token, user }) {
      const cookieStore = await cookies();

      if (user) {
        token.id = user.id; // Include only the required fields
        token.name = user.name;
        token.accessToken = user.accessToken;
        cookieStore.set('jwt', user.accessToken);
        token.role = user.role.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token as any;
      session.expires = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000); // 1 days
      return session;
    }
  },
  pages: {
    signIn: '/auth/signIn'
  }
});

export { handler as GET, handler as POST };
