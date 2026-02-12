import mongoose from "mongoose";

const Status = {
    PENDING: "pending",
    COMPLETED: "completed",
};

const options = {
    collection: "todos",
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
};

const todoSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
            index: true,
        },
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        description: { type: String, trim: true },
        status: {
            type: String,
            enum: Object.values(Status),
            default: Status.PENDING,
        },
    },
    options
);

const todoModel = mongoose.model("todos", todoSchema);
export { todoModel, Status };