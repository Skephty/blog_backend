import { Get, Post, Delete, Put, Inject, Body, Param } from "https://deno.land/x/twet@v0.0.1/mod.ts";
import { PostService } from "../services/post.service.ts";
import { Post as PostInterface } from "../models/post.model.ts";

export class PostController {
    constructor(@Inject("PostService") private postService: PostService) { }

    @Get("/api/v1/post/")
    async getAll() {
        const result = await this.postService.getAll();
        return result;
    }

    @Post("/api/v1/post/")
    async create(
        @Body() body: { title: string; content: string; image_url?: string }
    ) {
        const result = await this.postService.create(body);
        return result;
    }

    @Get("/api/v1/post/:id")
    async getById(@Param("id") id: string) {
        return this.postService.getById(id);
    }


    @Put("/api/v1/post/:id")
    async update(
        @Param("id") id: string,
        @Body() body: { title?: string; content?: string; image_url?: string }
    ) {
        return this.postService.update(id, body);
    }

    @Delete("/api/v1/post/:id")
    async delete(@Param("id") id: string) {
        return this.postService.delete(id);
    }

}