import { Request, Response, NextFunction } from "express";
import z from "zod";

import uploadConfig from "@/configs/upload";

class UploadsController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const fileSchema = z
        .object({
          filename: z.string().min(1, "This file is required."),
          mimetype: z
            .string()
            .refine(
              (type) => uploadConfig.ACCEPTED_IMAGE_TYPES.includes(type),
              `Invalid file format. Allowed formats: ${uploadConfig.ACCEPTED_IMAGE_TYPES}`
            ),
          size: z
            .number()
            .positive()
            .refine(
              (size) => uploadConfig.MAX_FILE_SIZE,
              `The file exceeds the maximum size of ${uploadConfig.MAX_SIZE}MB`
            ),
        })
        .passthrough();

      const { file } = fileSchema.parse(req.file);

      res.json({ message: "Ok" });
    } catch (error) {
      throw error;
    }
    res.json({ file: req.file });
  }
}

export { UploadsController };
