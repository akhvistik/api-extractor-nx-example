type PackageAFn = () => string;

export const packageA: PackageAFn = () => {
  return 'is-packageA';
};

type TestType = string | number;

type ComplexTestType = {
  path: TestType;
};

export type PathToProperty = TestType | ComplexTestType;
