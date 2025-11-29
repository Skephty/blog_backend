import { Service } from "https://deno.land/x/twet@v0.0.1/mod.ts";
import { connection } from "../config/database/db.ts";
import { ulid } from "@std/ulid";
import { Post } from "../models/post.model.ts";
import { queryAsync } from "../utils/mysql-async.ts";

@Service("PostService")
export class PostService {

    async create(post: { title: string; content: string; image_url?: string }) {
        try {
            const id = ulid();
            await queryAsync(connection,
                "INSERT INTO posts (id, title, content, image_url) VALUES (?, ?, ?, ?)",
                [id, post.title, post.content, post.image_url || null]
            );
            return { success: true, id };
        } catch (error) {
            console.error("Error creating post:", error);
            return { success: false, error: error.message };
        }
    }

    async getAll(): Promise<{ success: boolean; data?: Post[]; error?: string }> {
        try {
            const results = await queryAsync(connection, "SELECT * FROM posts");

            const data = results.map((r: any) => ({
                id: r.id,
                title: r.title,
                content: r.content,
                image_url: r.image_url,
                created_at: r.created_at,
            }));

            return { success: true, data };
        } catch (error) {
            console.error("Error fetching posts:", error);
            return { success: false, error: error.message };
        }
    }

    async getById(id: string): Promise<{ success: boolean; data?: Post; error?: string }> {
        try {
            const results = await queryAsync(connection, "SELECT * FROM posts WHERE id = ?", [id]);
            return { success: true, data: results[0] };
        } catch (error) {
            console.error("Error fetching post:", error);
            return { success: false, error: error.message };
        }
    }

    async update(id: string, post: { title?: string; content?: string; image_url?: string }) {
        try {
            await queryAsync(connection,
                `UPDATE posts 
                SET title = COALESCE(?, title),
                    content = COALESCE(?, content),
                    image_url = COALESCE(?, image_url),
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = ?`,
                [post.title, post.content, post.image_url, id]
            );
            return { success: true };
        } catch (error) {
            console.error("Error updating post:", error);
            return { success: false, error: error.message };
        }
    }

    async delete(id: string) {
        try {
            await queryAsync(connection, "DELETE FROM posts WHERE id = ?", [id]);
            return { success: true };
        } catch (error) {
            console.error("Error deleting post:", error);
            return { success: false, error: error.message };
        }
    }


}