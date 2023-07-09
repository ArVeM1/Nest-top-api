import {Inject, Injectable} from '@nestjs/common';
import {ReviewModel} from "./review.model";
import {ModelType} from "@typegoose/typegoose/lib/types";
import {CreateReviewDto} from "./dto/create-review.dto";
import {InjectModel} from "nestjs-typegoose";

class Leak {}

const leaks = [];

@Injectable()
export class ReviewService {
    constructor(@InjectModel(ReviewModel) private readonly reviewModel: ModelType<ReviewModel>) {
    }

    async create(dto: CreateReviewDto): Promise<ReviewModel> {
        return this.reviewModel.create(dto);
    }

    async delete(id: string): Promise<DocumentType> | null {
        return this.reviewModel.findByIdAndDelete(id);
    }

    async findByProductId(productId: string): Promise<ReviewModel[]> {
        return this.reviewModel.find({productId: productId}).exec();
    }

    async deleteByProductId(productId: string) {
        leaks.push(new Leak());
        return this.reviewModel.deleteMany({productId: productId}).exec();
    }
}
