import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import connect from '../../../../lib/dbconnect';
 const withdrawColl = connect('withdrawColl');
 const userColl=connect('userCOllection')
// path: /api/admin/dashboard-combined/route.js
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get('search') || '';
        const session = await getServerSession(authOptions);

        if (!session || session?.user?.role !== 'Admin') {
            return NextResponse.json(
                { message: 'Unauthorized Access', success: false }, 
                { status: 403 }
            );
        }

        const searchQuery = search 
            ? { worker_email: { $regex: search, $options: "i" } } 
            : {};

        const [
            pendingWithdrawals,
            totalWorkers,
            totalBuyers,
            totalCoinsData,
            approvedWithdrawalsStats
        ] = await Promise.all([
            withdrawColl.find({ status: 'pending',...searchQuery }).toArray(),
            userColl.countDocuments({ role: 'Worker' }),
            userColl.countDocuments({ role: 'Buyer' }),
            userColl.aggregate([
                { $group: { _id: null, total: { $sum: "$coin" } } }
            ]).toArray(),
            withdrawColl.aggregate([
                { $match: { status: 'approved' } },
                { $group: { _id: null, totalAmount: { $sum: "$withdrawal_amount" } } }
            ]).toArray()
        ]);

        const result = {
            stats: {
                totalWorkers,
                totalBuyers,
                totalUsers: totalWorkers + totalBuyers,
                totalCoins: totalCoinsData[0]?.total || 0,
                totalPayments: approvedWithdrawalsStats[0]?.totalAmount || 0
            },
            withdrawRequests: pendingWithdrawals
        };

        return NextResponse.json({ 
            success: true, 
            message: "Data fetched successfully",
            data: result
        });

    } catch (error) {
        console.error("Dashboard API Error:", error);
        return NextResponse.json({ 
            success: false, 
            message: error.message || "Internal Server Error" 
        }, { status: 500 });
    }
}