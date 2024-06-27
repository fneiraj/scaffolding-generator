export const parseArray = (
  value: string,
  allowedValues?: string[],
): string[] => {
  if (!value) {
    return undefined;
  }

  const parsed = value.split(',').map((lib) => lib.trim());

  if (!allowedValues) {
    return parsed;
  }

  const invalidValues = parsed.filter((lib) => !allowedValues.includes(lib));

  if (invalidValues.length) {
    console.info(
      'Invalid value/s:',
      invalidValues.join(', ').trim().concat(','),
      'allowed values:',
      allowedValues.join(', '),
    );
    process.exit(1);
  }

  return parsed;
};
