declare type PackageAFn = () => string;
export declare const packageA: PackageAFn;
declare type TestType = string | number;
declare type ComplexTestType = {
    path: TestType;
};
export declare type PathToProperty = TestType | ComplexTestType;
export {};
