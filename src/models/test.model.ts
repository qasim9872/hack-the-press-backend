import timestamps from "mongoose-timestamp"
import { plugin, prop, getModelForClass } from "@typegoose/typegoose"

import { IsString } from "class-validator"
import { JSONSchema } from "class-validator-jsonschema"
import { validationMetadatasToSchemas } from "class-validator-jsonschema"

@JSONSchema({
    description: "A Test Schema",
})
export class TestSchemaDTO {
    @IsString()
    @prop({ required: true })
    @JSONSchema({
        description: "Test name",
    })
    public name!: string
}

@plugin(timestamps)
@JSONSchema({
    description: "Test Response schema",
})
export class Test extends TestSchemaDTO {
    @IsString()
    public updatedAt!: Date

    @IsString()
    public createdAt!: Date
}

export const schemas = validationMetadatasToSchemas()
export const TestSchema = schemas.TestSchemaDTO
export const TestResponseSchema = schemas.Test

console.log(schemas)

export const TestModel = getModelForClass(Test)
