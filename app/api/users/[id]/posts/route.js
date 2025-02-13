import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator');
        
        return new Response(JSON.stringify({ success: true, data: prompts }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error("Error fetching prompts:", error);
        return new Response(JSON.stringify({ success: false, message: "Failed to fetch prompts" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};
