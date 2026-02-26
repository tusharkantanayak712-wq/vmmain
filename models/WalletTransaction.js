import mongoose from "mongoose";

const WalletTransactionSchema = new mongoose.Schema(
    {
        userId: {
            type: String, // User.userId
            required: true,
        },
        userEmail: String,
        amount: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            enum: ["credit", "debit"],
            required: true,
        },
        category: {
            type: String,
            enum: ["topup", "order", "manual", "refund"],
            default: "manual",
        },
        description: String,
        balanceBefore: Number,
        balanceAfter: Number,
        executedBy: {
            type: String, // admin userId or "system"
            default: "system",
        },
    },
    { timestamps: true }
);

export default mongoose.models.WalletTransaction ||
    mongoose.model("WalletTransaction", WalletTransactionSchema);
