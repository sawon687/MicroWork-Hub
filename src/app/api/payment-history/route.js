import { NextResponse } from 'next/server';
import connect from '@/lib/dbconnect';
import { getServerSession } from "next-auth";
import { authOptions } from '../auth/[...nextauth]/route';

const withdrawColl = connect('withdrawColl');
  
export async function GET(req) {
    try {
     
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'Admin') {
            return NextResponse.json(
                { success: false, message: "Access Forbidden: Admins only" }, 
                { status: 403 }
            );
        }

        

        
    
        const result = await withdrawColl
            .find({ status: 'approved' }) 
            .sort({ withdraw_date: -1 }) 
            .toArray();

        return NextResponse.json({ 
            success: true, 
            data: result 
        });

    } catch (error) {
        console.error("Payment Logs Error:", error);
        return NextResponse.json({ 
            success: false, 
            message: error.message || "Internal Server Error" 
        }, { status: 500 });
    }
}