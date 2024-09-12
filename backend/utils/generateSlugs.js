const mongoose = require("mongoose");
const slugify = require("slugify");
const Blog = require("../models/blogModel")
mongoose.connect(
  "mongodb+srv://duongtrungkiendev:duongtrungkiendev@cluster0.jlkes.mongodb.net/tech_blog?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const createSlugForOldPosts = async () => {
  try {
    const blogs = await Blog.find({ slug: { $exists: false } }); // Tìm các bài viết chưa có slug

    for (let blog of blogs) {
      blog.slug = slugify(blog.title, { lower: true, strict: true });
      await blog.save();
      console.log(`Slug created for blog: ${blog.title}`);
    }

    console.log("Slug generation for old posts completed.");
  } catch (error) {
    console.error("Error generating slugs:", error);
  } finally {
    mongoose.connection.close();
  }
};

createSlugForOldPosts();
