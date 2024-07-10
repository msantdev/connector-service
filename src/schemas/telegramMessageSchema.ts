
import Ajv, { JSONSchemaType } from 'ajv';

const telegramMessageSchema: JSONSchemaType<{
  message: {
    from: {
      id: string;
    };
  };
}> = {
  type: 'object',
  properties: {
    message: {
      type: 'object',
      properties: {
        from: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
      },
      required: ['from'],
    },
  },
  required: ['message'],
};

const ajv = new Ajv();
const validate = ajv.compile(telegramMessageSchema);

export { validate };
