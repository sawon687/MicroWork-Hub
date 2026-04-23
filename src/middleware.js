import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

// এখানে path গুলো সঠিক ভাবে লিখুন (সামনে / দিতে ভুলবেন না)
const adminPaths = ['/dashboard/manage-users', '/dashboard/task-overview', '/dashboard/payment-history']
const buyerPaths = ['/dashboard/add-task', '/dashboard/purchase-coin', '/dashboard/my-task']
const workerPaths = ['/dashboard/tasks', '/dashboard/withdraw', '/dashboard/my-withdrawals', '/dashboard/my-submission']

export async function middleware(req) {
  const path = req.nextUrl.pathname;
  
  
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET 
  });
 console.log('token is',token)
//   This login not found and then its is
  if (!token) {
    return NextResponse.redirect(new URL("/Login", req.url));
  }

  const role = token?.role;

  // ৩. Admin 
  if (adminPaths.includes(path) && role !== 'Admin') {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // ৪. Worker 
  if (workerPaths.includes(path) && role !== 'Worker') {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // ৫. Buyer 
  if (buyerPaths.includes(path) && role !== 'Buyer') {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};