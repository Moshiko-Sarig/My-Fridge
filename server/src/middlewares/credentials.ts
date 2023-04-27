import Joi, { Schema } from 'joi';

class Credentials {
  email: string;
  password: string;

  constructor(credentials: { email: string; password: string }) {
    this.email = credentials.email;
    this.password = credentials.password;
  }

  private static validationSchema: Schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .min(4)
      .max(90)
      .messages({
        'string.email': 'Email must be a valid email address.',
        'string.empty': 'Email is required.',
        'string.min': 'Email must be at least 4 characters long.',
        'string.max': 'Email must be no longer than 90 characters.',
      }),
    password: Joi.string()
      .required()
      .min(3)
      .max(225)
      .messages({
        'string.empty': 'Password is required.',
        'string.min': 'Password must be at least 3 characters long.',
        'string.max': 'Password must be no longer than 225 characters.',
      }),
  });

  validate(): string[] | null {
    const result = Credentials.validationSchema.validate(this, { abortEarly: false });
    return result.error ? result.error.details.map((err) => err.message) : null;
  }
}

export = Credentials;
