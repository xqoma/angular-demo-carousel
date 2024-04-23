import {MockMethod} from './mock-method.type';

export interface Mock<T = unknown> {
  url: string;
  method: MockMethod;
  delay?: number;
  body: T;
}
