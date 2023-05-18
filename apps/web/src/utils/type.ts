export type InferArgs<T> = T extends (...t: [...infer Arg]) => any ? Arg : never
export type InferReturn<T> = T extends (...t: [...infer Arg]) => infer Res ? Res : never
