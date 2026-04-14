import { NextResponse } from 'next/server';
import connect from '@/lib/dbconnect';
import { getServerSession } from "next-auth";
import { authOptions } from '../auth/[...nextauth]/route';

 const withdrawColl =connect('withdrawColl');
export async function GET(req) {
    try {
       
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized access" }, 
                { status: 401 }
            );
        }

        const userEmail = session.user.email;
       

     
        const result = await withdrawColl
            .find({ worker_email: userEmail })
            .sort({ withdraw_date: -1 }) 
            .toArray();

        return NextResponse.json({ 
            success: true, 
            data: result 
        });

    } catch (error) {
        console.error("GET My Withdrawals Error:", error);
        return NextResponse.json({ 
            success: false, 
            message: error.message || "Internal Server Error" 
        }, { status: 500 });
    }
}