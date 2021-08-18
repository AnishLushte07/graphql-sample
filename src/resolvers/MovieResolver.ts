import { Movie } from "../entity/Movie";
import { Mutation, Resolver, Arg, Field, InputType, Int, Query } from "type-graphql";

@InputType()
class MovieInput {
    @Field()
    title: string;

    @Field(() => Int)
    minutes: number
}

@Resolver()
export class MovieResolver {
    @Mutation(() => Movie)
    async createMovie(@Arg("options", () => MovieInput) options: MovieInput) {
        const movie = await Movie.create(options).save();
        return movie;
    }

    @Query(() => [Movie])
    async movies() {
        return await Movie.find();
    }

    @Mutation(() => Boolean)
    async deleteMovie(@Arg("id", () => Int) id: number) {
        await Movie.delete({ id });
        return true;
    }
}