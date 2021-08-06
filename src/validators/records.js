const recordSchema = require("./record");

const createSchema = () => {
  const schema = {};
  for (const key in recordSchema) {
    schema["data.*." + key] = recordSchema[key];
  }
  schema.data = {
    isArray: true
  };
  return schema;
};

const schema = createSchema();

module.exports = schema;
