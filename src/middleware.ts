import { clerkMiddleware, createRouteMatcher} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isStudentRoute = createRouteMatcher(["/user/(.*)"]);
const isTeacherRoute = createRouteMatcher(["/teacher/(.*)"]);




// export default clerkMiddleware(async (auth, req) => {
//   const { sessionClaims } = await auth();
//   const userRole = 
//     (sessionClaims?.metadata as { userType: "student" | "teacher" })
//       ?.userType || "student";

//   if (isStudentRoute(req)) {
//     if (userRole !== "student") {
//       const url = new URL("/teacher/courses", req.url);
//       return NextResponse.redirect(url); // only if teacher route is safe for teacher
//     }
//   }

//   if (isTeacherRoute(req)) {
//     if (userRole !== "teacher") {
//       const url = new URL("/user/courses", req.url); // or /unauthorized
//       return NextResponse.redirect(url);
//     }
//   }

// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ]
// }


export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth();
  const userRole = sessionClaims?.publicMetadata?.userType;

  if (!userRole) {
    console.warn("Missing user role, skipping redirect");
    return NextResponse.next();
  }

  const path = req.nextUrl.pathname;
  console.log(`Checking access for ${path} as ${userRole}`);

  if (isStudentRoute(req) && userRole !== "student") {
    return NextResponse.redirect(new URL("/teacher/courses", req.url));
  }

  if (isTeacherRoute(req) && userRole !== "teacher") {
    return NextResponse.redirect(new URL("/user/courses", req.url));
  }

  return NextResponse.next();
});