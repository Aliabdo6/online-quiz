import "./globals.css";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SessionProvider from "./components/SessionProvider";

export const metadata = {
  title: "Online Quiz Service",
  description: "Create and take quizzes online",
};

export default async function RootLayout({
  children,
}) {
  const session = await getServerSession(
    authOptions
  );

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body>
          <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
              <a
                href="/"
                className="text-xl font-bold"
              >
                Quiz Service
              </a>
              <div className="space-x-4">
                <a
                  href="/quizzes"
                  className="hover:text-gray-300"
                >
                  Quizzes
                </a>
                <a
                  href="/quizzes/create"
                  className="hover:text-gray-300"
                >
                  Create Quiz
                </a>
                <a
                  href="/leaderboard"
                  className="hover:text-gray-300"
                >
                  Leaderboard
                </a>
                {session ? (
                  <a
                    href="/api/auth/signout"
                    className="hover:text-gray-300"
                  >
                    Sign Out
                  </a>
                ) : (
                  <>
                    <a
                      href="/auth/signin"
                      className="hover:text-gray-300"
                    >
                      Sign In
                    </a>
                    <a
                      href="/auth/register"
                      className="hover:text-gray-300"
                    >
                      Register
                    </a>
                  </>
                )}
              </div>
            </div>
          </nav>
          <main className="container mx-auto p-4">
            {children}
          </main>
        </body>
      </SessionProvider>
    </html>
  );
}
