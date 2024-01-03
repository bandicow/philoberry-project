import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith("/admin")) {
        return token?.role === "admin";
      }
      return !!token; // !!는 값을 boolean으로 바꿈
    },
  },
});

export const config = { matcher: ["/admin:path*", "/profile"] };
