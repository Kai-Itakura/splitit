import { API_URL } from '@/app/(contents)/constants/api-url';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import openapiTS, { astToString } from 'openapi-typescript';
import { factory } from 'typescript';

const FormData = factory.createTypeReferenceNode(
  factory.createIdentifier('FormData'),
);

const generateTypes = async () => {
  const ast = await openapiTS(`${API_URL}/api-json`, {
    transform(schemaObject) {
      if (schemaObject.format === 'binary') {
        return FormData;
      }
    },
  });

  const contents = astToString(ast);

  writeFileSync(path.resolve(__dirname, './schema.d.ts'), contents);
};

generateTypes();
