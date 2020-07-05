import { validationMetadatasToSchemas } from "class-validator-jsonschema"

import "./user.schema"

export const schemas = validationMetadatasToSchemas()

export const UserSchema = schemas.UserSchema

export default schemas
