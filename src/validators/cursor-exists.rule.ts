import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EntityNotFoundError, getConnection } from 'typeorm';

export function CursorExists(
  entityClass: any,
  field = 'id',
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'CursorExists',
      constraints: [entityClass, field],
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: ExistsRule,
    });
  };
}

@ValidatorConstraint({ name: 'CursorExists', async: true })
export class ExistsRule implements ValidatorConstraintInterface {
  async validate(value: string, args: ValidationArguments) {
    if (!value) {
      return false;
    }
    try {
      const [entityClass, field] = args.constraints;
      const conn = getConnection('default');
      const repository = conn.getRepository(entityClass);
      const parsedValue = Buffer.from(value, 'base64').toString('ascii');

      const result = await repository.findOne({
        where: {
          [field]: parsedValue,
        },
      });
      if (!result) {
        throw new EntityNotFoundError(entityClass, value);
      }
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
  defaultMessage() {
    return `cursor not found`;
  }
}
