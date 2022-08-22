import mongoose from "mongoose";

const heroSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [
            true,
            "How can a hero exist without a name that strikes fear into the hearts of the bad guys?",
        ],
        unique: true,
    },
    real_name: {
        type: String,
        required: [
            true,
            "Human or otherwise, it's gotta have an actual name, right?",
        ],
    },
    gender: { type: String, default: "Unknown/Irrelevant" },
    base_of_operation: { type: String, default: "Unknown/Irrelevant" },
    images: [String],
    origins: {
        creators: {
            type: Array,
        },
        first_appearance: {
            type: Date,
        },
        media_type: { type: String, default: "Unknown" },
        backstory: { type: String, trim: true, default: "Unknown" },
    },
});

const Hero = mongoose.model("Heroes", heroSchema);

export default Hero;
