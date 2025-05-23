
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>
/**
 * Model Participant
 * 
 */
export type Participant = $Result.DefaultSelection<Prisma.$ParticipantPayload>
/**
 * Model Ruleset
 * 
 */
export type Ruleset = $Result.DefaultSelection<Prisma.$RulesetPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Projects
 * const projects = await prisma.project.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Projects
   * const projects = await prisma.project.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.participant`: Exposes CRUD operations for the **Participant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Participants
    * const participants = await prisma.participant.findMany()
    * ```
    */
  get participant(): Prisma.ParticipantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ruleset`: Exposes CRUD operations for the **Ruleset** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rulesets
    * const rulesets = await prisma.ruleset.findMany()
    * ```
    */
  get ruleset(): Prisma.RulesetDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Project: 'Project',
    Participant: 'Participant',
    Ruleset: 'Ruleset'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "project" | "participant" | "ruleset"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      Participant: {
        payload: Prisma.$ParticipantPayload<ExtArgs>
        fields: Prisma.ParticipantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ParticipantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ParticipantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantPayload>
          }
          findFirst: {
            args: Prisma.ParticipantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ParticipantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantPayload>
          }
          findMany: {
            args: Prisma.ParticipantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantPayload>[]
          }
          create: {
            args: Prisma.ParticipantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantPayload>
          }
          createMany: {
            args: Prisma.ParticipantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ParticipantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantPayload>[]
          }
          delete: {
            args: Prisma.ParticipantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantPayload>
          }
          update: {
            args: Prisma.ParticipantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantPayload>
          }
          deleteMany: {
            args: Prisma.ParticipantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ParticipantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ParticipantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantPayload>[]
          }
          upsert: {
            args: Prisma.ParticipantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParticipantPayload>
          }
          aggregate: {
            args: Prisma.ParticipantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateParticipant>
          }
          groupBy: {
            args: Prisma.ParticipantGroupByArgs<ExtArgs>
            result: $Utils.Optional<ParticipantGroupByOutputType>[]
          }
          count: {
            args: Prisma.ParticipantCountArgs<ExtArgs>
            result: $Utils.Optional<ParticipantCountAggregateOutputType> | number
          }
        }
      }
      Ruleset: {
        payload: Prisma.$RulesetPayload<ExtArgs>
        fields: Prisma.RulesetFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RulesetFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RulesetPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RulesetFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RulesetPayload>
          }
          findFirst: {
            args: Prisma.RulesetFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RulesetPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RulesetFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RulesetPayload>
          }
          findMany: {
            args: Prisma.RulesetFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RulesetPayload>[]
          }
          create: {
            args: Prisma.RulesetCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RulesetPayload>
          }
          createMany: {
            args: Prisma.RulesetCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RulesetCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RulesetPayload>[]
          }
          delete: {
            args: Prisma.RulesetDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RulesetPayload>
          }
          update: {
            args: Prisma.RulesetUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RulesetPayload>
          }
          deleteMany: {
            args: Prisma.RulesetDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RulesetUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RulesetUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RulesetPayload>[]
          }
          upsert: {
            args: Prisma.RulesetUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RulesetPayload>
          }
          aggregate: {
            args: Prisma.RulesetAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRuleset>
          }
          groupBy: {
            args: Prisma.RulesetGroupByArgs<ExtArgs>
            result: $Utils.Optional<RulesetGroupByOutputType>[]
          }
          count: {
            args: Prisma.RulesetCountArgs<ExtArgs>
            result: $Utils.Optional<RulesetCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    project?: ProjectOmit
    participant?: ParticipantOmit
    ruleset?: RulesetOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProjectCountOutputType
   */

  export type ProjectCountOutputType = {
    participants: number
    rulesets: number
  }

  export type ProjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participants?: boolean | ProjectCountOutputTypeCountParticipantsArgs
    rulesets?: boolean | ProjectCountOutputTypeCountRulesetsArgs
  }

  // Custom InputTypes
  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountParticipantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParticipantWhereInput
  }

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeCountRulesetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RulesetWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    chainId: number | null
    createdAt: number | null
    projectId: number | null
    paymentsCount: number | null
    balance: number | null
    erc20Supply: number | null
    cashoutA: number | null
    cashoutB: number | null
    currentRulesetId: number | null
    contributorsCount: number | null
    redeemCount: number | null
    redeemVolume: number | null
    pendingReservedTokens: number | null
  }

  export type ProjectSumAggregateOutputType = {
    chainId: number | null
    createdAt: number | null
    projectId: number | null
    paymentsCount: number | null
    balance: bigint | null
    erc20Supply: bigint | null
    cashoutA: bigint | null
    cashoutB: bigint | null
    currentRulesetId: bigint | null
    contributorsCount: number | null
    redeemCount: number | null
    redeemVolume: bigint | null
    pendingReservedTokens: bigint | null
  }

  export type ProjectMinAggregateOutputType = {
    chainId: number | null
    createdAt: number | null
    projectId: number | null
    paymentsCount: number | null
    balance: bigint | null
    isRevnet: boolean | null
    deployer: string | null
    owner: string | null
    erc20: string | null
    erc20Supply: bigint | null
    erc20Name: string | null
    erc20Symbol: string | null
    cashoutA: bigint | null
    cashoutB: bigint | null
    currentRulesetId: bigint | null
    contributorsCount: number | null
    redeemCount: number | null
    redeemVolume: bigint | null
    pendingReservedTokens: bigint | null
    metadataUri: string | null
    name: string | null
    infoUri: string | null
    logoUri: string | null
    coverImageUri: string | null
    twitter: string | null
    discord: string | null
    telegram: string | null
    domain: string | null
    description: string | null
    projectTagline: string | null
  }

  export type ProjectMaxAggregateOutputType = {
    chainId: number | null
    createdAt: number | null
    projectId: number | null
    paymentsCount: number | null
    balance: bigint | null
    isRevnet: boolean | null
    deployer: string | null
    owner: string | null
    erc20: string | null
    erc20Supply: bigint | null
    erc20Name: string | null
    erc20Symbol: string | null
    cashoutA: bigint | null
    cashoutB: bigint | null
    currentRulesetId: bigint | null
    contributorsCount: number | null
    redeemCount: number | null
    redeemVolume: bigint | null
    pendingReservedTokens: bigint | null
    metadataUri: string | null
    name: string | null
    infoUri: string | null
    logoUri: string | null
    coverImageUri: string | null
    twitter: string | null
    discord: string | null
    telegram: string | null
    domain: string | null
    description: string | null
    projectTagline: string | null
  }

  export type ProjectCountAggregateOutputType = {
    chainId: number
    createdAt: number
    projectId: number
    paymentsCount: number
    balance: number
    isRevnet: number
    deployer: number
    owner: number
    erc20: number
    erc20Supply: number
    erc20Name: number
    erc20Symbol: number
    cashoutA: number
    cashoutB: number
    currentRulesetId: number
    contributorsCount: number
    redeemCount: number
    redeemVolume: number
    pendingReservedTokens: number
    metadataUri: number
    metadata: number
    name: number
    infoUri: number
    logoUri: number
    coverImageUri: number
    twitter: number
    discord: number
    telegram: number
    tokens: number
    domain: number
    description: number
    tags: number
    projectTagline: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    chainId?: true
    createdAt?: true
    projectId?: true
    paymentsCount?: true
    balance?: true
    erc20Supply?: true
    cashoutA?: true
    cashoutB?: true
    currentRulesetId?: true
    contributorsCount?: true
    redeemCount?: true
    redeemVolume?: true
    pendingReservedTokens?: true
  }

  export type ProjectSumAggregateInputType = {
    chainId?: true
    createdAt?: true
    projectId?: true
    paymentsCount?: true
    balance?: true
    erc20Supply?: true
    cashoutA?: true
    cashoutB?: true
    currentRulesetId?: true
    contributorsCount?: true
    redeemCount?: true
    redeemVolume?: true
    pendingReservedTokens?: true
  }

  export type ProjectMinAggregateInputType = {
    chainId?: true
    createdAt?: true
    projectId?: true
    paymentsCount?: true
    balance?: true
    isRevnet?: true
    deployer?: true
    owner?: true
    erc20?: true
    erc20Supply?: true
    erc20Name?: true
    erc20Symbol?: true
    cashoutA?: true
    cashoutB?: true
    currentRulesetId?: true
    contributorsCount?: true
    redeemCount?: true
    redeemVolume?: true
    pendingReservedTokens?: true
    metadataUri?: true
    name?: true
    infoUri?: true
    logoUri?: true
    coverImageUri?: true
    twitter?: true
    discord?: true
    telegram?: true
    domain?: true
    description?: true
    projectTagline?: true
  }

  export type ProjectMaxAggregateInputType = {
    chainId?: true
    createdAt?: true
    projectId?: true
    paymentsCount?: true
    balance?: true
    isRevnet?: true
    deployer?: true
    owner?: true
    erc20?: true
    erc20Supply?: true
    erc20Name?: true
    erc20Symbol?: true
    cashoutA?: true
    cashoutB?: true
    currentRulesetId?: true
    contributorsCount?: true
    redeemCount?: true
    redeemVolume?: true
    pendingReservedTokens?: true
    metadataUri?: true
    name?: true
    infoUri?: true
    logoUri?: true
    coverImageUri?: true
    twitter?: true
    discord?: true
    telegram?: true
    domain?: true
    description?: true
    projectTagline?: true
  }

  export type ProjectCountAggregateInputType = {
    chainId?: true
    createdAt?: true
    projectId?: true
    paymentsCount?: true
    balance?: true
    isRevnet?: true
    deployer?: true
    owner?: true
    erc20?: true
    erc20Supply?: true
    erc20Name?: true
    erc20Symbol?: true
    cashoutA?: true
    cashoutB?: true
    currentRulesetId?: true
    contributorsCount?: true
    redeemCount?: true
    redeemVolume?: true
    pendingReservedTokens?: true
    metadataUri?: true
    metadata?: true
    name?: true
    infoUri?: true
    logoUri?: true
    coverImageUri?: true
    twitter?: true
    discord?: true
    telegram?: true
    tokens?: true
    domain?: true
    description?: true
    tags?: true
    projectTagline?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    chainId: number
    createdAt: number
    projectId: number
    paymentsCount: number
    balance: bigint
    isRevnet: boolean
    deployer: string
    owner: string
    erc20: string | null
    erc20Supply: bigint
    erc20Name: string | null
    erc20Symbol: string | null
    cashoutA: bigint
    cashoutB: bigint
    currentRulesetId: bigint
    contributorsCount: number
    redeemCount: number
    redeemVolume: bigint
    pendingReservedTokens: bigint
    metadataUri: string | null
    metadata: JsonValue | null
    name: string | null
    infoUri: string | null
    logoUri: string | null
    coverImageUri: string | null
    twitter: string | null
    discord: string | null
    telegram: string | null
    tokens: string[]
    domain: string | null
    description: string | null
    tags: string[]
    projectTagline: string | null
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chainId?: boolean
    createdAt?: boolean
    projectId?: boolean
    paymentsCount?: boolean
    balance?: boolean
    isRevnet?: boolean
    deployer?: boolean
    owner?: boolean
    erc20?: boolean
    erc20Supply?: boolean
    erc20Name?: boolean
    erc20Symbol?: boolean
    cashoutA?: boolean
    cashoutB?: boolean
    currentRulesetId?: boolean
    contributorsCount?: boolean
    redeemCount?: boolean
    redeemVolume?: boolean
    pendingReservedTokens?: boolean
    metadataUri?: boolean
    metadata?: boolean
    name?: boolean
    infoUri?: boolean
    logoUri?: boolean
    coverImageUri?: boolean
    twitter?: boolean
    discord?: boolean
    telegram?: boolean
    tokens?: boolean
    domain?: boolean
    description?: boolean
    tags?: boolean
    projectTagline?: boolean
    participants?: boolean | Project$participantsArgs<ExtArgs>
    rulesets?: boolean | Project$rulesetsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chainId?: boolean
    createdAt?: boolean
    projectId?: boolean
    paymentsCount?: boolean
    balance?: boolean
    isRevnet?: boolean
    deployer?: boolean
    owner?: boolean
    erc20?: boolean
    erc20Supply?: boolean
    erc20Name?: boolean
    erc20Symbol?: boolean
    cashoutA?: boolean
    cashoutB?: boolean
    currentRulesetId?: boolean
    contributorsCount?: boolean
    redeemCount?: boolean
    redeemVolume?: boolean
    pendingReservedTokens?: boolean
    metadataUri?: boolean
    metadata?: boolean
    name?: boolean
    infoUri?: boolean
    logoUri?: boolean
    coverImageUri?: boolean
    twitter?: boolean
    discord?: boolean
    telegram?: boolean
    tokens?: boolean
    domain?: boolean
    description?: boolean
    tags?: boolean
    projectTagline?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chainId?: boolean
    createdAt?: boolean
    projectId?: boolean
    paymentsCount?: boolean
    balance?: boolean
    isRevnet?: boolean
    deployer?: boolean
    owner?: boolean
    erc20?: boolean
    erc20Supply?: boolean
    erc20Name?: boolean
    erc20Symbol?: boolean
    cashoutA?: boolean
    cashoutB?: boolean
    currentRulesetId?: boolean
    contributorsCount?: boolean
    redeemCount?: boolean
    redeemVolume?: boolean
    pendingReservedTokens?: boolean
    metadataUri?: boolean
    metadata?: boolean
    name?: boolean
    infoUri?: boolean
    logoUri?: boolean
    coverImageUri?: boolean
    twitter?: boolean
    discord?: boolean
    telegram?: boolean
    tokens?: boolean
    domain?: boolean
    description?: boolean
    tags?: boolean
    projectTagline?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    chainId?: boolean
    createdAt?: boolean
    projectId?: boolean
    paymentsCount?: boolean
    balance?: boolean
    isRevnet?: boolean
    deployer?: boolean
    owner?: boolean
    erc20?: boolean
    erc20Supply?: boolean
    erc20Name?: boolean
    erc20Symbol?: boolean
    cashoutA?: boolean
    cashoutB?: boolean
    currentRulesetId?: boolean
    contributorsCount?: boolean
    redeemCount?: boolean
    redeemVolume?: boolean
    pendingReservedTokens?: boolean
    metadataUri?: boolean
    metadata?: boolean
    name?: boolean
    infoUri?: boolean
    logoUri?: boolean
    coverImageUri?: boolean
    twitter?: boolean
    discord?: boolean
    telegram?: boolean
    tokens?: boolean
    domain?: boolean
    description?: boolean
    tags?: boolean
    projectTagline?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"chainId" | "createdAt" | "projectId" | "paymentsCount" | "balance" | "isRevnet" | "deployer" | "owner" | "erc20" | "erc20Supply" | "erc20Name" | "erc20Symbol" | "cashoutA" | "cashoutB" | "currentRulesetId" | "contributorsCount" | "redeemCount" | "redeemVolume" | "pendingReservedTokens" | "metadataUri" | "metadata" | "name" | "infoUri" | "logoUri" | "coverImageUri" | "twitter" | "discord" | "telegram" | "tokens" | "domain" | "description" | "tags" | "projectTagline", ExtArgs["result"]["project"]>
  export type ProjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participants?: boolean | Project$participantsArgs<ExtArgs>
    rulesets?: boolean | Project$rulesetsArgs<ExtArgs>
    _count?: boolean | ProjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {
      participants: Prisma.$ParticipantPayload<ExtArgs>[]
      rulesets: Prisma.$RulesetPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      chainId: number
      createdAt: number
      projectId: number
      paymentsCount: number
      balance: bigint
      isRevnet: boolean
      deployer: string
      owner: string
      erc20: string | null
      erc20Supply: bigint
      erc20Name: string | null
      erc20Symbol: string | null
      cashoutA: bigint
      cashoutB: bigint
      currentRulesetId: bigint
      contributorsCount: number
      redeemCount: number
      redeemVolume: bigint
      pendingReservedTokens: bigint
      metadataUri: string | null
      metadata: Prisma.JsonValue | null
      name: string | null
      infoUri: string | null
      logoUri: string | null
      coverImageUri: string | null
      twitter: string | null
      discord: string | null
      telegram: string | null
      tokens: string[]
      domain: string | null
      description: string | null
      tags: string[]
      projectTagline: string | null
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `chainId`
     * const projectWithChainIdOnly = await prisma.project.findMany({ select: { chainId: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `chainId`
     * const projectWithChainIdOnly = await prisma.project.createManyAndReturn({
     *   select: { chainId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `chainId`
     * const projectWithChainIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { chainId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    participants<T extends Project$participantsArgs<ExtArgs> = {}>(args?: Subset<T, Project$participantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rulesets<T extends Project$rulesetsArgs<ExtArgs> = {}>(args?: Subset<T, Project$rulesetsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RulesetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly chainId: FieldRef<"Project", 'Int'>
    readonly createdAt: FieldRef<"Project", 'Int'>
    readonly projectId: FieldRef<"Project", 'Int'>
    readonly paymentsCount: FieldRef<"Project", 'Int'>
    readonly balance: FieldRef<"Project", 'BigInt'>
    readonly isRevnet: FieldRef<"Project", 'Boolean'>
    readonly deployer: FieldRef<"Project", 'String'>
    readonly owner: FieldRef<"Project", 'String'>
    readonly erc20: FieldRef<"Project", 'String'>
    readonly erc20Supply: FieldRef<"Project", 'BigInt'>
    readonly erc20Name: FieldRef<"Project", 'String'>
    readonly erc20Symbol: FieldRef<"Project", 'String'>
    readonly cashoutA: FieldRef<"Project", 'BigInt'>
    readonly cashoutB: FieldRef<"Project", 'BigInt'>
    readonly currentRulesetId: FieldRef<"Project", 'BigInt'>
    readonly contributorsCount: FieldRef<"Project", 'Int'>
    readonly redeemCount: FieldRef<"Project", 'Int'>
    readonly redeemVolume: FieldRef<"Project", 'BigInt'>
    readonly pendingReservedTokens: FieldRef<"Project", 'BigInt'>
    readonly metadataUri: FieldRef<"Project", 'String'>
    readonly metadata: FieldRef<"Project", 'Json'>
    readonly name: FieldRef<"Project", 'String'>
    readonly infoUri: FieldRef<"Project", 'String'>
    readonly logoUri: FieldRef<"Project", 'String'>
    readonly coverImageUri: FieldRef<"Project", 'String'>
    readonly twitter: FieldRef<"Project", 'String'>
    readonly discord: FieldRef<"Project", 'String'>
    readonly telegram: FieldRef<"Project", 'String'>
    readonly tokens: FieldRef<"Project", 'String[]'>
    readonly domain: FieldRef<"Project", 'String'>
    readonly description: FieldRef<"Project", 'String'>
    readonly tags: FieldRef<"Project", 'String[]'>
    readonly projectTagline: FieldRef<"Project", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project.participants
   */
  export type Project$participantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participant
     */
    select?: ParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participant
     */
    omit?: ParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantInclude<ExtArgs> | null
    where?: ParticipantWhereInput
    orderBy?: ParticipantOrderByWithRelationInput | ParticipantOrderByWithRelationInput[]
    cursor?: ParticipantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ParticipantScalarFieldEnum | ParticipantScalarFieldEnum[]
  }

  /**
   * Project.rulesets
   */
  export type Project$rulesetsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ruleset
     */
    select?: RulesetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ruleset
     */
    omit?: RulesetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RulesetInclude<ExtArgs> | null
    where?: RulesetWhereInput
    orderBy?: RulesetOrderByWithRelationInput | RulesetOrderByWithRelationInput[]
    cursor?: RulesetWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RulesetScalarFieldEnum | RulesetScalarFieldEnum[]
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProjectInclude<ExtArgs> | null
  }


  /**
   * Model Participant
   */

  export type AggregateParticipant = {
    _count: ParticipantCountAggregateOutputType | null
    _avg: ParticipantAvgAggregateOutputType | null
    _sum: ParticipantSumAggregateOutputType | null
    _min: ParticipantMinAggregateOutputType | null
    _max: ParticipantMaxAggregateOutputType | null
  }

  export type ParticipantAvgAggregateOutputType = {
    chainId: number | null
    projectId: number | null
    createdAt: number | null
    balance: number | null
    firstOwned: number | null
    cashOutValue: number | null
  }

  export type ParticipantSumAggregateOutputType = {
    chainId: number | null
    projectId: number | null
    createdAt: number | null
    balance: bigint | null
    firstOwned: number | null
    cashOutValue: bigint | null
  }

  export type ParticipantMinAggregateOutputType = {
    chainId: number | null
    projectId: number | null
    createdAt: number | null
    balance: bigint | null
    isRevnet: boolean | null
    address: string | null
    firstOwned: number | null
    cashOutValue: bigint | null
  }

  export type ParticipantMaxAggregateOutputType = {
    chainId: number | null
    projectId: number | null
    createdAt: number | null
    balance: bigint | null
    isRevnet: boolean | null
    address: string | null
    firstOwned: number | null
    cashOutValue: bigint | null
  }

  export type ParticipantCountAggregateOutputType = {
    chainId: number
    projectId: number
    createdAt: number
    balance: number
    isRevnet: number
    address: number
    firstOwned: number
    cashOutValue: number
    _all: number
  }


  export type ParticipantAvgAggregateInputType = {
    chainId?: true
    projectId?: true
    createdAt?: true
    balance?: true
    firstOwned?: true
    cashOutValue?: true
  }

  export type ParticipantSumAggregateInputType = {
    chainId?: true
    projectId?: true
    createdAt?: true
    balance?: true
    firstOwned?: true
    cashOutValue?: true
  }

  export type ParticipantMinAggregateInputType = {
    chainId?: true
    projectId?: true
    createdAt?: true
    balance?: true
    isRevnet?: true
    address?: true
    firstOwned?: true
    cashOutValue?: true
  }

  export type ParticipantMaxAggregateInputType = {
    chainId?: true
    projectId?: true
    createdAt?: true
    balance?: true
    isRevnet?: true
    address?: true
    firstOwned?: true
    cashOutValue?: true
  }

  export type ParticipantCountAggregateInputType = {
    chainId?: true
    projectId?: true
    createdAt?: true
    balance?: true
    isRevnet?: true
    address?: true
    firstOwned?: true
    cashOutValue?: true
    _all?: true
  }

  export type ParticipantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Participant to aggregate.
     */
    where?: ParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Participants to fetch.
     */
    orderBy?: ParticipantOrderByWithRelationInput | ParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Participants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Participants
    **/
    _count?: true | ParticipantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ParticipantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ParticipantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ParticipantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ParticipantMaxAggregateInputType
  }

  export type GetParticipantAggregateType<T extends ParticipantAggregateArgs> = {
        [P in keyof T & keyof AggregateParticipant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParticipant[P]>
      : GetScalarType<T[P], AggregateParticipant[P]>
  }




  export type ParticipantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParticipantWhereInput
    orderBy?: ParticipantOrderByWithAggregationInput | ParticipantOrderByWithAggregationInput[]
    by: ParticipantScalarFieldEnum[] | ParticipantScalarFieldEnum
    having?: ParticipantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ParticipantCountAggregateInputType | true
    _avg?: ParticipantAvgAggregateInputType
    _sum?: ParticipantSumAggregateInputType
    _min?: ParticipantMinAggregateInputType
    _max?: ParticipantMaxAggregateInputType
  }

  export type ParticipantGroupByOutputType = {
    chainId: number
    projectId: number
    createdAt: number
    balance: bigint
    isRevnet: boolean | null
    address: string
    firstOwned: number | null
    cashOutValue: bigint
    _count: ParticipantCountAggregateOutputType | null
    _avg: ParticipantAvgAggregateOutputType | null
    _sum: ParticipantSumAggregateOutputType | null
    _min: ParticipantMinAggregateOutputType | null
    _max: ParticipantMaxAggregateOutputType | null
  }

  type GetParticipantGroupByPayload<T extends ParticipantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ParticipantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ParticipantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ParticipantGroupByOutputType[P]>
            : GetScalarType<T[P], ParticipantGroupByOutputType[P]>
        }
      >
    >


  export type ParticipantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chainId?: boolean
    projectId?: boolean
    createdAt?: boolean
    balance?: boolean
    isRevnet?: boolean
    address?: boolean
    firstOwned?: boolean
    cashOutValue?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["participant"]>

  export type ParticipantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chainId?: boolean
    projectId?: boolean
    createdAt?: boolean
    balance?: boolean
    isRevnet?: boolean
    address?: boolean
    firstOwned?: boolean
    cashOutValue?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["participant"]>

  export type ParticipantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chainId?: boolean
    projectId?: boolean
    createdAt?: boolean
    balance?: boolean
    isRevnet?: boolean
    address?: boolean
    firstOwned?: boolean
    cashOutValue?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["participant"]>

  export type ParticipantSelectScalar = {
    chainId?: boolean
    projectId?: boolean
    createdAt?: boolean
    balance?: boolean
    isRevnet?: boolean
    address?: boolean
    firstOwned?: boolean
    cashOutValue?: boolean
  }

  export type ParticipantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"chainId" | "projectId" | "createdAt" | "balance" | "isRevnet" | "address" | "firstOwned" | "cashOutValue", ExtArgs["result"]["participant"]>
  export type ParticipantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ParticipantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type ParticipantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $ParticipantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Participant"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      chainId: number
      projectId: number
      createdAt: number
      balance: bigint
      isRevnet: boolean | null
      address: string
      firstOwned: number | null
      cashOutValue: bigint
    }, ExtArgs["result"]["participant"]>
    composites: {}
  }

  type ParticipantGetPayload<S extends boolean | null | undefined | ParticipantDefaultArgs> = $Result.GetResult<Prisma.$ParticipantPayload, S>

  type ParticipantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ParticipantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: ParticipantCountAggregateInputType | true
    }

  export interface ParticipantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Participant'], meta: { name: 'Participant' } }
    /**
     * Find zero or one Participant that matches the filter.
     * @param {ParticipantFindUniqueArgs} args - Arguments to find a Participant
     * @example
     * // Get one Participant
     * const participant = await prisma.participant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ParticipantFindUniqueArgs>(args: SelectSubset<T, ParticipantFindUniqueArgs<ExtArgs>>): Prisma__ParticipantClient<$Result.GetResult<Prisma.$ParticipantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Participant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ParticipantFindUniqueOrThrowArgs} args - Arguments to find a Participant
     * @example
     * // Get one Participant
     * const participant = await prisma.participant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ParticipantFindUniqueOrThrowArgs>(args: SelectSubset<T, ParticipantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ParticipantClient<$Result.GetResult<Prisma.$ParticipantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Participant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantFindFirstArgs} args - Arguments to find a Participant
     * @example
     * // Get one Participant
     * const participant = await prisma.participant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ParticipantFindFirstArgs>(args?: SelectSubset<T, ParticipantFindFirstArgs<ExtArgs>>): Prisma__ParticipantClient<$Result.GetResult<Prisma.$ParticipantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Participant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantFindFirstOrThrowArgs} args - Arguments to find a Participant
     * @example
     * // Get one Participant
     * const participant = await prisma.participant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ParticipantFindFirstOrThrowArgs>(args?: SelectSubset<T, ParticipantFindFirstOrThrowArgs<ExtArgs>>): Prisma__ParticipantClient<$Result.GetResult<Prisma.$ParticipantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Participants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Participants
     * const participants = await prisma.participant.findMany()
     * 
     * // Get first 10 Participants
     * const participants = await prisma.participant.findMany({ take: 10 })
     * 
     * // Only select the `chainId`
     * const participantWithChainIdOnly = await prisma.participant.findMany({ select: { chainId: true } })
     * 
     */
    findMany<T extends ParticipantFindManyArgs>(args?: SelectSubset<T, ParticipantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Participant.
     * @param {ParticipantCreateArgs} args - Arguments to create a Participant.
     * @example
     * // Create one Participant
     * const Participant = await prisma.participant.create({
     *   data: {
     *     // ... data to create a Participant
     *   }
     * })
     * 
     */
    create<T extends ParticipantCreateArgs>(args: SelectSubset<T, ParticipantCreateArgs<ExtArgs>>): Prisma__ParticipantClient<$Result.GetResult<Prisma.$ParticipantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Participants.
     * @param {ParticipantCreateManyArgs} args - Arguments to create many Participants.
     * @example
     * // Create many Participants
     * const participant = await prisma.participant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ParticipantCreateManyArgs>(args?: SelectSubset<T, ParticipantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Participants and returns the data saved in the database.
     * @param {ParticipantCreateManyAndReturnArgs} args - Arguments to create many Participants.
     * @example
     * // Create many Participants
     * const participant = await prisma.participant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Participants and only return the `chainId`
     * const participantWithChainIdOnly = await prisma.participant.createManyAndReturn({
     *   select: { chainId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ParticipantCreateManyAndReturnArgs>(args?: SelectSubset<T, ParticipantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParticipantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Participant.
     * @param {ParticipantDeleteArgs} args - Arguments to delete one Participant.
     * @example
     * // Delete one Participant
     * const Participant = await prisma.participant.delete({
     *   where: {
     *     // ... filter to delete one Participant
     *   }
     * })
     * 
     */
    delete<T extends ParticipantDeleteArgs>(args: SelectSubset<T, ParticipantDeleteArgs<ExtArgs>>): Prisma__ParticipantClient<$Result.GetResult<Prisma.$ParticipantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Participant.
     * @param {ParticipantUpdateArgs} args - Arguments to update one Participant.
     * @example
     * // Update one Participant
     * const participant = await prisma.participant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ParticipantUpdateArgs>(args: SelectSubset<T, ParticipantUpdateArgs<ExtArgs>>): Prisma__ParticipantClient<$Result.GetResult<Prisma.$ParticipantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Participants.
     * @param {ParticipantDeleteManyArgs} args - Arguments to filter Participants to delete.
     * @example
     * // Delete a few Participants
     * const { count } = await prisma.participant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ParticipantDeleteManyArgs>(args?: SelectSubset<T, ParticipantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Participants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Participants
     * const participant = await prisma.participant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ParticipantUpdateManyArgs>(args: SelectSubset<T, ParticipantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Participants and returns the data updated in the database.
     * @param {ParticipantUpdateManyAndReturnArgs} args - Arguments to update many Participants.
     * @example
     * // Update many Participants
     * const participant = await prisma.participant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Participants and only return the `chainId`
     * const participantWithChainIdOnly = await prisma.participant.updateManyAndReturn({
     *   select: { chainId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ParticipantUpdateManyAndReturnArgs>(args: SelectSubset<T, ParticipantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParticipantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Participant.
     * @param {ParticipantUpsertArgs} args - Arguments to update or create a Participant.
     * @example
     * // Update or create a Participant
     * const participant = await prisma.participant.upsert({
     *   create: {
     *     // ... data to create a Participant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Participant we want to update
     *   }
     * })
     */
    upsert<T extends ParticipantUpsertArgs>(args: SelectSubset<T, ParticipantUpsertArgs<ExtArgs>>): Prisma__ParticipantClient<$Result.GetResult<Prisma.$ParticipantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Participants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantCountArgs} args - Arguments to filter Participants to count.
     * @example
     * // Count the number of Participants
     * const count = await prisma.participant.count({
     *   where: {
     *     // ... the filter for the Participants we want to count
     *   }
     * })
    **/
    count<T extends ParticipantCountArgs>(
      args?: Subset<T, ParticipantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ParticipantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Participant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ParticipantAggregateArgs>(args: Subset<T, ParticipantAggregateArgs>): Prisma.PrismaPromise<GetParticipantAggregateType<T>>

    /**
     * Group by Participant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ParticipantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ParticipantGroupByArgs['orderBy'] }
        : { orderBy?: ParticipantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ParticipantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParticipantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Participant model
   */
  readonly fields: ParticipantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Participant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ParticipantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Participant model
   */
  interface ParticipantFieldRefs {
    readonly chainId: FieldRef<"Participant", 'Int'>
    readonly projectId: FieldRef<"Participant", 'Int'>
    readonly createdAt: FieldRef<"Participant", 'Int'>
    readonly balance: FieldRef<"Participant", 'BigInt'>
    readonly isRevnet: FieldRef<"Participant", 'Boolean'>
    readonly address: FieldRef<"Participant", 'String'>
    readonly firstOwned: FieldRef<"Participant", 'Int'>
    readonly cashOutValue: FieldRef<"Participant", 'BigInt'>
  }
    

  // Custom InputTypes
  /**
   * Participant findUnique
   */
  export type ParticipantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participant
     */
    select?: ParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participant
     */
    omit?: ParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantInclude<ExtArgs> | null
    /**
     * Filter, which Participant to fetch.
     */
    where: ParticipantWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Participant findUniqueOrThrow
   */
  export type ParticipantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participant
     */
    select?: ParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participant
     */
    omit?: ParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantInclude<ExtArgs> | null
    /**
     * Filter, which Participant to fetch.
     */
    where: ParticipantWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Participant findFirst
   */
  export type ParticipantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participant
     */
    select?: ParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participant
     */
    omit?: ParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantInclude<ExtArgs> | null
    /**
     * Filter, which Participant to fetch.
     */
    where?: ParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Participants to fetch.
     */
    orderBy?: ParticipantOrderByWithRelationInput | ParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Participants.
     */
    cursor?: ParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Participants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Participants.
     */
    distinct?: ParticipantScalarFieldEnum | ParticipantScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Participant findFirstOrThrow
   */
  export type ParticipantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participant
     */
    select?: ParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participant
     */
    omit?: ParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantInclude<ExtArgs> | null
    /**
     * Filter, which Participant to fetch.
     */
    where?: ParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Participants to fetch.
     */
    orderBy?: ParticipantOrderByWithRelationInput | ParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Participants.
     */
    cursor?: ParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Participants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Participants.
     */
    distinct?: ParticipantScalarFieldEnum | ParticipantScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Participant findMany
   */
  export type ParticipantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participant
     */
    select?: ParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participant
     */
    omit?: ParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantInclude<ExtArgs> | null
    /**
     * Filter, which Participants to fetch.
     */
    where?: ParticipantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Participants to fetch.
     */
    orderBy?: ParticipantOrderByWithRelationInput | ParticipantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Participants.
     */
    cursor?: ParticipantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Participants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Participants.
     */
    skip?: number
    distinct?: ParticipantScalarFieldEnum | ParticipantScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Participant create
   */
  export type ParticipantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participant
     */
    select?: ParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participant
     */
    omit?: ParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantInclude<ExtArgs> | null
    /**
     * The data needed to create a Participant.
     */
    data: XOR<ParticipantCreateInput, ParticipantUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Participant createMany
   */
  export type ParticipantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Participants.
     */
    data: ParticipantCreateManyInput | ParticipantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Participant createManyAndReturn
   */
  export type ParticipantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participant
     */
    select?: ParticipantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Participant
     */
    omit?: ParticipantOmit<ExtArgs> | null
    /**
     * The data used to create many Participants.
     */
    data: ParticipantCreateManyInput | ParticipantCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Participant update
   */
  export type ParticipantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participant
     */
    select?: ParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participant
     */
    omit?: ParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantInclude<ExtArgs> | null
    /**
     * The data needed to update a Participant.
     */
    data: XOR<ParticipantUpdateInput, ParticipantUncheckedUpdateInput>
    /**
     * Choose, which Participant to update.
     */
    where: ParticipantWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Participant updateMany
   */
  export type ParticipantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Participants.
     */
    data: XOR<ParticipantUpdateManyMutationInput, ParticipantUncheckedUpdateManyInput>
    /**
     * Filter which Participants to update
     */
    where?: ParticipantWhereInput
    /**
     * Limit how many Participants to update.
     */
    limit?: number
  }

  /**
   * Participant updateManyAndReturn
   */
  export type ParticipantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participant
     */
    select?: ParticipantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Participant
     */
    omit?: ParticipantOmit<ExtArgs> | null
    /**
     * The data used to update Participants.
     */
    data: XOR<ParticipantUpdateManyMutationInput, ParticipantUncheckedUpdateManyInput>
    /**
     * Filter which Participants to update
     */
    where?: ParticipantWhereInput
    /**
     * Limit how many Participants to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Participant upsert
   */
  export type ParticipantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participant
     */
    select?: ParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participant
     */
    omit?: ParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantInclude<ExtArgs> | null
    /**
     * The filter to search for the Participant to update in case it exists.
     */
    where: ParticipantWhereUniqueInput
    /**
     * In case the Participant found by the `where` argument doesn't exist, create a new Participant with this data.
     */
    create: XOR<ParticipantCreateInput, ParticipantUncheckedCreateInput>
    /**
     * In case the Participant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ParticipantUpdateInput, ParticipantUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Participant delete
   */
  export type ParticipantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participant
     */
    select?: ParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participant
     */
    omit?: ParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantInclude<ExtArgs> | null
    /**
     * Filter which Participant to delete.
     */
    where: ParticipantWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Participant deleteMany
   */
  export type ParticipantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Participants to delete
     */
    where?: ParticipantWhereInput
    /**
     * Limit how many Participants to delete.
     */
    limit?: number
  }

  /**
   * Participant without action
   */
  export type ParticipantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Participant
     */
    select?: ParticipantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Participant
     */
    omit?: ParticipantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantInclude<ExtArgs> | null
  }


  /**
   * Model Ruleset
   */

  export type AggregateRuleset = {
    _count: RulesetCountAggregateOutputType | null
    _avg: RulesetAvgAggregateOutputType | null
    _sum: RulesetSumAggregateOutputType | null
    _min: RulesetMinAggregateOutputType | null
    _max: RulesetMaxAggregateOutputType | null
  }

  export type RulesetAvgAggregateOutputType = {
    chainId: number | null
    projectId: number | null
    rulesetId: number | null
    createdAt: number | null
    queuedAt: number | null
    cycleNumber: number | null
    basedOnId: number | null
    start: number | null
    duration: number | null
    weight: number | null
    weightCutPercent: number | null
    reservedPercent: number | null
    cashOutTaxRate: number | null
    baseCurrency: number | null
    metadata: number | null
    metadataExtra: number | null
    mustStartAtOrAfter: number | null
  }

  export type RulesetSumAggregateOutputType = {
    chainId: number | null
    projectId: number | null
    rulesetId: bigint | null
    createdAt: number | null
    queuedAt: number | null
    cycleNumber: number | null
    basedOnId: bigint | null
    start: bigint | null
    duration: bigint | null
    weight: bigint | null
    weightCutPercent: number | null
    reservedPercent: number | null
    cashOutTaxRate: number | null
    baseCurrency: number | null
    metadata: bigint | null
    metadataExtra: number | null
    mustStartAtOrAfter: bigint | null
  }

  export type RulesetMinAggregateOutputType = {
    chainId: number | null
    projectId: number | null
    rulesetId: bigint | null
    createdAt: number | null
    queuedAt: number | null
    cycleNumber: number | null
    basedOnId: bigint | null
    start: bigint | null
    duration: bigint | null
    weight: bigint | null
    weightCutPercent: number | null
    approvalHook: string | null
    reservedPercent: number | null
    cashOutTaxRate: number | null
    baseCurrency: number | null
    pausePay: boolean | null
    pauseCreditTransfers: boolean | null
    allowOwnerMinting: boolean | null
    allowSetCustomToken: boolean | null
    allowTerminalMigration: boolean | null
    allowSetTerminals: boolean | null
    allowSetController: boolean | null
    allowAddAccountingContext: boolean | null
    allowAddPriceFeed: boolean | null
    ownerMustSendPayouts: boolean | null
    holdFees: boolean | null
    useTotalSurplusForCashOuts: boolean | null
    useDataHookForPay: boolean | null
    useDataHookForCashOut: boolean | null
    dataHook: string | null
    metadata: bigint | null
    metadataExtra: number | null
    mustStartAtOrAfter: bigint | null
    caller: string | null
    approvalStatus: string | null
  }

  export type RulesetMaxAggregateOutputType = {
    chainId: number | null
    projectId: number | null
    rulesetId: bigint | null
    createdAt: number | null
    queuedAt: number | null
    cycleNumber: number | null
    basedOnId: bigint | null
    start: bigint | null
    duration: bigint | null
    weight: bigint | null
    weightCutPercent: number | null
    approvalHook: string | null
    reservedPercent: number | null
    cashOutTaxRate: number | null
    baseCurrency: number | null
    pausePay: boolean | null
    pauseCreditTransfers: boolean | null
    allowOwnerMinting: boolean | null
    allowSetCustomToken: boolean | null
    allowTerminalMigration: boolean | null
    allowSetTerminals: boolean | null
    allowSetController: boolean | null
    allowAddAccountingContext: boolean | null
    allowAddPriceFeed: boolean | null
    ownerMustSendPayouts: boolean | null
    holdFees: boolean | null
    useTotalSurplusForCashOuts: boolean | null
    useDataHookForPay: boolean | null
    useDataHookForCashOut: boolean | null
    dataHook: string | null
    metadata: bigint | null
    metadataExtra: number | null
    mustStartAtOrAfter: bigint | null
    caller: string | null
    approvalStatus: string | null
  }

  export type RulesetCountAggregateOutputType = {
    chainId: number
    projectId: number
    rulesetId: number
    createdAt: number
    queuedAt: number
    cycleNumber: number
    basedOnId: number
    start: number
    duration: number
    weight: number
    weightCutPercent: number
    approvalHook: number
    reservedPercent: number
    cashOutTaxRate: number
    baseCurrency: number
    pausePay: number
    pauseCreditTransfers: number
    allowOwnerMinting: number
    allowSetCustomToken: number
    allowTerminalMigration: number
    allowSetTerminals: number
    allowSetController: number
    allowAddAccountingContext: number
    allowAddPriceFeed: number
    ownerMustSendPayouts: number
    holdFees: number
    useTotalSurplusForCashOuts: number
    useDataHookForPay: number
    useDataHookForCashOut: number
    dataHook: number
    metadata: number
    metadataExtra: number
    mustStartAtOrAfter: number
    caller: number
    approvalStatus: number
    _all: number
  }


  export type RulesetAvgAggregateInputType = {
    chainId?: true
    projectId?: true
    rulesetId?: true
    createdAt?: true
    queuedAt?: true
    cycleNumber?: true
    basedOnId?: true
    start?: true
    duration?: true
    weight?: true
    weightCutPercent?: true
    reservedPercent?: true
    cashOutTaxRate?: true
    baseCurrency?: true
    metadata?: true
    metadataExtra?: true
    mustStartAtOrAfter?: true
  }

  export type RulesetSumAggregateInputType = {
    chainId?: true
    projectId?: true
    rulesetId?: true
    createdAt?: true
    queuedAt?: true
    cycleNumber?: true
    basedOnId?: true
    start?: true
    duration?: true
    weight?: true
    weightCutPercent?: true
    reservedPercent?: true
    cashOutTaxRate?: true
    baseCurrency?: true
    metadata?: true
    metadataExtra?: true
    mustStartAtOrAfter?: true
  }

  export type RulesetMinAggregateInputType = {
    chainId?: true
    projectId?: true
    rulesetId?: true
    createdAt?: true
    queuedAt?: true
    cycleNumber?: true
    basedOnId?: true
    start?: true
    duration?: true
    weight?: true
    weightCutPercent?: true
    approvalHook?: true
    reservedPercent?: true
    cashOutTaxRate?: true
    baseCurrency?: true
    pausePay?: true
    pauseCreditTransfers?: true
    allowOwnerMinting?: true
    allowSetCustomToken?: true
    allowTerminalMigration?: true
    allowSetTerminals?: true
    allowSetController?: true
    allowAddAccountingContext?: true
    allowAddPriceFeed?: true
    ownerMustSendPayouts?: true
    holdFees?: true
    useTotalSurplusForCashOuts?: true
    useDataHookForPay?: true
    useDataHookForCashOut?: true
    dataHook?: true
    metadata?: true
    metadataExtra?: true
    mustStartAtOrAfter?: true
    caller?: true
    approvalStatus?: true
  }

  export type RulesetMaxAggregateInputType = {
    chainId?: true
    projectId?: true
    rulesetId?: true
    createdAt?: true
    queuedAt?: true
    cycleNumber?: true
    basedOnId?: true
    start?: true
    duration?: true
    weight?: true
    weightCutPercent?: true
    approvalHook?: true
    reservedPercent?: true
    cashOutTaxRate?: true
    baseCurrency?: true
    pausePay?: true
    pauseCreditTransfers?: true
    allowOwnerMinting?: true
    allowSetCustomToken?: true
    allowTerminalMigration?: true
    allowSetTerminals?: true
    allowSetController?: true
    allowAddAccountingContext?: true
    allowAddPriceFeed?: true
    ownerMustSendPayouts?: true
    holdFees?: true
    useTotalSurplusForCashOuts?: true
    useDataHookForPay?: true
    useDataHookForCashOut?: true
    dataHook?: true
    metadata?: true
    metadataExtra?: true
    mustStartAtOrAfter?: true
    caller?: true
    approvalStatus?: true
  }

  export type RulesetCountAggregateInputType = {
    chainId?: true
    projectId?: true
    rulesetId?: true
    createdAt?: true
    queuedAt?: true
    cycleNumber?: true
    basedOnId?: true
    start?: true
    duration?: true
    weight?: true
    weightCutPercent?: true
    approvalHook?: true
    reservedPercent?: true
    cashOutTaxRate?: true
    baseCurrency?: true
    pausePay?: true
    pauseCreditTransfers?: true
    allowOwnerMinting?: true
    allowSetCustomToken?: true
    allowTerminalMigration?: true
    allowSetTerminals?: true
    allowSetController?: true
    allowAddAccountingContext?: true
    allowAddPriceFeed?: true
    ownerMustSendPayouts?: true
    holdFees?: true
    useTotalSurplusForCashOuts?: true
    useDataHookForPay?: true
    useDataHookForCashOut?: true
    dataHook?: true
    metadata?: true
    metadataExtra?: true
    mustStartAtOrAfter?: true
    caller?: true
    approvalStatus?: true
    _all?: true
  }

  export type RulesetAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ruleset to aggregate.
     */
    where?: RulesetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rulesets to fetch.
     */
    orderBy?: RulesetOrderByWithRelationInput | RulesetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RulesetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rulesets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rulesets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rulesets
    **/
    _count?: true | RulesetCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RulesetAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RulesetSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RulesetMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RulesetMaxAggregateInputType
  }

  export type GetRulesetAggregateType<T extends RulesetAggregateArgs> = {
        [P in keyof T & keyof AggregateRuleset]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRuleset[P]>
      : GetScalarType<T[P], AggregateRuleset[P]>
  }




  export type RulesetGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RulesetWhereInput
    orderBy?: RulesetOrderByWithAggregationInput | RulesetOrderByWithAggregationInput[]
    by: RulesetScalarFieldEnum[] | RulesetScalarFieldEnum
    having?: RulesetScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RulesetCountAggregateInputType | true
    _avg?: RulesetAvgAggregateInputType
    _sum?: RulesetSumAggregateInputType
    _min?: RulesetMinAggregateInputType
    _max?: RulesetMaxAggregateInputType
  }

  export type RulesetGroupByOutputType = {
    chainId: number
    projectId: number
    rulesetId: bigint
    createdAt: number
    queuedAt: number
    cycleNumber: number
    basedOnId: bigint
    start: bigint
    duration: bigint
    weight: bigint
    weightCutPercent: number
    approvalHook: string | null
    reservedPercent: number
    cashOutTaxRate: number
    baseCurrency: number
    pausePay: boolean
    pauseCreditTransfers: boolean
    allowOwnerMinting: boolean
    allowSetCustomToken: boolean
    allowTerminalMigration: boolean
    allowSetTerminals: boolean
    allowSetController: boolean
    allowAddAccountingContext: boolean
    allowAddPriceFeed: boolean
    ownerMustSendPayouts: boolean
    holdFees: boolean
    useTotalSurplusForCashOuts: boolean
    useDataHookForPay: boolean
    useDataHookForCashOut: boolean
    dataHook: string | null
    metadata: bigint
    metadataExtra: number | null
    mustStartAtOrAfter: bigint | null
    caller: string
    approvalStatus: string | null
    _count: RulesetCountAggregateOutputType | null
    _avg: RulesetAvgAggregateOutputType | null
    _sum: RulesetSumAggregateOutputType | null
    _min: RulesetMinAggregateOutputType | null
    _max: RulesetMaxAggregateOutputType | null
  }

  type GetRulesetGroupByPayload<T extends RulesetGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RulesetGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RulesetGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RulesetGroupByOutputType[P]>
            : GetScalarType<T[P], RulesetGroupByOutputType[P]>
        }
      >
    >


  export type RulesetSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chainId?: boolean
    projectId?: boolean
    rulesetId?: boolean
    createdAt?: boolean
    queuedAt?: boolean
    cycleNumber?: boolean
    basedOnId?: boolean
    start?: boolean
    duration?: boolean
    weight?: boolean
    weightCutPercent?: boolean
    approvalHook?: boolean
    reservedPercent?: boolean
    cashOutTaxRate?: boolean
    baseCurrency?: boolean
    pausePay?: boolean
    pauseCreditTransfers?: boolean
    allowOwnerMinting?: boolean
    allowSetCustomToken?: boolean
    allowTerminalMigration?: boolean
    allowSetTerminals?: boolean
    allowSetController?: boolean
    allowAddAccountingContext?: boolean
    allowAddPriceFeed?: boolean
    ownerMustSendPayouts?: boolean
    holdFees?: boolean
    useTotalSurplusForCashOuts?: boolean
    useDataHookForPay?: boolean
    useDataHookForCashOut?: boolean
    dataHook?: boolean
    metadata?: boolean
    metadataExtra?: boolean
    mustStartAtOrAfter?: boolean
    caller?: boolean
    approvalStatus?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ruleset"]>

  export type RulesetSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chainId?: boolean
    projectId?: boolean
    rulesetId?: boolean
    createdAt?: boolean
    queuedAt?: boolean
    cycleNumber?: boolean
    basedOnId?: boolean
    start?: boolean
    duration?: boolean
    weight?: boolean
    weightCutPercent?: boolean
    approvalHook?: boolean
    reservedPercent?: boolean
    cashOutTaxRate?: boolean
    baseCurrency?: boolean
    pausePay?: boolean
    pauseCreditTransfers?: boolean
    allowOwnerMinting?: boolean
    allowSetCustomToken?: boolean
    allowTerminalMigration?: boolean
    allowSetTerminals?: boolean
    allowSetController?: boolean
    allowAddAccountingContext?: boolean
    allowAddPriceFeed?: boolean
    ownerMustSendPayouts?: boolean
    holdFees?: boolean
    useTotalSurplusForCashOuts?: boolean
    useDataHookForPay?: boolean
    useDataHookForCashOut?: boolean
    dataHook?: boolean
    metadata?: boolean
    metadataExtra?: boolean
    mustStartAtOrAfter?: boolean
    caller?: boolean
    approvalStatus?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ruleset"]>

  export type RulesetSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chainId?: boolean
    projectId?: boolean
    rulesetId?: boolean
    createdAt?: boolean
    queuedAt?: boolean
    cycleNumber?: boolean
    basedOnId?: boolean
    start?: boolean
    duration?: boolean
    weight?: boolean
    weightCutPercent?: boolean
    approvalHook?: boolean
    reservedPercent?: boolean
    cashOutTaxRate?: boolean
    baseCurrency?: boolean
    pausePay?: boolean
    pauseCreditTransfers?: boolean
    allowOwnerMinting?: boolean
    allowSetCustomToken?: boolean
    allowTerminalMigration?: boolean
    allowSetTerminals?: boolean
    allowSetController?: boolean
    allowAddAccountingContext?: boolean
    allowAddPriceFeed?: boolean
    ownerMustSendPayouts?: boolean
    holdFees?: boolean
    useTotalSurplusForCashOuts?: boolean
    useDataHookForPay?: boolean
    useDataHookForCashOut?: boolean
    dataHook?: boolean
    metadata?: boolean
    metadataExtra?: boolean
    mustStartAtOrAfter?: boolean
    caller?: boolean
    approvalStatus?: boolean
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ruleset"]>

  export type RulesetSelectScalar = {
    chainId?: boolean
    projectId?: boolean
    rulesetId?: boolean
    createdAt?: boolean
    queuedAt?: boolean
    cycleNumber?: boolean
    basedOnId?: boolean
    start?: boolean
    duration?: boolean
    weight?: boolean
    weightCutPercent?: boolean
    approvalHook?: boolean
    reservedPercent?: boolean
    cashOutTaxRate?: boolean
    baseCurrency?: boolean
    pausePay?: boolean
    pauseCreditTransfers?: boolean
    allowOwnerMinting?: boolean
    allowSetCustomToken?: boolean
    allowTerminalMigration?: boolean
    allowSetTerminals?: boolean
    allowSetController?: boolean
    allowAddAccountingContext?: boolean
    allowAddPriceFeed?: boolean
    ownerMustSendPayouts?: boolean
    holdFees?: boolean
    useTotalSurplusForCashOuts?: boolean
    useDataHookForPay?: boolean
    useDataHookForCashOut?: boolean
    dataHook?: boolean
    metadata?: boolean
    metadataExtra?: boolean
    mustStartAtOrAfter?: boolean
    caller?: boolean
    approvalStatus?: boolean
  }

  export type RulesetOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"chainId" | "projectId" | "rulesetId" | "createdAt" | "queuedAt" | "cycleNumber" | "basedOnId" | "start" | "duration" | "weight" | "weightCutPercent" | "approvalHook" | "reservedPercent" | "cashOutTaxRate" | "baseCurrency" | "pausePay" | "pauseCreditTransfers" | "allowOwnerMinting" | "allowSetCustomToken" | "allowTerminalMigration" | "allowSetTerminals" | "allowSetController" | "allowAddAccountingContext" | "allowAddPriceFeed" | "ownerMustSendPayouts" | "holdFees" | "useTotalSurplusForCashOuts" | "useDataHookForPay" | "useDataHookForCashOut" | "dataHook" | "metadata" | "metadataExtra" | "mustStartAtOrAfter" | "caller" | "approvalStatus", ExtArgs["result"]["ruleset"]>
  export type RulesetInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type RulesetIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }
  export type RulesetIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | ProjectDefaultArgs<ExtArgs>
  }

  export type $RulesetPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Ruleset"
    objects: {
      project: Prisma.$ProjectPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      chainId: number
      projectId: number
      rulesetId: bigint
      createdAt: number
      queuedAt: number
      cycleNumber: number
      basedOnId: bigint
      start: bigint
      duration: bigint
      weight: bigint
      weightCutPercent: number
      approvalHook: string | null
      reservedPercent: number
      cashOutTaxRate: number
      baseCurrency: number
      pausePay: boolean
      pauseCreditTransfers: boolean
      allowOwnerMinting: boolean
      allowSetCustomToken: boolean
      allowTerminalMigration: boolean
      allowSetTerminals: boolean
      allowSetController: boolean
      allowAddAccountingContext: boolean
      allowAddPriceFeed: boolean
      ownerMustSendPayouts: boolean
      holdFees: boolean
      useTotalSurplusForCashOuts: boolean
      useDataHookForPay: boolean
      useDataHookForCashOut: boolean
      dataHook: string | null
      metadata: bigint
      metadataExtra: number | null
      mustStartAtOrAfter: bigint | null
      caller: string
      approvalStatus: string | null
    }, ExtArgs["result"]["ruleset"]>
    composites: {}
  }

  type RulesetGetPayload<S extends boolean | null | undefined | RulesetDefaultArgs> = $Result.GetResult<Prisma.$RulesetPayload, S>

  type RulesetCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RulesetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: RulesetCountAggregateInputType | true
    }

  export interface RulesetDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ruleset'], meta: { name: 'Ruleset' } }
    /**
     * Find zero or one Ruleset that matches the filter.
     * @param {RulesetFindUniqueArgs} args - Arguments to find a Ruleset
     * @example
     * // Get one Ruleset
     * const ruleset = await prisma.ruleset.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RulesetFindUniqueArgs>(args: SelectSubset<T, RulesetFindUniqueArgs<ExtArgs>>): Prisma__RulesetClient<$Result.GetResult<Prisma.$RulesetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ruleset that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RulesetFindUniqueOrThrowArgs} args - Arguments to find a Ruleset
     * @example
     * // Get one Ruleset
     * const ruleset = await prisma.ruleset.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RulesetFindUniqueOrThrowArgs>(args: SelectSubset<T, RulesetFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RulesetClient<$Result.GetResult<Prisma.$RulesetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ruleset that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RulesetFindFirstArgs} args - Arguments to find a Ruleset
     * @example
     * // Get one Ruleset
     * const ruleset = await prisma.ruleset.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RulesetFindFirstArgs>(args?: SelectSubset<T, RulesetFindFirstArgs<ExtArgs>>): Prisma__RulesetClient<$Result.GetResult<Prisma.$RulesetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ruleset that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RulesetFindFirstOrThrowArgs} args - Arguments to find a Ruleset
     * @example
     * // Get one Ruleset
     * const ruleset = await prisma.ruleset.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RulesetFindFirstOrThrowArgs>(args?: SelectSubset<T, RulesetFindFirstOrThrowArgs<ExtArgs>>): Prisma__RulesetClient<$Result.GetResult<Prisma.$RulesetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Rulesets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RulesetFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rulesets
     * const rulesets = await prisma.ruleset.findMany()
     * 
     * // Get first 10 Rulesets
     * const rulesets = await prisma.ruleset.findMany({ take: 10 })
     * 
     * // Only select the `chainId`
     * const rulesetWithChainIdOnly = await prisma.ruleset.findMany({ select: { chainId: true } })
     * 
     */
    findMany<T extends RulesetFindManyArgs>(args?: SelectSubset<T, RulesetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RulesetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ruleset.
     * @param {RulesetCreateArgs} args - Arguments to create a Ruleset.
     * @example
     * // Create one Ruleset
     * const Ruleset = await prisma.ruleset.create({
     *   data: {
     *     // ... data to create a Ruleset
     *   }
     * })
     * 
     */
    create<T extends RulesetCreateArgs>(args: SelectSubset<T, RulesetCreateArgs<ExtArgs>>): Prisma__RulesetClient<$Result.GetResult<Prisma.$RulesetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Rulesets.
     * @param {RulesetCreateManyArgs} args - Arguments to create many Rulesets.
     * @example
     * // Create many Rulesets
     * const ruleset = await prisma.ruleset.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RulesetCreateManyArgs>(args?: SelectSubset<T, RulesetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rulesets and returns the data saved in the database.
     * @param {RulesetCreateManyAndReturnArgs} args - Arguments to create many Rulesets.
     * @example
     * // Create many Rulesets
     * const ruleset = await prisma.ruleset.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rulesets and only return the `chainId`
     * const rulesetWithChainIdOnly = await prisma.ruleset.createManyAndReturn({
     *   select: { chainId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RulesetCreateManyAndReturnArgs>(args?: SelectSubset<T, RulesetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RulesetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Ruleset.
     * @param {RulesetDeleteArgs} args - Arguments to delete one Ruleset.
     * @example
     * // Delete one Ruleset
     * const Ruleset = await prisma.ruleset.delete({
     *   where: {
     *     // ... filter to delete one Ruleset
     *   }
     * })
     * 
     */
    delete<T extends RulesetDeleteArgs>(args: SelectSubset<T, RulesetDeleteArgs<ExtArgs>>): Prisma__RulesetClient<$Result.GetResult<Prisma.$RulesetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ruleset.
     * @param {RulesetUpdateArgs} args - Arguments to update one Ruleset.
     * @example
     * // Update one Ruleset
     * const ruleset = await prisma.ruleset.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RulesetUpdateArgs>(args: SelectSubset<T, RulesetUpdateArgs<ExtArgs>>): Prisma__RulesetClient<$Result.GetResult<Prisma.$RulesetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Rulesets.
     * @param {RulesetDeleteManyArgs} args - Arguments to filter Rulesets to delete.
     * @example
     * // Delete a few Rulesets
     * const { count } = await prisma.ruleset.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RulesetDeleteManyArgs>(args?: SelectSubset<T, RulesetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rulesets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RulesetUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rulesets
     * const ruleset = await prisma.ruleset.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RulesetUpdateManyArgs>(args: SelectSubset<T, RulesetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rulesets and returns the data updated in the database.
     * @param {RulesetUpdateManyAndReturnArgs} args - Arguments to update many Rulesets.
     * @example
     * // Update many Rulesets
     * const ruleset = await prisma.ruleset.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Rulesets and only return the `chainId`
     * const rulesetWithChainIdOnly = await prisma.ruleset.updateManyAndReturn({
     *   select: { chainId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RulesetUpdateManyAndReturnArgs>(args: SelectSubset<T, RulesetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RulesetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Ruleset.
     * @param {RulesetUpsertArgs} args - Arguments to update or create a Ruleset.
     * @example
     * // Update or create a Ruleset
     * const ruleset = await prisma.ruleset.upsert({
     *   create: {
     *     // ... data to create a Ruleset
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ruleset we want to update
     *   }
     * })
     */
    upsert<T extends RulesetUpsertArgs>(args: SelectSubset<T, RulesetUpsertArgs<ExtArgs>>): Prisma__RulesetClient<$Result.GetResult<Prisma.$RulesetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Rulesets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RulesetCountArgs} args - Arguments to filter Rulesets to count.
     * @example
     * // Count the number of Rulesets
     * const count = await prisma.ruleset.count({
     *   where: {
     *     // ... the filter for the Rulesets we want to count
     *   }
     * })
    **/
    count<T extends RulesetCountArgs>(
      args?: Subset<T, RulesetCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RulesetCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ruleset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RulesetAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RulesetAggregateArgs>(args: Subset<T, RulesetAggregateArgs>): Prisma.PrismaPromise<GetRulesetAggregateType<T>>

    /**
     * Group by Ruleset.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RulesetGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RulesetGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RulesetGroupByArgs['orderBy'] }
        : { orderBy?: RulesetGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RulesetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRulesetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ruleset model
   */
  readonly fields: RulesetFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ruleset.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RulesetClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends ProjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProjectDefaultArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Ruleset model
   */
  interface RulesetFieldRefs {
    readonly chainId: FieldRef<"Ruleset", 'Int'>
    readonly projectId: FieldRef<"Ruleset", 'Int'>
    readonly rulesetId: FieldRef<"Ruleset", 'BigInt'>
    readonly createdAt: FieldRef<"Ruleset", 'Int'>
    readonly queuedAt: FieldRef<"Ruleset", 'Int'>
    readonly cycleNumber: FieldRef<"Ruleset", 'Int'>
    readonly basedOnId: FieldRef<"Ruleset", 'BigInt'>
    readonly start: FieldRef<"Ruleset", 'BigInt'>
    readonly duration: FieldRef<"Ruleset", 'BigInt'>
    readonly weight: FieldRef<"Ruleset", 'BigInt'>
    readonly weightCutPercent: FieldRef<"Ruleset", 'Int'>
    readonly approvalHook: FieldRef<"Ruleset", 'String'>
    readonly reservedPercent: FieldRef<"Ruleset", 'Int'>
    readonly cashOutTaxRate: FieldRef<"Ruleset", 'Int'>
    readonly baseCurrency: FieldRef<"Ruleset", 'Int'>
    readonly pausePay: FieldRef<"Ruleset", 'Boolean'>
    readonly pauseCreditTransfers: FieldRef<"Ruleset", 'Boolean'>
    readonly allowOwnerMinting: FieldRef<"Ruleset", 'Boolean'>
    readonly allowSetCustomToken: FieldRef<"Ruleset", 'Boolean'>
    readonly allowTerminalMigration: FieldRef<"Ruleset", 'Boolean'>
    readonly allowSetTerminals: FieldRef<"Ruleset", 'Boolean'>
    readonly allowSetController: FieldRef<"Ruleset", 'Boolean'>
    readonly allowAddAccountingContext: FieldRef<"Ruleset", 'Boolean'>
    readonly allowAddPriceFeed: FieldRef<"Ruleset", 'Boolean'>
    readonly ownerMustSendPayouts: FieldRef<"Ruleset", 'Boolean'>
    readonly holdFees: FieldRef<"Ruleset", 'Boolean'>
    readonly useTotalSurplusForCashOuts: FieldRef<"Ruleset", 'Boolean'>
    readonly useDataHookForPay: FieldRef<"Ruleset", 'Boolean'>
    readonly useDataHookForCashOut: FieldRef<"Ruleset", 'Boolean'>
    readonly dataHook: FieldRef<"Ruleset", 'String'>
    readonly metadata: FieldRef<"Ruleset", 'BigInt'>
    readonly metadataExtra: FieldRef<"Ruleset", 'Int'>
    readonly mustStartAtOrAfter: FieldRef<"Ruleset", 'BigInt'>
    readonly caller: FieldRef<"Ruleset", 'String'>
    readonly approvalStatus: FieldRef<"Ruleset", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Ruleset findUnique
   */
  export type RulesetFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ruleset
     */
    select?: RulesetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ruleset
     */
    omit?: RulesetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RulesetInclude<ExtArgs> | null
    /**
     * Filter, which Ruleset to fetch.
     */
    where: RulesetWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Ruleset findUniqueOrThrow
   */
  export type RulesetFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ruleset
     */
    select?: RulesetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ruleset
     */
    omit?: RulesetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RulesetInclude<ExtArgs> | null
    /**
     * Filter, which Ruleset to fetch.
     */
    where: RulesetWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Ruleset findFirst
   */
  export type RulesetFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ruleset
     */
    select?: RulesetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ruleset
     */
    omit?: RulesetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RulesetInclude<ExtArgs> | null
    /**
     * Filter, which Ruleset to fetch.
     */
    where?: RulesetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rulesets to fetch.
     */
    orderBy?: RulesetOrderByWithRelationInput | RulesetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rulesets.
     */
    cursor?: RulesetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rulesets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rulesets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rulesets.
     */
    distinct?: RulesetScalarFieldEnum | RulesetScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Ruleset findFirstOrThrow
   */
  export type RulesetFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ruleset
     */
    select?: RulesetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ruleset
     */
    omit?: RulesetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RulesetInclude<ExtArgs> | null
    /**
     * Filter, which Ruleset to fetch.
     */
    where?: RulesetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rulesets to fetch.
     */
    orderBy?: RulesetOrderByWithRelationInput | RulesetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rulesets.
     */
    cursor?: RulesetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rulesets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rulesets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rulesets.
     */
    distinct?: RulesetScalarFieldEnum | RulesetScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Ruleset findMany
   */
  export type RulesetFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ruleset
     */
    select?: RulesetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ruleset
     */
    omit?: RulesetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RulesetInclude<ExtArgs> | null
    /**
     * Filter, which Rulesets to fetch.
     */
    where?: RulesetWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rulesets to fetch.
     */
    orderBy?: RulesetOrderByWithRelationInput | RulesetOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rulesets.
     */
    cursor?: RulesetWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rulesets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rulesets.
     */
    skip?: number
    distinct?: RulesetScalarFieldEnum | RulesetScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Ruleset create
   */
  export type RulesetCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ruleset
     */
    select?: RulesetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ruleset
     */
    omit?: RulesetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RulesetInclude<ExtArgs> | null
    /**
     * The data needed to create a Ruleset.
     */
    data: XOR<RulesetCreateInput, RulesetUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Ruleset createMany
   */
  export type RulesetCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rulesets.
     */
    data: RulesetCreateManyInput | RulesetCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Ruleset createManyAndReturn
   */
  export type RulesetCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ruleset
     */
    select?: RulesetSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ruleset
     */
    omit?: RulesetOmit<ExtArgs> | null
    /**
     * The data used to create many Rulesets.
     */
    data: RulesetCreateManyInput | RulesetCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RulesetIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ruleset update
   */
  export type RulesetUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ruleset
     */
    select?: RulesetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ruleset
     */
    omit?: RulesetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RulesetInclude<ExtArgs> | null
    /**
     * The data needed to update a Ruleset.
     */
    data: XOR<RulesetUpdateInput, RulesetUncheckedUpdateInput>
    /**
     * Choose, which Ruleset to update.
     */
    where: RulesetWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Ruleset updateMany
   */
  export type RulesetUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rulesets.
     */
    data: XOR<RulesetUpdateManyMutationInput, RulesetUncheckedUpdateManyInput>
    /**
     * Filter which Rulesets to update
     */
    where?: RulesetWhereInput
    /**
     * Limit how many Rulesets to update.
     */
    limit?: number
  }

  /**
   * Ruleset updateManyAndReturn
   */
  export type RulesetUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ruleset
     */
    select?: RulesetSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ruleset
     */
    omit?: RulesetOmit<ExtArgs> | null
    /**
     * The data used to update Rulesets.
     */
    data: XOR<RulesetUpdateManyMutationInput, RulesetUncheckedUpdateManyInput>
    /**
     * Filter which Rulesets to update
     */
    where?: RulesetWhereInput
    /**
     * Limit how many Rulesets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RulesetIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ruleset upsert
   */
  export type RulesetUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ruleset
     */
    select?: RulesetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ruleset
     */
    omit?: RulesetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RulesetInclude<ExtArgs> | null
    /**
     * The filter to search for the Ruleset to update in case it exists.
     */
    where: RulesetWhereUniqueInput
    /**
     * In case the Ruleset found by the `where` argument doesn't exist, create a new Ruleset with this data.
     */
    create: XOR<RulesetCreateInput, RulesetUncheckedCreateInput>
    /**
     * In case the Ruleset was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RulesetUpdateInput, RulesetUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Ruleset delete
   */
  export type RulesetDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ruleset
     */
    select?: RulesetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ruleset
     */
    omit?: RulesetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RulesetInclude<ExtArgs> | null
    /**
     * Filter which Ruleset to delete.
     */
    where: RulesetWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Ruleset deleteMany
   */
  export type RulesetDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rulesets to delete
     */
    where?: RulesetWhereInput
    /**
     * Limit how many Rulesets to delete.
     */
    limit?: number
  }

  /**
   * Ruleset without action
   */
  export type RulesetDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ruleset
     */
    select?: RulesetSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ruleset
     */
    omit?: RulesetOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RulesetInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProjectScalarFieldEnum: {
    chainId: 'chainId',
    createdAt: 'createdAt',
    projectId: 'projectId',
    paymentsCount: 'paymentsCount',
    balance: 'balance',
    isRevnet: 'isRevnet',
    deployer: 'deployer',
    owner: 'owner',
    erc20: 'erc20',
    erc20Supply: 'erc20Supply',
    erc20Name: 'erc20Name',
    erc20Symbol: 'erc20Symbol',
    cashoutA: 'cashoutA',
    cashoutB: 'cashoutB',
    currentRulesetId: 'currentRulesetId',
    contributorsCount: 'contributorsCount',
    redeemCount: 'redeemCount',
    redeemVolume: 'redeemVolume',
    pendingReservedTokens: 'pendingReservedTokens',
    metadataUri: 'metadataUri',
    metadata: 'metadata',
    name: 'name',
    infoUri: 'infoUri',
    logoUri: 'logoUri',
    coverImageUri: 'coverImageUri',
    twitter: 'twitter',
    discord: 'discord',
    telegram: 'telegram',
    tokens: 'tokens',
    domain: 'domain',
    description: 'description',
    tags: 'tags',
    projectTagline: 'projectTagline'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const RelationLoadStrategy: {
    query: 'query',
    join: 'join'
  };

  export type RelationLoadStrategy = (typeof RelationLoadStrategy)[keyof typeof RelationLoadStrategy]


  export const ParticipantScalarFieldEnum: {
    chainId: 'chainId',
    projectId: 'projectId',
    createdAt: 'createdAt',
    balance: 'balance',
    isRevnet: 'isRevnet',
    address: 'address',
    firstOwned: 'firstOwned',
    cashOutValue: 'cashOutValue'
  };

  export type ParticipantScalarFieldEnum = (typeof ParticipantScalarFieldEnum)[keyof typeof ParticipantScalarFieldEnum]


  export const RulesetScalarFieldEnum: {
    chainId: 'chainId',
    projectId: 'projectId',
    rulesetId: 'rulesetId',
    createdAt: 'createdAt',
    queuedAt: 'queuedAt',
    cycleNumber: 'cycleNumber',
    basedOnId: 'basedOnId',
    start: 'start',
    duration: 'duration',
    weight: 'weight',
    weightCutPercent: 'weightCutPercent',
    approvalHook: 'approvalHook',
    reservedPercent: 'reservedPercent',
    cashOutTaxRate: 'cashOutTaxRate',
    baseCurrency: 'baseCurrency',
    pausePay: 'pausePay',
    pauseCreditTransfers: 'pauseCreditTransfers',
    allowOwnerMinting: 'allowOwnerMinting',
    allowSetCustomToken: 'allowSetCustomToken',
    allowTerminalMigration: 'allowTerminalMigration',
    allowSetTerminals: 'allowSetTerminals',
    allowSetController: 'allowSetController',
    allowAddAccountingContext: 'allowAddAccountingContext',
    allowAddPriceFeed: 'allowAddPriceFeed',
    ownerMustSendPayouts: 'ownerMustSendPayouts',
    holdFees: 'holdFees',
    useTotalSurplusForCashOuts: 'useTotalSurplusForCashOuts',
    useDataHookForPay: 'useDataHookForPay',
    useDataHookForCashOut: 'useDataHookForCashOut',
    dataHook: 'dataHook',
    metadata: 'metadata',
    metadataExtra: 'metadataExtra',
    mustStartAtOrAfter: 'mustStartAtOrAfter',
    caller: 'caller',
    approvalStatus: 'approvalStatus'
  };

  export type RulesetScalarFieldEnum = (typeof RulesetScalarFieldEnum)[keyof typeof RulesetScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    chainId?: IntFilter<"Project"> | number
    createdAt?: IntFilter<"Project"> | number
    projectId?: IntFilter<"Project"> | number
    paymentsCount?: IntFilter<"Project"> | number
    balance?: BigIntFilter<"Project"> | bigint | number
    isRevnet?: BoolFilter<"Project"> | boolean
    deployer?: StringFilter<"Project"> | string
    owner?: StringFilter<"Project"> | string
    erc20?: StringNullableFilter<"Project"> | string | null
    erc20Supply?: BigIntFilter<"Project"> | bigint | number
    erc20Name?: StringNullableFilter<"Project"> | string | null
    erc20Symbol?: StringNullableFilter<"Project"> | string | null
    cashoutA?: BigIntFilter<"Project"> | bigint | number
    cashoutB?: BigIntFilter<"Project"> | bigint | number
    currentRulesetId?: BigIntFilter<"Project"> | bigint | number
    contributorsCount?: IntFilter<"Project"> | number
    redeemCount?: IntFilter<"Project"> | number
    redeemVolume?: BigIntFilter<"Project"> | bigint | number
    pendingReservedTokens?: BigIntFilter<"Project"> | bigint | number
    metadataUri?: StringNullableFilter<"Project"> | string | null
    metadata?: JsonNullableFilter<"Project">
    name?: StringNullableFilter<"Project"> | string | null
    infoUri?: StringNullableFilter<"Project"> | string | null
    logoUri?: StringNullableFilter<"Project"> | string | null
    coverImageUri?: StringNullableFilter<"Project"> | string | null
    twitter?: StringNullableFilter<"Project"> | string | null
    discord?: StringNullableFilter<"Project"> | string | null
    telegram?: StringNullableFilter<"Project"> | string | null
    tokens?: StringNullableListFilter<"Project">
    domain?: StringNullableFilter<"Project"> | string | null
    description?: StringNullableFilter<"Project"> | string | null
    tags?: StringNullableListFilter<"Project">
    projectTagline?: StringNullableFilter<"Project"> | string | null
    participants?: ParticipantListRelationFilter
    rulesets?: RulesetListRelationFilter
  }

  export type ProjectOrderByWithRelationInput = {
    chainId?: SortOrder
    createdAt?: SortOrder
    projectId?: SortOrder
    paymentsCount?: SortOrder
    balance?: SortOrder
    isRevnet?: SortOrder
    deployer?: SortOrder
    owner?: SortOrder
    erc20?: SortOrderInput | SortOrder
    erc20Supply?: SortOrder
    erc20Name?: SortOrderInput | SortOrder
    erc20Symbol?: SortOrderInput | SortOrder
    cashoutA?: SortOrder
    cashoutB?: SortOrder
    currentRulesetId?: SortOrder
    contributorsCount?: SortOrder
    redeemCount?: SortOrder
    redeemVolume?: SortOrder
    pendingReservedTokens?: SortOrder
    metadataUri?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    infoUri?: SortOrderInput | SortOrder
    logoUri?: SortOrderInput | SortOrder
    coverImageUri?: SortOrderInput | SortOrder
    twitter?: SortOrderInput | SortOrder
    discord?: SortOrderInput | SortOrder
    telegram?: SortOrderInput | SortOrder
    tokens?: SortOrder
    domain?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    tags?: SortOrder
    projectTagline?: SortOrderInput | SortOrder
    participants?: ParticipantOrderByRelationAggregateInput
    rulesets?: RulesetOrderByRelationAggregateInput
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    chainId_projectId?: ProjectChainIdProjectIdCompoundUniqueInput
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    chainId?: IntFilter<"Project"> | number
    createdAt?: IntFilter<"Project"> | number
    projectId?: IntFilter<"Project"> | number
    paymentsCount?: IntFilter<"Project"> | number
    balance?: BigIntFilter<"Project"> | bigint | number
    isRevnet?: BoolFilter<"Project"> | boolean
    deployer?: StringFilter<"Project"> | string
    owner?: StringFilter<"Project"> | string
    erc20?: StringNullableFilter<"Project"> | string | null
    erc20Supply?: BigIntFilter<"Project"> | bigint | number
    erc20Name?: StringNullableFilter<"Project"> | string | null
    erc20Symbol?: StringNullableFilter<"Project"> | string | null
    cashoutA?: BigIntFilter<"Project"> | bigint | number
    cashoutB?: BigIntFilter<"Project"> | bigint | number
    currentRulesetId?: BigIntFilter<"Project"> | bigint | number
    contributorsCount?: IntFilter<"Project"> | number
    redeemCount?: IntFilter<"Project"> | number
    redeemVolume?: BigIntFilter<"Project"> | bigint | number
    pendingReservedTokens?: BigIntFilter<"Project"> | bigint | number
    metadataUri?: StringNullableFilter<"Project"> | string | null
    metadata?: JsonNullableFilter<"Project">
    name?: StringNullableFilter<"Project"> | string | null
    infoUri?: StringNullableFilter<"Project"> | string | null
    logoUri?: StringNullableFilter<"Project"> | string | null
    coverImageUri?: StringNullableFilter<"Project"> | string | null
    twitter?: StringNullableFilter<"Project"> | string | null
    discord?: StringNullableFilter<"Project"> | string | null
    telegram?: StringNullableFilter<"Project"> | string | null
    tokens?: StringNullableListFilter<"Project">
    domain?: StringNullableFilter<"Project"> | string | null
    description?: StringNullableFilter<"Project"> | string | null
    tags?: StringNullableListFilter<"Project">
    projectTagline?: StringNullableFilter<"Project"> | string | null
    participants?: ParticipantListRelationFilter
    rulesets?: RulesetListRelationFilter
  }, "chainId_projectId">

  export type ProjectOrderByWithAggregationInput = {
    chainId?: SortOrder
    createdAt?: SortOrder
    projectId?: SortOrder
    paymentsCount?: SortOrder
    balance?: SortOrder
    isRevnet?: SortOrder
    deployer?: SortOrder
    owner?: SortOrder
    erc20?: SortOrderInput | SortOrder
    erc20Supply?: SortOrder
    erc20Name?: SortOrderInput | SortOrder
    erc20Symbol?: SortOrderInput | SortOrder
    cashoutA?: SortOrder
    cashoutB?: SortOrder
    currentRulesetId?: SortOrder
    contributorsCount?: SortOrder
    redeemCount?: SortOrder
    redeemVolume?: SortOrder
    pendingReservedTokens?: SortOrder
    metadataUri?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    infoUri?: SortOrderInput | SortOrder
    logoUri?: SortOrderInput | SortOrder
    coverImageUri?: SortOrderInput | SortOrder
    twitter?: SortOrderInput | SortOrder
    discord?: SortOrderInput | SortOrder
    telegram?: SortOrderInput | SortOrder
    tokens?: SortOrder
    domain?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    tags?: SortOrder
    projectTagline?: SortOrderInput | SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _avg?: ProjectAvgOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
    _sum?: ProjectSumOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    chainId?: IntWithAggregatesFilter<"Project"> | number
    createdAt?: IntWithAggregatesFilter<"Project"> | number
    projectId?: IntWithAggregatesFilter<"Project"> | number
    paymentsCount?: IntWithAggregatesFilter<"Project"> | number
    balance?: BigIntWithAggregatesFilter<"Project"> | bigint | number
    isRevnet?: BoolWithAggregatesFilter<"Project"> | boolean
    deployer?: StringWithAggregatesFilter<"Project"> | string
    owner?: StringWithAggregatesFilter<"Project"> | string
    erc20?: StringNullableWithAggregatesFilter<"Project"> | string | null
    erc20Supply?: BigIntWithAggregatesFilter<"Project"> | bigint | number
    erc20Name?: StringNullableWithAggregatesFilter<"Project"> | string | null
    erc20Symbol?: StringNullableWithAggregatesFilter<"Project"> | string | null
    cashoutA?: BigIntWithAggregatesFilter<"Project"> | bigint | number
    cashoutB?: BigIntWithAggregatesFilter<"Project"> | bigint | number
    currentRulesetId?: BigIntWithAggregatesFilter<"Project"> | bigint | number
    contributorsCount?: IntWithAggregatesFilter<"Project"> | number
    redeemCount?: IntWithAggregatesFilter<"Project"> | number
    redeemVolume?: BigIntWithAggregatesFilter<"Project"> | bigint | number
    pendingReservedTokens?: BigIntWithAggregatesFilter<"Project"> | bigint | number
    metadataUri?: StringNullableWithAggregatesFilter<"Project"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"Project">
    name?: StringNullableWithAggregatesFilter<"Project"> | string | null
    infoUri?: StringNullableWithAggregatesFilter<"Project"> | string | null
    logoUri?: StringNullableWithAggregatesFilter<"Project"> | string | null
    coverImageUri?: StringNullableWithAggregatesFilter<"Project"> | string | null
    twitter?: StringNullableWithAggregatesFilter<"Project"> | string | null
    discord?: StringNullableWithAggregatesFilter<"Project"> | string | null
    telegram?: StringNullableWithAggregatesFilter<"Project"> | string | null
    tokens?: StringNullableListFilter<"Project">
    domain?: StringNullableWithAggregatesFilter<"Project"> | string | null
    description?: StringNullableWithAggregatesFilter<"Project"> | string | null
    tags?: StringNullableListFilter<"Project">
    projectTagline?: StringNullableWithAggregatesFilter<"Project"> | string | null
  }

  export type ParticipantWhereInput = {
    AND?: ParticipantWhereInput | ParticipantWhereInput[]
    OR?: ParticipantWhereInput[]
    NOT?: ParticipantWhereInput | ParticipantWhereInput[]
    chainId?: IntFilter<"Participant"> | number
    projectId?: IntFilter<"Participant"> | number
    createdAt?: IntFilter<"Participant"> | number
    balance?: BigIntFilter<"Participant"> | bigint | number
    isRevnet?: BoolNullableFilter<"Participant"> | boolean | null
    address?: StringFilter<"Participant"> | string
    firstOwned?: IntNullableFilter<"Participant"> | number | null
    cashOutValue?: BigIntFilter<"Participant"> | bigint | number
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type ParticipantOrderByWithRelationInput = {
    chainId?: SortOrder
    projectId?: SortOrder
    createdAt?: SortOrder
    balance?: SortOrder
    isRevnet?: SortOrderInput | SortOrder
    address?: SortOrder
    firstOwned?: SortOrderInput | SortOrder
    cashOutValue?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type ParticipantWhereUniqueInput = Prisma.AtLeast<{
    chainId_projectId_address?: ParticipantChainIdProjectIdAddressCompoundUniqueInput
    AND?: ParticipantWhereInput | ParticipantWhereInput[]
    OR?: ParticipantWhereInput[]
    NOT?: ParticipantWhereInput | ParticipantWhereInput[]
    chainId?: IntFilter<"Participant"> | number
    projectId?: IntFilter<"Participant"> | number
    createdAt?: IntFilter<"Participant"> | number
    balance?: BigIntFilter<"Participant"> | bigint | number
    isRevnet?: BoolNullableFilter<"Participant"> | boolean | null
    address?: StringFilter<"Participant"> | string
    firstOwned?: IntNullableFilter<"Participant"> | number | null
    cashOutValue?: BigIntFilter<"Participant"> | bigint | number
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "chainId_projectId_address">

  export type ParticipantOrderByWithAggregationInput = {
    chainId?: SortOrder
    projectId?: SortOrder
    createdAt?: SortOrder
    balance?: SortOrder
    isRevnet?: SortOrderInput | SortOrder
    address?: SortOrder
    firstOwned?: SortOrderInput | SortOrder
    cashOutValue?: SortOrder
    _count?: ParticipantCountOrderByAggregateInput
    _avg?: ParticipantAvgOrderByAggregateInput
    _max?: ParticipantMaxOrderByAggregateInput
    _min?: ParticipantMinOrderByAggregateInput
    _sum?: ParticipantSumOrderByAggregateInput
  }

  export type ParticipantScalarWhereWithAggregatesInput = {
    AND?: ParticipantScalarWhereWithAggregatesInput | ParticipantScalarWhereWithAggregatesInput[]
    OR?: ParticipantScalarWhereWithAggregatesInput[]
    NOT?: ParticipantScalarWhereWithAggregatesInput | ParticipantScalarWhereWithAggregatesInput[]
    chainId?: IntWithAggregatesFilter<"Participant"> | number
    projectId?: IntWithAggregatesFilter<"Participant"> | number
    createdAt?: IntWithAggregatesFilter<"Participant"> | number
    balance?: BigIntWithAggregatesFilter<"Participant"> | bigint | number
    isRevnet?: BoolNullableWithAggregatesFilter<"Participant"> | boolean | null
    address?: StringWithAggregatesFilter<"Participant"> | string
    firstOwned?: IntNullableWithAggregatesFilter<"Participant"> | number | null
    cashOutValue?: BigIntWithAggregatesFilter<"Participant"> | bigint | number
  }

  export type RulesetWhereInput = {
    AND?: RulesetWhereInput | RulesetWhereInput[]
    OR?: RulesetWhereInput[]
    NOT?: RulesetWhereInput | RulesetWhereInput[]
    chainId?: IntFilter<"Ruleset"> | number
    projectId?: IntFilter<"Ruleset"> | number
    rulesetId?: BigIntFilter<"Ruleset"> | bigint | number
    createdAt?: IntFilter<"Ruleset"> | number
    queuedAt?: IntFilter<"Ruleset"> | number
    cycleNumber?: IntFilter<"Ruleset"> | number
    basedOnId?: BigIntFilter<"Ruleset"> | bigint | number
    start?: BigIntFilter<"Ruleset"> | bigint | number
    duration?: BigIntFilter<"Ruleset"> | bigint | number
    weight?: BigIntFilter<"Ruleset"> | bigint | number
    weightCutPercent?: IntFilter<"Ruleset"> | number
    approvalHook?: StringNullableFilter<"Ruleset"> | string | null
    reservedPercent?: IntFilter<"Ruleset"> | number
    cashOutTaxRate?: IntFilter<"Ruleset"> | number
    baseCurrency?: IntFilter<"Ruleset"> | number
    pausePay?: BoolFilter<"Ruleset"> | boolean
    pauseCreditTransfers?: BoolFilter<"Ruleset"> | boolean
    allowOwnerMinting?: BoolFilter<"Ruleset"> | boolean
    allowSetCustomToken?: BoolFilter<"Ruleset"> | boolean
    allowTerminalMigration?: BoolFilter<"Ruleset"> | boolean
    allowSetTerminals?: BoolFilter<"Ruleset"> | boolean
    allowSetController?: BoolFilter<"Ruleset"> | boolean
    allowAddAccountingContext?: BoolFilter<"Ruleset"> | boolean
    allowAddPriceFeed?: BoolFilter<"Ruleset"> | boolean
    ownerMustSendPayouts?: BoolFilter<"Ruleset"> | boolean
    holdFees?: BoolFilter<"Ruleset"> | boolean
    useTotalSurplusForCashOuts?: BoolFilter<"Ruleset"> | boolean
    useDataHookForPay?: BoolFilter<"Ruleset"> | boolean
    useDataHookForCashOut?: BoolFilter<"Ruleset"> | boolean
    dataHook?: StringNullableFilter<"Ruleset"> | string | null
    metadata?: BigIntFilter<"Ruleset"> | bigint | number
    metadataExtra?: IntNullableFilter<"Ruleset"> | number | null
    mustStartAtOrAfter?: BigIntNullableFilter<"Ruleset"> | bigint | number | null
    caller?: StringFilter<"Ruleset"> | string
    approvalStatus?: StringNullableFilter<"Ruleset"> | string | null
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }

  export type RulesetOrderByWithRelationInput = {
    chainId?: SortOrder
    projectId?: SortOrder
    rulesetId?: SortOrder
    createdAt?: SortOrder
    queuedAt?: SortOrder
    cycleNumber?: SortOrder
    basedOnId?: SortOrder
    start?: SortOrder
    duration?: SortOrder
    weight?: SortOrder
    weightCutPercent?: SortOrder
    approvalHook?: SortOrderInput | SortOrder
    reservedPercent?: SortOrder
    cashOutTaxRate?: SortOrder
    baseCurrency?: SortOrder
    pausePay?: SortOrder
    pauseCreditTransfers?: SortOrder
    allowOwnerMinting?: SortOrder
    allowSetCustomToken?: SortOrder
    allowTerminalMigration?: SortOrder
    allowSetTerminals?: SortOrder
    allowSetController?: SortOrder
    allowAddAccountingContext?: SortOrder
    allowAddPriceFeed?: SortOrder
    ownerMustSendPayouts?: SortOrder
    holdFees?: SortOrder
    useTotalSurplusForCashOuts?: SortOrder
    useDataHookForPay?: SortOrder
    useDataHookForCashOut?: SortOrder
    dataHook?: SortOrderInput | SortOrder
    metadata?: SortOrder
    metadataExtra?: SortOrderInput | SortOrder
    mustStartAtOrAfter?: SortOrderInput | SortOrder
    caller?: SortOrder
    approvalStatus?: SortOrderInput | SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type RulesetWhereUniqueInput = Prisma.AtLeast<{
    chainId_projectId_rulesetId?: RulesetChainIdProjectIdRulesetIdCompoundUniqueInput
    AND?: RulesetWhereInput | RulesetWhereInput[]
    OR?: RulesetWhereInput[]
    NOT?: RulesetWhereInput | RulesetWhereInput[]
    chainId?: IntFilter<"Ruleset"> | number
    projectId?: IntFilter<"Ruleset"> | number
    rulesetId?: BigIntFilter<"Ruleset"> | bigint | number
    createdAt?: IntFilter<"Ruleset"> | number
    queuedAt?: IntFilter<"Ruleset"> | number
    cycleNumber?: IntFilter<"Ruleset"> | number
    basedOnId?: BigIntFilter<"Ruleset"> | bigint | number
    start?: BigIntFilter<"Ruleset"> | bigint | number
    duration?: BigIntFilter<"Ruleset"> | bigint | number
    weight?: BigIntFilter<"Ruleset"> | bigint | number
    weightCutPercent?: IntFilter<"Ruleset"> | number
    approvalHook?: StringNullableFilter<"Ruleset"> | string | null
    reservedPercent?: IntFilter<"Ruleset"> | number
    cashOutTaxRate?: IntFilter<"Ruleset"> | number
    baseCurrency?: IntFilter<"Ruleset"> | number
    pausePay?: BoolFilter<"Ruleset"> | boolean
    pauseCreditTransfers?: BoolFilter<"Ruleset"> | boolean
    allowOwnerMinting?: BoolFilter<"Ruleset"> | boolean
    allowSetCustomToken?: BoolFilter<"Ruleset"> | boolean
    allowTerminalMigration?: BoolFilter<"Ruleset"> | boolean
    allowSetTerminals?: BoolFilter<"Ruleset"> | boolean
    allowSetController?: BoolFilter<"Ruleset"> | boolean
    allowAddAccountingContext?: BoolFilter<"Ruleset"> | boolean
    allowAddPriceFeed?: BoolFilter<"Ruleset"> | boolean
    ownerMustSendPayouts?: BoolFilter<"Ruleset"> | boolean
    holdFees?: BoolFilter<"Ruleset"> | boolean
    useTotalSurplusForCashOuts?: BoolFilter<"Ruleset"> | boolean
    useDataHookForPay?: BoolFilter<"Ruleset"> | boolean
    useDataHookForCashOut?: BoolFilter<"Ruleset"> | boolean
    dataHook?: StringNullableFilter<"Ruleset"> | string | null
    metadata?: BigIntFilter<"Ruleset"> | bigint | number
    metadataExtra?: IntNullableFilter<"Ruleset"> | number | null
    mustStartAtOrAfter?: BigIntNullableFilter<"Ruleset"> | bigint | number | null
    caller?: StringFilter<"Ruleset"> | string
    approvalStatus?: StringNullableFilter<"Ruleset"> | string | null
    project?: XOR<ProjectScalarRelationFilter, ProjectWhereInput>
  }, "chainId_projectId_rulesetId">

  export type RulesetOrderByWithAggregationInput = {
    chainId?: SortOrder
    projectId?: SortOrder
    rulesetId?: SortOrder
    createdAt?: SortOrder
    queuedAt?: SortOrder
    cycleNumber?: SortOrder
    basedOnId?: SortOrder
    start?: SortOrder
    duration?: SortOrder
    weight?: SortOrder
    weightCutPercent?: SortOrder
    approvalHook?: SortOrderInput | SortOrder
    reservedPercent?: SortOrder
    cashOutTaxRate?: SortOrder
    baseCurrency?: SortOrder
    pausePay?: SortOrder
    pauseCreditTransfers?: SortOrder
    allowOwnerMinting?: SortOrder
    allowSetCustomToken?: SortOrder
    allowTerminalMigration?: SortOrder
    allowSetTerminals?: SortOrder
    allowSetController?: SortOrder
    allowAddAccountingContext?: SortOrder
    allowAddPriceFeed?: SortOrder
    ownerMustSendPayouts?: SortOrder
    holdFees?: SortOrder
    useTotalSurplusForCashOuts?: SortOrder
    useDataHookForPay?: SortOrder
    useDataHookForCashOut?: SortOrder
    dataHook?: SortOrderInput | SortOrder
    metadata?: SortOrder
    metadataExtra?: SortOrderInput | SortOrder
    mustStartAtOrAfter?: SortOrderInput | SortOrder
    caller?: SortOrder
    approvalStatus?: SortOrderInput | SortOrder
    _count?: RulesetCountOrderByAggregateInput
    _avg?: RulesetAvgOrderByAggregateInput
    _max?: RulesetMaxOrderByAggregateInput
    _min?: RulesetMinOrderByAggregateInput
    _sum?: RulesetSumOrderByAggregateInput
  }

  export type RulesetScalarWhereWithAggregatesInput = {
    AND?: RulesetScalarWhereWithAggregatesInput | RulesetScalarWhereWithAggregatesInput[]
    OR?: RulesetScalarWhereWithAggregatesInput[]
    NOT?: RulesetScalarWhereWithAggregatesInput | RulesetScalarWhereWithAggregatesInput[]
    chainId?: IntWithAggregatesFilter<"Ruleset"> | number
    projectId?: IntWithAggregatesFilter<"Ruleset"> | number
    rulesetId?: BigIntWithAggregatesFilter<"Ruleset"> | bigint | number
    createdAt?: IntWithAggregatesFilter<"Ruleset"> | number
    queuedAt?: IntWithAggregatesFilter<"Ruleset"> | number
    cycleNumber?: IntWithAggregatesFilter<"Ruleset"> | number
    basedOnId?: BigIntWithAggregatesFilter<"Ruleset"> | bigint | number
    start?: BigIntWithAggregatesFilter<"Ruleset"> | bigint | number
    duration?: BigIntWithAggregatesFilter<"Ruleset"> | bigint | number
    weight?: BigIntWithAggregatesFilter<"Ruleset"> | bigint | number
    weightCutPercent?: IntWithAggregatesFilter<"Ruleset"> | number
    approvalHook?: StringNullableWithAggregatesFilter<"Ruleset"> | string | null
    reservedPercent?: IntWithAggregatesFilter<"Ruleset"> | number
    cashOutTaxRate?: IntWithAggregatesFilter<"Ruleset"> | number
    baseCurrency?: IntWithAggregatesFilter<"Ruleset"> | number
    pausePay?: BoolWithAggregatesFilter<"Ruleset"> | boolean
    pauseCreditTransfers?: BoolWithAggregatesFilter<"Ruleset"> | boolean
    allowOwnerMinting?: BoolWithAggregatesFilter<"Ruleset"> | boolean
    allowSetCustomToken?: BoolWithAggregatesFilter<"Ruleset"> | boolean
    allowTerminalMigration?: BoolWithAggregatesFilter<"Ruleset"> | boolean
    allowSetTerminals?: BoolWithAggregatesFilter<"Ruleset"> | boolean
    allowSetController?: BoolWithAggregatesFilter<"Ruleset"> | boolean
    allowAddAccountingContext?: BoolWithAggregatesFilter<"Ruleset"> | boolean
    allowAddPriceFeed?: BoolWithAggregatesFilter<"Ruleset"> | boolean
    ownerMustSendPayouts?: BoolWithAggregatesFilter<"Ruleset"> | boolean
    holdFees?: BoolWithAggregatesFilter<"Ruleset"> | boolean
    useTotalSurplusForCashOuts?: BoolWithAggregatesFilter<"Ruleset"> | boolean
    useDataHookForPay?: BoolWithAggregatesFilter<"Ruleset"> | boolean
    useDataHookForCashOut?: BoolWithAggregatesFilter<"Ruleset"> | boolean
    dataHook?: StringNullableWithAggregatesFilter<"Ruleset"> | string | null
    metadata?: BigIntWithAggregatesFilter<"Ruleset"> | bigint | number
    metadataExtra?: IntNullableWithAggregatesFilter<"Ruleset"> | number | null
    mustStartAtOrAfter?: BigIntNullableWithAggregatesFilter<"Ruleset"> | bigint | number | null
    caller?: StringWithAggregatesFilter<"Ruleset"> | string
    approvalStatus?: StringNullableWithAggregatesFilter<"Ruleset"> | string | null
  }

  export type ProjectCreateInput = {
    chainId: number
    createdAt: number
    projectId: number
    paymentsCount?: number
    balance?: bigint | number
    isRevnet: boolean
    deployer: string
    owner: string
    erc20?: string | null
    erc20Supply?: bigint | number
    erc20Name?: string | null
    erc20Symbol?: string | null
    cashoutA?: bigint | number
    cashoutB?: bigint | number
    currentRulesetId?: bigint | number
    contributorsCount?: number
    redeemCount?: number
    redeemVolume?: bigint | number
    pendingReservedTokens?: bigint | number
    metadataUri?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    name?: string | null
    infoUri?: string | null
    logoUri?: string | null
    coverImageUri?: string | null
    twitter?: string | null
    discord?: string | null
    telegram?: string | null
    tokens?: ProjectCreatetokensInput | string[]
    domain?: string | null
    description?: string | null
    tags?: ProjectCreatetagsInput | string[]
    projectTagline?: string | null
    participants?: ParticipantCreateNestedManyWithoutProjectInput
    rulesets?: RulesetCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    chainId: number
    createdAt: number
    projectId: number
    paymentsCount?: number
    balance?: bigint | number
    isRevnet: boolean
    deployer: string
    owner: string
    erc20?: string | null
    erc20Supply?: bigint | number
    erc20Name?: string | null
    erc20Symbol?: string | null
    cashoutA?: bigint | number
    cashoutB?: bigint | number
    currentRulesetId?: bigint | number
    contributorsCount?: number
    redeemCount?: number
    redeemVolume?: bigint | number
    pendingReservedTokens?: bigint | number
    metadataUri?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    name?: string | null
    infoUri?: string | null
    logoUri?: string | null
    coverImageUri?: string | null
    twitter?: string | null
    discord?: string | null
    telegram?: string | null
    tokens?: ProjectCreatetokensInput | string[]
    domain?: string | null
    description?: string | null
    tags?: ProjectCreatetagsInput | string[]
    projectTagline?: string | null
    participants?: ParticipantUncheckedCreateNestedManyWithoutProjectInput
    rulesets?: RulesetUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    chainId?: IntFieldUpdateOperationsInput | number
    createdAt?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    paymentsCount?: IntFieldUpdateOperationsInput | number
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    isRevnet?: BoolFieldUpdateOperationsInput | boolean
    deployer?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    erc20?: NullableStringFieldUpdateOperationsInput | string | null
    erc20Supply?: BigIntFieldUpdateOperationsInput | bigint | number
    erc20Name?: NullableStringFieldUpdateOperationsInput | string | null
    erc20Symbol?: NullableStringFieldUpdateOperationsInput | string | null
    cashoutA?: BigIntFieldUpdateOperationsInput | bigint | number
    cashoutB?: BigIntFieldUpdateOperationsInput | bigint | number
    currentRulesetId?: BigIntFieldUpdateOperationsInput | bigint | number
    contributorsCount?: IntFieldUpdateOperationsInput | number
    redeemCount?: IntFieldUpdateOperationsInput | number
    redeemVolume?: BigIntFieldUpdateOperationsInput | bigint | number
    pendingReservedTokens?: BigIntFieldUpdateOperationsInput | bigint | number
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    name?: NullableStringFieldUpdateOperationsInput | string | null
    infoUri?: NullableStringFieldUpdateOperationsInput | string | null
    logoUri?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUri?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    discord?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    tokens?: ProjectUpdatetokensInput | string[]
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProjectUpdatetagsInput | string[]
    projectTagline?: NullableStringFieldUpdateOperationsInput | string | null
    participants?: ParticipantUpdateManyWithoutProjectNestedInput
    rulesets?: RulesetUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    chainId?: IntFieldUpdateOperationsInput | number
    createdAt?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    paymentsCount?: IntFieldUpdateOperationsInput | number
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    isRevnet?: BoolFieldUpdateOperationsInput | boolean
    deployer?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    erc20?: NullableStringFieldUpdateOperationsInput | string | null
    erc20Supply?: BigIntFieldUpdateOperationsInput | bigint | number
    erc20Name?: NullableStringFieldUpdateOperationsInput | string | null
    erc20Symbol?: NullableStringFieldUpdateOperationsInput | string | null
    cashoutA?: BigIntFieldUpdateOperationsInput | bigint | number
    cashoutB?: BigIntFieldUpdateOperationsInput | bigint | number
    currentRulesetId?: BigIntFieldUpdateOperationsInput | bigint | number
    contributorsCount?: IntFieldUpdateOperationsInput | number
    redeemCount?: IntFieldUpdateOperationsInput | number
    redeemVolume?: BigIntFieldUpdateOperationsInput | bigint | number
    pendingReservedTokens?: BigIntFieldUpdateOperationsInput | bigint | number
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    name?: NullableStringFieldUpdateOperationsInput | string | null
    infoUri?: NullableStringFieldUpdateOperationsInput | string | null
    logoUri?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUri?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    discord?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    tokens?: ProjectUpdatetokensInput | string[]
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProjectUpdatetagsInput | string[]
    projectTagline?: NullableStringFieldUpdateOperationsInput | string | null
    participants?: ParticipantUncheckedUpdateManyWithoutProjectNestedInput
    rulesets?: RulesetUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    chainId: number
    createdAt: number
    projectId: number
    paymentsCount?: number
    balance?: bigint | number
    isRevnet: boolean
    deployer: string
    owner: string
    erc20?: string | null
    erc20Supply?: bigint | number
    erc20Name?: string | null
    erc20Symbol?: string | null
    cashoutA?: bigint | number
    cashoutB?: bigint | number
    currentRulesetId?: bigint | number
    contributorsCount?: number
    redeemCount?: number
    redeemVolume?: bigint | number
    pendingReservedTokens?: bigint | number
    metadataUri?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    name?: string | null
    infoUri?: string | null
    logoUri?: string | null
    coverImageUri?: string | null
    twitter?: string | null
    discord?: string | null
    telegram?: string | null
    tokens?: ProjectCreatetokensInput | string[]
    domain?: string | null
    description?: string | null
    tags?: ProjectCreatetagsInput | string[]
    projectTagline?: string | null
  }

  export type ProjectUpdateManyMutationInput = {
    chainId?: IntFieldUpdateOperationsInput | number
    createdAt?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    paymentsCount?: IntFieldUpdateOperationsInput | number
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    isRevnet?: BoolFieldUpdateOperationsInput | boolean
    deployer?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    erc20?: NullableStringFieldUpdateOperationsInput | string | null
    erc20Supply?: BigIntFieldUpdateOperationsInput | bigint | number
    erc20Name?: NullableStringFieldUpdateOperationsInput | string | null
    erc20Symbol?: NullableStringFieldUpdateOperationsInput | string | null
    cashoutA?: BigIntFieldUpdateOperationsInput | bigint | number
    cashoutB?: BigIntFieldUpdateOperationsInput | bigint | number
    currentRulesetId?: BigIntFieldUpdateOperationsInput | bigint | number
    contributorsCount?: IntFieldUpdateOperationsInput | number
    redeemCount?: IntFieldUpdateOperationsInput | number
    redeemVolume?: BigIntFieldUpdateOperationsInput | bigint | number
    pendingReservedTokens?: BigIntFieldUpdateOperationsInput | bigint | number
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    name?: NullableStringFieldUpdateOperationsInput | string | null
    infoUri?: NullableStringFieldUpdateOperationsInput | string | null
    logoUri?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUri?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    discord?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    tokens?: ProjectUpdatetokensInput | string[]
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProjectUpdatetagsInput | string[]
    projectTagline?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProjectUncheckedUpdateManyInput = {
    chainId?: IntFieldUpdateOperationsInput | number
    createdAt?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    paymentsCount?: IntFieldUpdateOperationsInput | number
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    isRevnet?: BoolFieldUpdateOperationsInput | boolean
    deployer?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    erc20?: NullableStringFieldUpdateOperationsInput | string | null
    erc20Supply?: BigIntFieldUpdateOperationsInput | bigint | number
    erc20Name?: NullableStringFieldUpdateOperationsInput | string | null
    erc20Symbol?: NullableStringFieldUpdateOperationsInput | string | null
    cashoutA?: BigIntFieldUpdateOperationsInput | bigint | number
    cashoutB?: BigIntFieldUpdateOperationsInput | bigint | number
    currentRulesetId?: BigIntFieldUpdateOperationsInput | bigint | number
    contributorsCount?: IntFieldUpdateOperationsInput | number
    redeemCount?: IntFieldUpdateOperationsInput | number
    redeemVolume?: BigIntFieldUpdateOperationsInput | bigint | number
    pendingReservedTokens?: BigIntFieldUpdateOperationsInput | bigint | number
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    name?: NullableStringFieldUpdateOperationsInput | string | null
    infoUri?: NullableStringFieldUpdateOperationsInput | string | null
    logoUri?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUri?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    discord?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    tokens?: ProjectUpdatetokensInput | string[]
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProjectUpdatetagsInput | string[]
    projectTagline?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ParticipantCreateInput = {
    createdAt: number
    balance?: bigint | number
    isRevnet?: boolean | null
    address: string
    firstOwned?: number | null
    cashOutValue?: bigint | number
    project: ProjectCreateNestedOneWithoutParticipantsInput
  }

  export type ParticipantUncheckedCreateInput = {
    chainId: number
    projectId: number
    createdAt: number
    balance?: bigint | number
    isRevnet?: boolean | null
    address: string
    firstOwned?: number | null
    cashOutValue?: bigint | number
  }

  export type ParticipantUpdateInput = {
    createdAt?: IntFieldUpdateOperationsInput | number
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    isRevnet?: NullableBoolFieldUpdateOperationsInput | boolean | null
    address?: StringFieldUpdateOperationsInput | string
    firstOwned?: NullableIntFieldUpdateOperationsInput | number | null
    cashOutValue?: BigIntFieldUpdateOperationsInput | bigint | number
    project?: ProjectUpdateOneRequiredWithoutParticipantsNestedInput
  }

  export type ParticipantUncheckedUpdateInput = {
    chainId?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    createdAt?: IntFieldUpdateOperationsInput | number
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    isRevnet?: NullableBoolFieldUpdateOperationsInput | boolean | null
    address?: StringFieldUpdateOperationsInput | string
    firstOwned?: NullableIntFieldUpdateOperationsInput | number | null
    cashOutValue?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type ParticipantCreateManyInput = {
    chainId: number
    projectId: number
    createdAt: number
    balance?: bigint | number
    isRevnet?: boolean | null
    address: string
    firstOwned?: number | null
    cashOutValue?: bigint | number
  }

  export type ParticipantUpdateManyMutationInput = {
    createdAt?: IntFieldUpdateOperationsInput | number
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    isRevnet?: NullableBoolFieldUpdateOperationsInput | boolean | null
    address?: StringFieldUpdateOperationsInput | string
    firstOwned?: NullableIntFieldUpdateOperationsInput | number | null
    cashOutValue?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type ParticipantUncheckedUpdateManyInput = {
    chainId?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    createdAt?: IntFieldUpdateOperationsInput | number
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    isRevnet?: NullableBoolFieldUpdateOperationsInput | boolean | null
    address?: StringFieldUpdateOperationsInput | string
    firstOwned?: NullableIntFieldUpdateOperationsInput | number | null
    cashOutValue?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type RulesetCreateInput = {
    rulesetId: bigint | number
    createdAt: number
    queuedAt: number
    cycleNumber: number
    basedOnId: bigint | number
    start: bigint | number
    duration: bigint | number
    weight: bigint | number
    weightCutPercent: number
    approvalHook?: string | null
    reservedPercent: number
    cashOutTaxRate: number
    baseCurrency: number
    pausePay: boolean
    pauseCreditTransfers: boolean
    allowOwnerMinting: boolean
    allowSetCustomToken: boolean
    allowTerminalMigration: boolean
    allowSetTerminals: boolean
    allowSetController: boolean
    allowAddAccountingContext: boolean
    allowAddPriceFeed: boolean
    ownerMustSendPayouts: boolean
    holdFees: boolean
    useTotalSurplusForCashOuts: boolean
    useDataHookForPay: boolean
    useDataHookForCashOut: boolean
    dataHook?: string | null
    metadata: bigint | number
    metadataExtra?: number | null
    mustStartAtOrAfter?: bigint | number | null
    caller: string
    approvalStatus?: string | null
    project: ProjectCreateNestedOneWithoutRulesetsInput
  }

  export type RulesetUncheckedCreateInput = {
    chainId: number
    projectId: number
    rulesetId: bigint | number
    createdAt: number
    queuedAt: number
    cycleNumber: number
    basedOnId: bigint | number
    start: bigint | number
    duration: bigint | number
    weight: bigint | number
    weightCutPercent: number
    approvalHook?: string | null
    reservedPercent: number
    cashOutTaxRate: number
    baseCurrency: number
    pausePay: boolean
    pauseCreditTransfers: boolean
    allowOwnerMinting: boolean
    allowSetCustomToken: boolean
    allowTerminalMigration: boolean
    allowSetTerminals: boolean
    allowSetController: boolean
    allowAddAccountingContext: boolean
    allowAddPriceFeed: boolean
    ownerMustSendPayouts: boolean
    holdFees: boolean
    useTotalSurplusForCashOuts: boolean
    useDataHookForPay: boolean
    useDataHookForCashOut: boolean
    dataHook?: string | null
    metadata: bigint | number
    metadataExtra?: number | null
    mustStartAtOrAfter?: bigint | number | null
    caller: string
    approvalStatus?: string | null
  }

  export type RulesetUpdateInput = {
    rulesetId?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: IntFieldUpdateOperationsInput | number
    queuedAt?: IntFieldUpdateOperationsInput | number
    cycleNumber?: IntFieldUpdateOperationsInput | number
    basedOnId?: BigIntFieldUpdateOperationsInput | bigint | number
    start?: BigIntFieldUpdateOperationsInput | bigint | number
    duration?: BigIntFieldUpdateOperationsInput | bigint | number
    weight?: BigIntFieldUpdateOperationsInput | bigint | number
    weightCutPercent?: IntFieldUpdateOperationsInput | number
    approvalHook?: NullableStringFieldUpdateOperationsInput | string | null
    reservedPercent?: IntFieldUpdateOperationsInput | number
    cashOutTaxRate?: IntFieldUpdateOperationsInput | number
    baseCurrency?: IntFieldUpdateOperationsInput | number
    pausePay?: BoolFieldUpdateOperationsInput | boolean
    pauseCreditTransfers?: BoolFieldUpdateOperationsInput | boolean
    allowOwnerMinting?: BoolFieldUpdateOperationsInput | boolean
    allowSetCustomToken?: BoolFieldUpdateOperationsInput | boolean
    allowTerminalMigration?: BoolFieldUpdateOperationsInput | boolean
    allowSetTerminals?: BoolFieldUpdateOperationsInput | boolean
    allowSetController?: BoolFieldUpdateOperationsInput | boolean
    allowAddAccountingContext?: BoolFieldUpdateOperationsInput | boolean
    allowAddPriceFeed?: BoolFieldUpdateOperationsInput | boolean
    ownerMustSendPayouts?: BoolFieldUpdateOperationsInput | boolean
    holdFees?: BoolFieldUpdateOperationsInput | boolean
    useTotalSurplusForCashOuts?: BoolFieldUpdateOperationsInput | boolean
    useDataHookForPay?: BoolFieldUpdateOperationsInput | boolean
    useDataHookForCashOut?: BoolFieldUpdateOperationsInput | boolean
    dataHook?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: BigIntFieldUpdateOperationsInput | bigint | number
    metadataExtra?: NullableIntFieldUpdateOperationsInput | number | null
    mustStartAtOrAfter?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    caller?: StringFieldUpdateOperationsInput | string
    approvalStatus?: NullableStringFieldUpdateOperationsInput | string | null
    project?: ProjectUpdateOneRequiredWithoutRulesetsNestedInput
  }

  export type RulesetUncheckedUpdateInput = {
    chainId?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    rulesetId?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: IntFieldUpdateOperationsInput | number
    queuedAt?: IntFieldUpdateOperationsInput | number
    cycleNumber?: IntFieldUpdateOperationsInput | number
    basedOnId?: BigIntFieldUpdateOperationsInput | bigint | number
    start?: BigIntFieldUpdateOperationsInput | bigint | number
    duration?: BigIntFieldUpdateOperationsInput | bigint | number
    weight?: BigIntFieldUpdateOperationsInput | bigint | number
    weightCutPercent?: IntFieldUpdateOperationsInput | number
    approvalHook?: NullableStringFieldUpdateOperationsInput | string | null
    reservedPercent?: IntFieldUpdateOperationsInput | number
    cashOutTaxRate?: IntFieldUpdateOperationsInput | number
    baseCurrency?: IntFieldUpdateOperationsInput | number
    pausePay?: BoolFieldUpdateOperationsInput | boolean
    pauseCreditTransfers?: BoolFieldUpdateOperationsInput | boolean
    allowOwnerMinting?: BoolFieldUpdateOperationsInput | boolean
    allowSetCustomToken?: BoolFieldUpdateOperationsInput | boolean
    allowTerminalMigration?: BoolFieldUpdateOperationsInput | boolean
    allowSetTerminals?: BoolFieldUpdateOperationsInput | boolean
    allowSetController?: BoolFieldUpdateOperationsInput | boolean
    allowAddAccountingContext?: BoolFieldUpdateOperationsInput | boolean
    allowAddPriceFeed?: BoolFieldUpdateOperationsInput | boolean
    ownerMustSendPayouts?: BoolFieldUpdateOperationsInput | boolean
    holdFees?: BoolFieldUpdateOperationsInput | boolean
    useTotalSurplusForCashOuts?: BoolFieldUpdateOperationsInput | boolean
    useDataHookForPay?: BoolFieldUpdateOperationsInput | boolean
    useDataHookForCashOut?: BoolFieldUpdateOperationsInput | boolean
    dataHook?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: BigIntFieldUpdateOperationsInput | bigint | number
    metadataExtra?: NullableIntFieldUpdateOperationsInput | number | null
    mustStartAtOrAfter?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    caller?: StringFieldUpdateOperationsInput | string
    approvalStatus?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RulesetCreateManyInput = {
    chainId: number
    projectId: number
    rulesetId: bigint | number
    createdAt: number
    queuedAt: number
    cycleNumber: number
    basedOnId: bigint | number
    start: bigint | number
    duration: bigint | number
    weight: bigint | number
    weightCutPercent: number
    approvalHook?: string | null
    reservedPercent: number
    cashOutTaxRate: number
    baseCurrency: number
    pausePay: boolean
    pauseCreditTransfers: boolean
    allowOwnerMinting: boolean
    allowSetCustomToken: boolean
    allowTerminalMigration: boolean
    allowSetTerminals: boolean
    allowSetController: boolean
    allowAddAccountingContext: boolean
    allowAddPriceFeed: boolean
    ownerMustSendPayouts: boolean
    holdFees: boolean
    useTotalSurplusForCashOuts: boolean
    useDataHookForPay: boolean
    useDataHookForCashOut: boolean
    dataHook?: string | null
    metadata: bigint | number
    metadataExtra?: number | null
    mustStartAtOrAfter?: bigint | number | null
    caller: string
    approvalStatus?: string | null
  }

  export type RulesetUpdateManyMutationInput = {
    rulesetId?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: IntFieldUpdateOperationsInput | number
    queuedAt?: IntFieldUpdateOperationsInput | number
    cycleNumber?: IntFieldUpdateOperationsInput | number
    basedOnId?: BigIntFieldUpdateOperationsInput | bigint | number
    start?: BigIntFieldUpdateOperationsInput | bigint | number
    duration?: BigIntFieldUpdateOperationsInput | bigint | number
    weight?: BigIntFieldUpdateOperationsInput | bigint | number
    weightCutPercent?: IntFieldUpdateOperationsInput | number
    approvalHook?: NullableStringFieldUpdateOperationsInput | string | null
    reservedPercent?: IntFieldUpdateOperationsInput | number
    cashOutTaxRate?: IntFieldUpdateOperationsInput | number
    baseCurrency?: IntFieldUpdateOperationsInput | number
    pausePay?: BoolFieldUpdateOperationsInput | boolean
    pauseCreditTransfers?: BoolFieldUpdateOperationsInput | boolean
    allowOwnerMinting?: BoolFieldUpdateOperationsInput | boolean
    allowSetCustomToken?: BoolFieldUpdateOperationsInput | boolean
    allowTerminalMigration?: BoolFieldUpdateOperationsInput | boolean
    allowSetTerminals?: BoolFieldUpdateOperationsInput | boolean
    allowSetController?: BoolFieldUpdateOperationsInput | boolean
    allowAddAccountingContext?: BoolFieldUpdateOperationsInput | boolean
    allowAddPriceFeed?: BoolFieldUpdateOperationsInput | boolean
    ownerMustSendPayouts?: BoolFieldUpdateOperationsInput | boolean
    holdFees?: BoolFieldUpdateOperationsInput | boolean
    useTotalSurplusForCashOuts?: BoolFieldUpdateOperationsInput | boolean
    useDataHookForPay?: BoolFieldUpdateOperationsInput | boolean
    useDataHookForCashOut?: BoolFieldUpdateOperationsInput | boolean
    dataHook?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: BigIntFieldUpdateOperationsInput | bigint | number
    metadataExtra?: NullableIntFieldUpdateOperationsInput | number | null
    mustStartAtOrAfter?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    caller?: StringFieldUpdateOperationsInput | string
    approvalStatus?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RulesetUncheckedUpdateManyInput = {
    chainId?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    rulesetId?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: IntFieldUpdateOperationsInput | number
    queuedAt?: IntFieldUpdateOperationsInput | number
    cycleNumber?: IntFieldUpdateOperationsInput | number
    basedOnId?: BigIntFieldUpdateOperationsInput | bigint | number
    start?: BigIntFieldUpdateOperationsInput | bigint | number
    duration?: BigIntFieldUpdateOperationsInput | bigint | number
    weight?: BigIntFieldUpdateOperationsInput | bigint | number
    weightCutPercent?: IntFieldUpdateOperationsInput | number
    approvalHook?: NullableStringFieldUpdateOperationsInput | string | null
    reservedPercent?: IntFieldUpdateOperationsInput | number
    cashOutTaxRate?: IntFieldUpdateOperationsInput | number
    baseCurrency?: IntFieldUpdateOperationsInput | number
    pausePay?: BoolFieldUpdateOperationsInput | boolean
    pauseCreditTransfers?: BoolFieldUpdateOperationsInput | boolean
    allowOwnerMinting?: BoolFieldUpdateOperationsInput | boolean
    allowSetCustomToken?: BoolFieldUpdateOperationsInput | boolean
    allowTerminalMigration?: BoolFieldUpdateOperationsInput | boolean
    allowSetTerminals?: BoolFieldUpdateOperationsInput | boolean
    allowSetController?: BoolFieldUpdateOperationsInput | boolean
    allowAddAccountingContext?: BoolFieldUpdateOperationsInput | boolean
    allowAddPriceFeed?: BoolFieldUpdateOperationsInput | boolean
    ownerMustSendPayouts?: BoolFieldUpdateOperationsInput | boolean
    holdFees?: BoolFieldUpdateOperationsInput | boolean
    useTotalSurplusForCashOuts?: BoolFieldUpdateOperationsInput | boolean
    useDataHookForPay?: BoolFieldUpdateOperationsInput | boolean
    useDataHookForCashOut?: BoolFieldUpdateOperationsInput | boolean
    dataHook?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: BigIntFieldUpdateOperationsInput | bigint | number
    metadataExtra?: NullableIntFieldUpdateOperationsInput | number | null
    mustStartAtOrAfter?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    caller?: StringFieldUpdateOperationsInput | string
    approvalStatus?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ParticipantListRelationFilter = {
    every?: ParticipantWhereInput
    some?: ParticipantWhereInput
    none?: ParticipantWhereInput
  }

  export type RulesetListRelationFilter = {
    every?: RulesetWhereInput
    some?: RulesetWhereInput
    none?: RulesetWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ParticipantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RulesetOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectChainIdProjectIdCompoundUniqueInput = {
    chainId: number
    projectId: number
  }

  export type ProjectCountOrderByAggregateInput = {
    chainId?: SortOrder
    createdAt?: SortOrder
    projectId?: SortOrder
    paymentsCount?: SortOrder
    balance?: SortOrder
    isRevnet?: SortOrder
    deployer?: SortOrder
    owner?: SortOrder
    erc20?: SortOrder
    erc20Supply?: SortOrder
    erc20Name?: SortOrder
    erc20Symbol?: SortOrder
    cashoutA?: SortOrder
    cashoutB?: SortOrder
    currentRulesetId?: SortOrder
    contributorsCount?: SortOrder
    redeemCount?: SortOrder
    redeemVolume?: SortOrder
    pendingReservedTokens?: SortOrder
    metadataUri?: SortOrder
    metadata?: SortOrder
    name?: SortOrder
    infoUri?: SortOrder
    logoUri?: SortOrder
    coverImageUri?: SortOrder
    twitter?: SortOrder
    discord?: SortOrder
    telegram?: SortOrder
    tokens?: SortOrder
    domain?: SortOrder
    description?: SortOrder
    tags?: SortOrder
    projectTagline?: SortOrder
  }

  export type ProjectAvgOrderByAggregateInput = {
    chainId?: SortOrder
    createdAt?: SortOrder
    projectId?: SortOrder
    paymentsCount?: SortOrder
    balance?: SortOrder
    erc20Supply?: SortOrder
    cashoutA?: SortOrder
    cashoutB?: SortOrder
    currentRulesetId?: SortOrder
    contributorsCount?: SortOrder
    redeemCount?: SortOrder
    redeemVolume?: SortOrder
    pendingReservedTokens?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    chainId?: SortOrder
    createdAt?: SortOrder
    projectId?: SortOrder
    paymentsCount?: SortOrder
    balance?: SortOrder
    isRevnet?: SortOrder
    deployer?: SortOrder
    owner?: SortOrder
    erc20?: SortOrder
    erc20Supply?: SortOrder
    erc20Name?: SortOrder
    erc20Symbol?: SortOrder
    cashoutA?: SortOrder
    cashoutB?: SortOrder
    currentRulesetId?: SortOrder
    contributorsCount?: SortOrder
    redeemCount?: SortOrder
    redeemVolume?: SortOrder
    pendingReservedTokens?: SortOrder
    metadataUri?: SortOrder
    name?: SortOrder
    infoUri?: SortOrder
    logoUri?: SortOrder
    coverImageUri?: SortOrder
    twitter?: SortOrder
    discord?: SortOrder
    telegram?: SortOrder
    domain?: SortOrder
    description?: SortOrder
    projectTagline?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    chainId?: SortOrder
    createdAt?: SortOrder
    projectId?: SortOrder
    paymentsCount?: SortOrder
    balance?: SortOrder
    isRevnet?: SortOrder
    deployer?: SortOrder
    owner?: SortOrder
    erc20?: SortOrder
    erc20Supply?: SortOrder
    erc20Name?: SortOrder
    erc20Symbol?: SortOrder
    cashoutA?: SortOrder
    cashoutB?: SortOrder
    currentRulesetId?: SortOrder
    contributorsCount?: SortOrder
    redeemCount?: SortOrder
    redeemVolume?: SortOrder
    pendingReservedTokens?: SortOrder
    metadataUri?: SortOrder
    name?: SortOrder
    infoUri?: SortOrder
    logoUri?: SortOrder
    coverImageUri?: SortOrder
    twitter?: SortOrder
    discord?: SortOrder
    telegram?: SortOrder
    domain?: SortOrder
    description?: SortOrder
    projectTagline?: SortOrder
  }

  export type ProjectSumOrderByAggregateInput = {
    chainId?: SortOrder
    createdAt?: SortOrder
    projectId?: SortOrder
    paymentsCount?: SortOrder
    balance?: SortOrder
    erc20Supply?: SortOrder
    cashoutA?: SortOrder
    cashoutB?: SortOrder
    currentRulesetId?: SortOrder
    contributorsCount?: SortOrder
    redeemCount?: SortOrder
    redeemVolume?: SortOrder
    pendingReservedTokens?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ProjectScalarRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type ParticipantChainIdProjectIdAddressCompoundUniqueInput = {
    chainId: number
    projectId: number
    address: string
  }

  export type ParticipantCountOrderByAggregateInput = {
    chainId?: SortOrder
    projectId?: SortOrder
    createdAt?: SortOrder
    balance?: SortOrder
    isRevnet?: SortOrder
    address?: SortOrder
    firstOwned?: SortOrder
    cashOutValue?: SortOrder
  }

  export type ParticipantAvgOrderByAggregateInput = {
    chainId?: SortOrder
    projectId?: SortOrder
    createdAt?: SortOrder
    balance?: SortOrder
    firstOwned?: SortOrder
    cashOutValue?: SortOrder
  }

  export type ParticipantMaxOrderByAggregateInput = {
    chainId?: SortOrder
    projectId?: SortOrder
    createdAt?: SortOrder
    balance?: SortOrder
    isRevnet?: SortOrder
    address?: SortOrder
    firstOwned?: SortOrder
    cashOutValue?: SortOrder
  }

  export type ParticipantMinOrderByAggregateInput = {
    chainId?: SortOrder
    projectId?: SortOrder
    createdAt?: SortOrder
    balance?: SortOrder
    isRevnet?: SortOrder
    address?: SortOrder
    firstOwned?: SortOrder
    cashOutValue?: SortOrder
  }

  export type ParticipantSumOrderByAggregateInput = {
    chainId?: SortOrder
    projectId?: SortOrder
    createdAt?: SortOrder
    balance?: SortOrder
    firstOwned?: SortOrder
    cashOutValue?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type RulesetChainIdProjectIdRulesetIdCompoundUniqueInput = {
    chainId: number
    projectId: number
    rulesetId: bigint | number
  }

  export type RulesetCountOrderByAggregateInput = {
    chainId?: SortOrder
    projectId?: SortOrder
    rulesetId?: SortOrder
    createdAt?: SortOrder
    queuedAt?: SortOrder
    cycleNumber?: SortOrder
    basedOnId?: SortOrder
    start?: SortOrder
    duration?: SortOrder
    weight?: SortOrder
    weightCutPercent?: SortOrder
    approvalHook?: SortOrder
    reservedPercent?: SortOrder
    cashOutTaxRate?: SortOrder
    baseCurrency?: SortOrder
    pausePay?: SortOrder
    pauseCreditTransfers?: SortOrder
    allowOwnerMinting?: SortOrder
    allowSetCustomToken?: SortOrder
    allowTerminalMigration?: SortOrder
    allowSetTerminals?: SortOrder
    allowSetController?: SortOrder
    allowAddAccountingContext?: SortOrder
    allowAddPriceFeed?: SortOrder
    ownerMustSendPayouts?: SortOrder
    holdFees?: SortOrder
    useTotalSurplusForCashOuts?: SortOrder
    useDataHookForPay?: SortOrder
    useDataHookForCashOut?: SortOrder
    dataHook?: SortOrder
    metadata?: SortOrder
    metadataExtra?: SortOrder
    mustStartAtOrAfter?: SortOrder
    caller?: SortOrder
    approvalStatus?: SortOrder
  }

  export type RulesetAvgOrderByAggregateInput = {
    chainId?: SortOrder
    projectId?: SortOrder
    rulesetId?: SortOrder
    createdAt?: SortOrder
    queuedAt?: SortOrder
    cycleNumber?: SortOrder
    basedOnId?: SortOrder
    start?: SortOrder
    duration?: SortOrder
    weight?: SortOrder
    weightCutPercent?: SortOrder
    reservedPercent?: SortOrder
    cashOutTaxRate?: SortOrder
    baseCurrency?: SortOrder
    metadata?: SortOrder
    metadataExtra?: SortOrder
    mustStartAtOrAfter?: SortOrder
  }

  export type RulesetMaxOrderByAggregateInput = {
    chainId?: SortOrder
    projectId?: SortOrder
    rulesetId?: SortOrder
    createdAt?: SortOrder
    queuedAt?: SortOrder
    cycleNumber?: SortOrder
    basedOnId?: SortOrder
    start?: SortOrder
    duration?: SortOrder
    weight?: SortOrder
    weightCutPercent?: SortOrder
    approvalHook?: SortOrder
    reservedPercent?: SortOrder
    cashOutTaxRate?: SortOrder
    baseCurrency?: SortOrder
    pausePay?: SortOrder
    pauseCreditTransfers?: SortOrder
    allowOwnerMinting?: SortOrder
    allowSetCustomToken?: SortOrder
    allowTerminalMigration?: SortOrder
    allowSetTerminals?: SortOrder
    allowSetController?: SortOrder
    allowAddAccountingContext?: SortOrder
    allowAddPriceFeed?: SortOrder
    ownerMustSendPayouts?: SortOrder
    holdFees?: SortOrder
    useTotalSurplusForCashOuts?: SortOrder
    useDataHookForPay?: SortOrder
    useDataHookForCashOut?: SortOrder
    dataHook?: SortOrder
    metadata?: SortOrder
    metadataExtra?: SortOrder
    mustStartAtOrAfter?: SortOrder
    caller?: SortOrder
    approvalStatus?: SortOrder
  }

  export type RulesetMinOrderByAggregateInput = {
    chainId?: SortOrder
    projectId?: SortOrder
    rulesetId?: SortOrder
    createdAt?: SortOrder
    queuedAt?: SortOrder
    cycleNumber?: SortOrder
    basedOnId?: SortOrder
    start?: SortOrder
    duration?: SortOrder
    weight?: SortOrder
    weightCutPercent?: SortOrder
    approvalHook?: SortOrder
    reservedPercent?: SortOrder
    cashOutTaxRate?: SortOrder
    baseCurrency?: SortOrder
    pausePay?: SortOrder
    pauseCreditTransfers?: SortOrder
    allowOwnerMinting?: SortOrder
    allowSetCustomToken?: SortOrder
    allowTerminalMigration?: SortOrder
    allowSetTerminals?: SortOrder
    allowSetController?: SortOrder
    allowAddAccountingContext?: SortOrder
    allowAddPriceFeed?: SortOrder
    ownerMustSendPayouts?: SortOrder
    holdFees?: SortOrder
    useTotalSurplusForCashOuts?: SortOrder
    useDataHookForPay?: SortOrder
    useDataHookForCashOut?: SortOrder
    dataHook?: SortOrder
    metadata?: SortOrder
    metadataExtra?: SortOrder
    mustStartAtOrAfter?: SortOrder
    caller?: SortOrder
    approvalStatus?: SortOrder
  }

  export type RulesetSumOrderByAggregateInput = {
    chainId?: SortOrder
    projectId?: SortOrder
    rulesetId?: SortOrder
    createdAt?: SortOrder
    queuedAt?: SortOrder
    cycleNumber?: SortOrder
    basedOnId?: SortOrder
    start?: SortOrder
    duration?: SortOrder
    weight?: SortOrder
    weightCutPercent?: SortOrder
    reservedPercent?: SortOrder
    cashOutTaxRate?: SortOrder
    baseCurrency?: SortOrder
    metadata?: SortOrder
    metadataExtra?: SortOrder
    mustStartAtOrAfter?: SortOrder
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type ProjectCreatetokensInput = {
    set: string[]
  }

  export type ProjectCreatetagsInput = {
    set: string[]
  }

  export type ParticipantCreateNestedManyWithoutProjectInput = {
    create?: XOR<ParticipantCreateWithoutProjectInput, ParticipantUncheckedCreateWithoutProjectInput> | ParticipantCreateWithoutProjectInput[] | ParticipantUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ParticipantCreateOrConnectWithoutProjectInput | ParticipantCreateOrConnectWithoutProjectInput[]
    createMany?: ParticipantCreateManyProjectInputEnvelope
    connect?: ParticipantWhereUniqueInput | ParticipantWhereUniqueInput[]
  }

  export type RulesetCreateNestedManyWithoutProjectInput = {
    create?: XOR<RulesetCreateWithoutProjectInput, RulesetUncheckedCreateWithoutProjectInput> | RulesetCreateWithoutProjectInput[] | RulesetUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: RulesetCreateOrConnectWithoutProjectInput | RulesetCreateOrConnectWithoutProjectInput[]
    createMany?: RulesetCreateManyProjectInputEnvelope
    connect?: RulesetWhereUniqueInput | RulesetWhereUniqueInput[]
  }

  export type ParticipantUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<ParticipantCreateWithoutProjectInput, ParticipantUncheckedCreateWithoutProjectInput> | ParticipantCreateWithoutProjectInput[] | ParticipantUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ParticipantCreateOrConnectWithoutProjectInput | ParticipantCreateOrConnectWithoutProjectInput[]
    createMany?: ParticipantCreateManyProjectInputEnvelope
    connect?: ParticipantWhereUniqueInput | ParticipantWhereUniqueInput[]
  }

  export type RulesetUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<RulesetCreateWithoutProjectInput, RulesetUncheckedCreateWithoutProjectInput> | RulesetCreateWithoutProjectInput[] | RulesetUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: RulesetCreateOrConnectWithoutProjectInput | RulesetCreateOrConnectWithoutProjectInput[]
    createMany?: RulesetCreateManyProjectInputEnvelope
    connect?: RulesetWhereUniqueInput | RulesetWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ProjectUpdatetokensInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ProjectUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ParticipantUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ParticipantCreateWithoutProjectInput, ParticipantUncheckedCreateWithoutProjectInput> | ParticipantCreateWithoutProjectInput[] | ParticipantUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ParticipantCreateOrConnectWithoutProjectInput | ParticipantCreateOrConnectWithoutProjectInput[]
    upsert?: ParticipantUpsertWithWhereUniqueWithoutProjectInput | ParticipantUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ParticipantCreateManyProjectInputEnvelope
    set?: ParticipantWhereUniqueInput | ParticipantWhereUniqueInput[]
    disconnect?: ParticipantWhereUniqueInput | ParticipantWhereUniqueInput[]
    delete?: ParticipantWhereUniqueInput | ParticipantWhereUniqueInput[]
    connect?: ParticipantWhereUniqueInput | ParticipantWhereUniqueInput[]
    update?: ParticipantUpdateWithWhereUniqueWithoutProjectInput | ParticipantUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ParticipantUpdateManyWithWhereWithoutProjectInput | ParticipantUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ParticipantScalarWhereInput | ParticipantScalarWhereInput[]
  }

  export type RulesetUpdateManyWithoutProjectNestedInput = {
    create?: XOR<RulesetCreateWithoutProjectInput, RulesetUncheckedCreateWithoutProjectInput> | RulesetCreateWithoutProjectInput[] | RulesetUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: RulesetCreateOrConnectWithoutProjectInput | RulesetCreateOrConnectWithoutProjectInput[]
    upsert?: RulesetUpsertWithWhereUniqueWithoutProjectInput | RulesetUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: RulesetCreateManyProjectInputEnvelope
    set?: RulesetWhereUniqueInput | RulesetWhereUniqueInput[]
    disconnect?: RulesetWhereUniqueInput | RulesetWhereUniqueInput[]
    delete?: RulesetWhereUniqueInput | RulesetWhereUniqueInput[]
    connect?: RulesetWhereUniqueInput | RulesetWhereUniqueInput[]
    update?: RulesetUpdateWithWhereUniqueWithoutProjectInput | RulesetUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: RulesetUpdateManyWithWhereWithoutProjectInput | RulesetUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: RulesetScalarWhereInput | RulesetScalarWhereInput[]
  }

  export type ParticipantUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<ParticipantCreateWithoutProjectInput, ParticipantUncheckedCreateWithoutProjectInput> | ParticipantCreateWithoutProjectInput[] | ParticipantUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: ParticipantCreateOrConnectWithoutProjectInput | ParticipantCreateOrConnectWithoutProjectInput[]
    upsert?: ParticipantUpsertWithWhereUniqueWithoutProjectInput | ParticipantUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: ParticipantCreateManyProjectInputEnvelope
    set?: ParticipantWhereUniqueInput | ParticipantWhereUniqueInput[]
    disconnect?: ParticipantWhereUniqueInput | ParticipantWhereUniqueInput[]
    delete?: ParticipantWhereUniqueInput | ParticipantWhereUniqueInput[]
    connect?: ParticipantWhereUniqueInput | ParticipantWhereUniqueInput[]
    update?: ParticipantUpdateWithWhereUniqueWithoutProjectInput | ParticipantUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: ParticipantUpdateManyWithWhereWithoutProjectInput | ParticipantUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: ParticipantScalarWhereInput | ParticipantScalarWhereInput[]
  }

  export type RulesetUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<RulesetCreateWithoutProjectInput, RulesetUncheckedCreateWithoutProjectInput> | RulesetCreateWithoutProjectInput[] | RulesetUncheckedCreateWithoutProjectInput[]
    connectOrCreate?: RulesetCreateOrConnectWithoutProjectInput | RulesetCreateOrConnectWithoutProjectInput[]
    upsert?: RulesetUpsertWithWhereUniqueWithoutProjectInput | RulesetUpsertWithWhereUniqueWithoutProjectInput[]
    createMany?: RulesetCreateManyProjectInputEnvelope
    set?: RulesetWhereUniqueInput | RulesetWhereUniqueInput[]
    disconnect?: RulesetWhereUniqueInput | RulesetWhereUniqueInput[]
    delete?: RulesetWhereUniqueInput | RulesetWhereUniqueInput[]
    connect?: RulesetWhereUniqueInput | RulesetWhereUniqueInput[]
    update?: RulesetUpdateWithWhereUniqueWithoutProjectInput | RulesetUpdateWithWhereUniqueWithoutProjectInput[]
    updateMany?: RulesetUpdateManyWithWhereWithoutProjectInput | RulesetUpdateManyWithWhereWithoutProjectInput[]
    deleteMany?: RulesetScalarWhereInput | RulesetScalarWhereInput[]
  }

  export type ProjectCreateNestedOneWithoutParticipantsInput = {
    create?: XOR<ProjectCreateWithoutParticipantsInput, ProjectUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutParticipantsInput
    connect?: ProjectWhereUniqueInput
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProjectUpdateOneRequiredWithoutParticipantsNestedInput = {
    create?: XOR<ProjectCreateWithoutParticipantsInput, ProjectUncheckedCreateWithoutParticipantsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutParticipantsInput
    upsert?: ProjectUpsertWithoutParticipantsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutParticipantsInput, ProjectUpdateWithoutParticipantsInput>, ProjectUncheckedUpdateWithoutParticipantsInput>
  }

  export type ProjectCreateNestedOneWithoutRulesetsInput = {
    create?: XOR<ProjectCreateWithoutRulesetsInput, ProjectUncheckedCreateWithoutRulesetsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutRulesetsInput
    connect?: ProjectWhereUniqueInput
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type ProjectUpdateOneRequiredWithoutRulesetsNestedInput = {
    create?: XOR<ProjectCreateWithoutRulesetsInput, ProjectUncheckedCreateWithoutRulesetsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutRulesetsInput
    upsert?: ProjectUpsertWithoutRulesetsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<XOR<ProjectUpdateToOneWithWhereWithoutRulesetsInput, ProjectUpdateWithoutRulesetsInput>, ProjectUncheckedUpdateWithoutRulesetsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type ParticipantCreateWithoutProjectInput = {
    createdAt: number
    balance?: bigint | number
    isRevnet?: boolean | null
    address: string
    firstOwned?: number | null
    cashOutValue?: bigint | number
  }

  export type ParticipantUncheckedCreateWithoutProjectInput = {
    createdAt: number
    balance?: bigint | number
    isRevnet?: boolean | null
    address: string
    firstOwned?: number | null
    cashOutValue?: bigint | number
  }

  export type ParticipantCreateOrConnectWithoutProjectInput = {
    where: ParticipantWhereUniqueInput
    create: XOR<ParticipantCreateWithoutProjectInput, ParticipantUncheckedCreateWithoutProjectInput>
  }

  export type ParticipantCreateManyProjectInputEnvelope = {
    data: ParticipantCreateManyProjectInput | ParticipantCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type RulesetCreateWithoutProjectInput = {
    rulesetId: bigint | number
    createdAt: number
    queuedAt: number
    cycleNumber: number
    basedOnId: bigint | number
    start: bigint | number
    duration: bigint | number
    weight: bigint | number
    weightCutPercent: number
    approvalHook?: string | null
    reservedPercent: number
    cashOutTaxRate: number
    baseCurrency: number
    pausePay: boolean
    pauseCreditTransfers: boolean
    allowOwnerMinting: boolean
    allowSetCustomToken: boolean
    allowTerminalMigration: boolean
    allowSetTerminals: boolean
    allowSetController: boolean
    allowAddAccountingContext: boolean
    allowAddPriceFeed: boolean
    ownerMustSendPayouts: boolean
    holdFees: boolean
    useTotalSurplusForCashOuts: boolean
    useDataHookForPay: boolean
    useDataHookForCashOut: boolean
    dataHook?: string | null
    metadata: bigint | number
    metadataExtra?: number | null
    mustStartAtOrAfter?: bigint | number | null
    caller: string
    approvalStatus?: string | null
  }

  export type RulesetUncheckedCreateWithoutProjectInput = {
    rulesetId: bigint | number
    createdAt: number
    queuedAt: number
    cycleNumber: number
    basedOnId: bigint | number
    start: bigint | number
    duration: bigint | number
    weight: bigint | number
    weightCutPercent: number
    approvalHook?: string | null
    reservedPercent: number
    cashOutTaxRate: number
    baseCurrency: number
    pausePay: boolean
    pauseCreditTransfers: boolean
    allowOwnerMinting: boolean
    allowSetCustomToken: boolean
    allowTerminalMigration: boolean
    allowSetTerminals: boolean
    allowSetController: boolean
    allowAddAccountingContext: boolean
    allowAddPriceFeed: boolean
    ownerMustSendPayouts: boolean
    holdFees: boolean
    useTotalSurplusForCashOuts: boolean
    useDataHookForPay: boolean
    useDataHookForCashOut: boolean
    dataHook?: string | null
    metadata: bigint | number
    metadataExtra?: number | null
    mustStartAtOrAfter?: bigint | number | null
    caller: string
    approvalStatus?: string | null
  }

  export type RulesetCreateOrConnectWithoutProjectInput = {
    where: RulesetWhereUniqueInput
    create: XOR<RulesetCreateWithoutProjectInput, RulesetUncheckedCreateWithoutProjectInput>
  }

  export type RulesetCreateManyProjectInputEnvelope = {
    data: RulesetCreateManyProjectInput | RulesetCreateManyProjectInput[]
    skipDuplicates?: boolean
  }

  export type ParticipantUpsertWithWhereUniqueWithoutProjectInput = {
    where: ParticipantWhereUniqueInput
    update: XOR<ParticipantUpdateWithoutProjectInput, ParticipantUncheckedUpdateWithoutProjectInput>
    create: XOR<ParticipantCreateWithoutProjectInput, ParticipantUncheckedCreateWithoutProjectInput>
  }

  export type ParticipantUpdateWithWhereUniqueWithoutProjectInput = {
    where: ParticipantWhereUniqueInput
    data: XOR<ParticipantUpdateWithoutProjectInput, ParticipantUncheckedUpdateWithoutProjectInput>
  }

  export type ParticipantUpdateManyWithWhereWithoutProjectInput = {
    where: ParticipantScalarWhereInput
    data: XOR<ParticipantUpdateManyMutationInput, ParticipantUncheckedUpdateManyWithoutProjectInput>
  }

  export type ParticipantScalarWhereInput = {
    AND?: ParticipantScalarWhereInput | ParticipantScalarWhereInput[]
    OR?: ParticipantScalarWhereInput[]
    NOT?: ParticipantScalarWhereInput | ParticipantScalarWhereInput[]
    chainId?: IntFilter<"Participant"> | number
    projectId?: IntFilter<"Participant"> | number
    createdAt?: IntFilter<"Participant"> | number
    balance?: BigIntFilter<"Participant"> | bigint | number
    isRevnet?: BoolNullableFilter<"Participant"> | boolean | null
    address?: StringFilter<"Participant"> | string
    firstOwned?: IntNullableFilter<"Participant"> | number | null
    cashOutValue?: BigIntFilter<"Participant"> | bigint | number
  }

  export type RulesetUpsertWithWhereUniqueWithoutProjectInput = {
    where: RulesetWhereUniqueInput
    update: XOR<RulesetUpdateWithoutProjectInput, RulesetUncheckedUpdateWithoutProjectInput>
    create: XOR<RulesetCreateWithoutProjectInput, RulesetUncheckedCreateWithoutProjectInput>
  }

  export type RulesetUpdateWithWhereUniqueWithoutProjectInput = {
    where: RulesetWhereUniqueInput
    data: XOR<RulesetUpdateWithoutProjectInput, RulesetUncheckedUpdateWithoutProjectInput>
  }

  export type RulesetUpdateManyWithWhereWithoutProjectInput = {
    where: RulesetScalarWhereInput
    data: XOR<RulesetUpdateManyMutationInput, RulesetUncheckedUpdateManyWithoutProjectInput>
  }

  export type RulesetScalarWhereInput = {
    AND?: RulesetScalarWhereInput | RulesetScalarWhereInput[]
    OR?: RulesetScalarWhereInput[]
    NOT?: RulesetScalarWhereInput | RulesetScalarWhereInput[]
    chainId?: IntFilter<"Ruleset"> | number
    projectId?: IntFilter<"Ruleset"> | number
    rulesetId?: BigIntFilter<"Ruleset"> | bigint | number
    createdAt?: IntFilter<"Ruleset"> | number
    queuedAt?: IntFilter<"Ruleset"> | number
    cycleNumber?: IntFilter<"Ruleset"> | number
    basedOnId?: BigIntFilter<"Ruleset"> | bigint | number
    start?: BigIntFilter<"Ruleset"> | bigint | number
    duration?: BigIntFilter<"Ruleset"> | bigint | number
    weight?: BigIntFilter<"Ruleset"> | bigint | number
    weightCutPercent?: IntFilter<"Ruleset"> | number
    approvalHook?: StringNullableFilter<"Ruleset"> | string | null
    reservedPercent?: IntFilter<"Ruleset"> | number
    cashOutTaxRate?: IntFilter<"Ruleset"> | number
    baseCurrency?: IntFilter<"Ruleset"> | number
    pausePay?: BoolFilter<"Ruleset"> | boolean
    pauseCreditTransfers?: BoolFilter<"Ruleset"> | boolean
    allowOwnerMinting?: BoolFilter<"Ruleset"> | boolean
    allowSetCustomToken?: BoolFilter<"Ruleset"> | boolean
    allowTerminalMigration?: BoolFilter<"Ruleset"> | boolean
    allowSetTerminals?: BoolFilter<"Ruleset"> | boolean
    allowSetController?: BoolFilter<"Ruleset"> | boolean
    allowAddAccountingContext?: BoolFilter<"Ruleset"> | boolean
    allowAddPriceFeed?: BoolFilter<"Ruleset"> | boolean
    ownerMustSendPayouts?: BoolFilter<"Ruleset"> | boolean
    holdFees?: BoolFilter<"Ruleset"> | boolean
    useTotalSurplusForCashOuts?: BoolFilter<"Ruleset"> | boolean
    useDataHookForPay?: BoolFilter<"Ruleset"> | boolean
    useDataHookForCashOut?: BoolFilter<"Ruleset"> | boolean
    dataHook?: StringNullableFilter<"Ruleset"> | string | null
    metadata?: BigIntFilter<"Ruleset"> | bigint | number
    metadataExtra?: IntNullableFilter<"Ruleset"> | number | null
    mustStartAtOrAfter?: BigIntNullableFilter<"Ruleset"> | bigint | number | null
    caller?: StringFilter<"Ruleset"> | string
    approvalStatus?: StringNullableFilter<"Ruleset"> | string | null
  }

  export type ProjectCreateWithoutParticipantsInput = {
    chainId: number
    createdAt: number
    projectId: number
    paymentsCount?: number
    balance?: bigint | number
    isRevnet: boolean
    deployer: string
    owner: string
    erc20?: string | null
    erc20Supply?: bigint | number
    erc20Name?: string | null
    erc20Symbol?: string | null
    cashoutA?: bigint | number
    cashoutB?: bigint | number
    currentRulesetId?: bigint | number
    contributorsCount?: number
    redeemCount?: number
    redeemVolume?: bigint | number
    pendingReservedTokens?: bigint | number
    metadataUri?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    name?: string | null
    infoUri?: string | null
    logoUri?: string | null
    coverImageUri?: string | null
    twitter?: string | null
    discord?: string | null
    telegram?: string | null
    tokens?: ProjectCreatetokensInput | string[]
    domain?: string | null
    description?: string | null
    tags?: ProjectCreatetagsInput | string[]
    projectTagline?: string | null
    rulesets?: RulesetCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutParticipantsInput = {
    chainId: number
    createdAt: number
    projectId: number
    paymentsCount?: number
    balance?: bigint | number
    isRevnet: boolean
    deployer: string
    owner: string
    erc20?: string | null
    erc20Supply?: bigint | number
    erc20Name?: string | null
    erc20Symbol?: string | null
    cashoutA?: bigint | number
    cashoutB?: bigint | number
    currentRulesetId?: bigint | number
    contributorsCount?: number
    redeemCount?: number
    redeemVolume?: bigint | number
    pendingReservedTokens?: bigint | number
    metadataUri?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    name?: string | null
    infoUri?: string | null
    logoUri?: string | null
    coverImageUri?: string | null
    twitter?: string | null
    discord?: string | null
    telegram?: string | null
    tokens?: ProjectCreatetokensInput | string[]
    domain?: string | null
    description?: string | null
    tags?: ProjectCreatetagsInput | string[]
    projectTagline?: string | null
    rulesets?: RulesetUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutParticipantsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutParticipantsInput, ProjectUncheckedCreateWithoutParticipantsInput>
  }

  export type ProjectUpsertWithoutParticipantsInput = {
    update: XOR<ProjectUpdateWithoutParticipantsInput, ProjectUncheckedUpdateWithoutParticipantsInput>
    create: XOR<ProjectCreateWithoutParticipantsInput, ProjectUncheckedCreateWithoutParticipantsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutParticipantsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutParticipantsInput, ProjectUncheckedUpdateWithoutParticipantsInput>
  }

  export type ProjectUpdateWithoutParticipantsInput = {
    chainId?: IntFieldUpdateOperationsInput | number
    createdAt?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    paymentsCount?: IntFieldUpdateOperationsInput | number
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    isRevnet?: BoolFieldUpdateOperationsInput | boolean
    deployer?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    erc20?: NullableStringFieldUpdateOperationsInput | string | null
    erc20Supply?: BigIntFieldUpdateOperationsInput | bigint | number
    erc20Name?: NullableStringFieldUpdateOperationsInput | string | null
    erc20Symbol?: NullableStringFieldUpdateOperationsInput | string | null
    cashoutA?: BigIntFieldUpdateOperationsInput | bigint | number
    cashoutB?: BigIntFieldUpdateOperationsInput | bigint | number
    currentRulesetId?: BigIntFieldUpdateOperationsInput | bigint | number
    contributorsCount?: IntFieldUpdateOperationsInput | number
    redeemCount?: IntFieldUpdateOperationsInput | number
    redeemVolume?: BigIntFieldUpdateOperationsInput | bigint | number
    pendingReservedTokens?: BigIntFieldUpdateOperationsInput | bigint | number
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    name?: NullableStringFieldUpdateOperationsInput | string | null
    infoUri?: NullableStringFieldUpdateOperationsInput | string | null
    logoUri?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUri?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    discord?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    tokens?: ProjectUpdatetokensInput | string[]
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProjectUpdatetagsInput | string[]
    projectTagline?: NullableStringFieldUpdateOperationsInput | string | null
    rulesets?: RulesetUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutParticipantsInput = {
    chainId?: IntFieldUpdateOperationsInput | number
    createdAt?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    paymentsCount?: IntFieldUpdateOperationsInput | number
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    isRevnet?: BoolFieldUpdateOperationsInput | boolean
    deployer?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    erc20?: NullableStringFieldUpdateOperationsInput | string | null
    erc20Supply?: BigIntFieldUpdateOperationsInput | bigint | number
    erc20Name?: NullableStringFieldUpdateOperationsInput | string | null
    erc20Symbol?: NullableStringFieldUpdateOperationsInput | string | null
    cashoutA?: BigIntFieldUpdateOperationsInput | bigint | number
    cashoutB?: BigIntFieldUpdateOperationsInput | bigint | number
    currentRulesetId?: BigIntFieldUpdateOperationsInput | bigint | number
    contributorsCount?: IntFieldUpdateOperationsInput | number
    redeemCount?: IntFieldUpdateOperationsInput | number
    redeemVolume?: BigIntFieldUpdateOperationsInput | bigint | number
    pendingReservedTokens?: BigIntFieldUpdateOperationsInput | bigint | number
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    name?: NullableStringFieldUpdateOperationsInput | string | null
    infoUri?: NullableStringFieldUpdateOperationsInput | string | null
    logoUri?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUri?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    discord?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    tokens?: ProjectUpdatetokensInput | string[]
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProjectUpdatetagsInput | string[]
    projectTagline?: NullableStringFieldUpdateOperationsInput | string | null
    rulesets?: RulesetUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ProjectCreateWithoutRulesetsInput = {
    chainId: number
    createdAt: number
    projectId: number
    paymentsCount?: number
    balance?: bigint | number
    isRevnet: boolean
    deployer: string
    owner: string
    erc20?: string | null
    erc20Supply?: bigint | number
    erc20Name?: string | null
    erc20Symbol?: string | null
    cashoutA?: bigint | number
    cashoutB?: bigint | number
    currentRulesetId?: bigint | number
    contributorsCount?: number
    redeemCount?: number
    redeemVolume?: bigint | number
    pendingReservedTokens?: bigint | number
    metadataUri?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    name?: string | null
    infoUri?: string | null
    logoUri?: string | null
    coverImageUri?: string | null
    twitter?: string | null
    discord?: string | null
    telegram?: string | null
    tokens?: ProjectCreatetokensInput | string[]
    domain?: string | null
    description?: string | null
    tags?: ProjectCreatetagsInput | string[]
    projectTagline?: string | null
    participants?: ParticipantCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutRulesetsInput = {
    chainId: number
    createdAt: number
    projectId: number
    paymentsCount?: number
    balance?: bigint | number
    isRevnet: boolean
    deployer: string
    owner: string
    erc20?: string | null
    erc20Supply?: bigint | number
    erc20Name?: string | null
    erc20Symbol?: string | null
    cashoutA?: bigint | number
    cashoutB?: bigint | number
    currentRulesetId?: bigint | number
    contributorsCount?: number
    redeemCount?: number
    redeemVolume?: bigint | number
    pendingReservedTokens?: bigint | number
    metadataUri?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    name?: string | null
    infoUri?: string | null
    logoUri?: string | null
    coverImageUri?: string | null
    twitter?: string | null
    discord?: string | null
    telegram?: string | null
    tokens?: ProjectCreatetokensInput | string[]
    domain?: string | null
    description?: string | null
    tags?: ProjectCreatetagsInput | string[]
    projectTagline?: string | null
    participants?: ParticipantUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutRulesetsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutRulesetsInput, ProjectUncheckedCreateWithoutRulesetsInput>
  }

  export type ProjectUpsertWithoutRulesetsInput = {
    update: XOR<ProjectUpdateWithoutRulesetsInput, ProjectUncheckedUpdateWithoutRulesetsInput>
    create: XOR<ProjectCreateWithoutRulesetsInput, ProjectUncheckedCreateWithoutRulesetsInput>
    where?: ProjectWhereInput
  }

  export type ProjectUpdateToOneWithWhereWithoutRulesetsInput = {
    where?: ProjectWhereInput
    data: XOR<ProjectUpdateWithoutRulesetsInput, ProjectUncheckedUpdateWithoutRulesetsInput>
  }

  export type ProjectUpdateWithoutRulesetsInput = {
    chainId?: IntFieldUpdateOperationsInput | number
    createdAt?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    paymentsCount?: IntFieldUpdateOperationsInput | number
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    isRevnet?: BoolFieldUpdateOperationsInput | boolean
    deployer?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    erc20?: NullableStringFieldUpdateOperationsInput | string | null
    erc20Supply?: BigIntFieldUpdateOperationsInput | bigint | number
    erc20Name?: NullableStringFieldUpdateOperationsInput | string | null
    erc20Symbol?: NullableStringFieldUpdateOperationsInput | string | null
    cashoutA?: BigIntFieldUpdateOperationsInput | bigint | number
    cashoutB?: BigIntFieldUpdateOperationsInput | bigint | number
    currentRulesetId?: BigIntFieldUpdateOperationsInput | bigint | number
    contributorsCount?: IntFieldUpdateOperationsInput | number
    redeemCount?: IntFieldUpdateOperationsInput | number
    redeemVolume?: BigIntFieldUpdateOperationsInput | bigint | number
    pendingReservedTokens?: BigIntFieldUpdateOperationsInput | bigint | number
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    name?: NullableStringFieldUpdateOperationsInput | string | null
    infoUri?: NullableStringFieldUpdateOperationsInput | string | null
    logoUri?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUri?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    discord?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    tokens?: ProjectUpdatetokensInput | string[]
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProjectUpdatetagsInput | string[]
    projectTagline?: NullableStringFieldUpdateOperationsInput | string | null
    participants?: ParticipantUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutRulesetsInput = {
    chainId?: IntFieldUpdateOperationsInput | number
    createdAt?: IntFieldUpdateOperationsInput | number
    projectId?: IntFieldUpdateOperationsInput | number
    paymentsCount?: IntFieldUpdateOperationsInput | number
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    isRevnet?: BoolFieldUpdateOperationsInput | boolean
    deployer?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
    erc20?: NullableStringFieldUpdateOperationsInput | string | null
    erc20Supply?: BigIntFieldUpdateOperationsInput | bigint | number
    erc20Name?: NullableStringFieldUpdateOperationsInput | string | null
    erc20Symbol?: NullableStringFieldUpdateOperationsInput | string | null
    cashoutA?: BigIntFieldUpdateOperationsInput | bigint | number
    cashoutB?: BigIntFieldUpdateOperationsInput | bigint | number
    currentRulesetId?: BigIntFieldUpdateOperationsInput | bigint | number
    contributorsCount?: IntFieldUpdateOperationsInput | number
    redeemCount?: IntFieldUpdateOperationsInput | number
    redeemVolume?: BigIntFieldUpdateOperationsInput | bigint | number
    pendingReservedTokens?: BigIntFieldUpdateOperationsInput | bigint | number
    metadataUri?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    name?: NullableStringFieldUpdateOperationsInput | string | null
    infoUri?: NullableStringFieldUpdateOperationsInput | string | null
    logoUri?: NullableStringFieldUpdateOperationsInput | string | null
    coverImageUri?: NullableStringFieldUpdateOperationsInput | string | null
    twitter?: NullableStringFieldUpdateOperationsInput | string | null
    discord?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    tokens?: ProjectUpdatetokensInput | string[]
    domain?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ProjectUpdatetagsInput | string[]
    projectTagline?: NullableStringFieldUpdateOperationsInput | string | null
    participants?: ParticipantUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type ParticipantCreateManyProjectInput = {
    createdAt: number
    balance?: bigint | number
    isRevnet?: boolean | null
    address: string
    firstOwned?: number | null
    cashOutValue?: bigint | number
  }

  export type RulesetCreateManyProjectInput = {
    rulesetId: bigint | number
    createdAt: number
    queuedAt: number
    cycleNumber: number
    basedOnId: bigint | number
    start: bigint | number
    duration: bigint | number
    weight: bigint | number
    weightCutPercent: number
    approvalHook?: string | null
    reservedPercent: number
    cashOutTaxRate: number
    baseCurrency: number
    pausePay: boolean
    pauseCreditTransfers: boolean
    allowOwnerMinting: boolean
    allowSetCustomToken: boolean
    allowTerminalMigration: boolean
    allowSetTerminals: boolean
    allowSetController: boolean
    allowAddAccountingContext: boolean
    allowAddPriceFeed: boolean
    ownerMustSendPayouts: boolean
    holdFees: boolean
    useTotalSurplusForCashOuts: boolean
    useDataHookForPay: boolean
    useDataHookForCashOut: boolean
    dataHook?: string | null
    metadata: bigint | number
    metadataExtra?: number | null
    mustStartAtOrAfter?: bigint | number | null
    caller: string
    approvalStatus?: string | null
  }

  export type ParticipantUpdateWithoutProjectInput = {
    createdAt?: IntFieldUpdateOperationsInput | number
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    isRevnet?: NullableBoolFieldUpdateOperationsInput | boolean | null
    address?: StringFieldUpdateOperationsInput | string
    firstOwned?: NullableIntFieldUpdateOperationsInput | number | null
    cashOutValue?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type ParticipantUncheckedUpdateWithoutProjectInput = {
    createdAt?: IntFieldUpdateOperationsInput | number
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    isRevnet?: NullableBoolFieldUpdateOperationsInput | boolean | null
    address?: StringFieldUpdateOperationsInput | string
    firstOwned?: NullableIntFieldUpdateOperationsInput | number | null
    cashOutValue?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type ParticipantUncheckedUpdateManyWithoutProjectInput = {
    createdAt?: IntFieldUpdateOperationsInput | number
    balance?: BigIntFieldUpdateOperationsInput | bigint | number
    isRevnet?: NullableBoolFieldUpdateOperationsInput | boolean | null
    address?: StringFieldUpdateOperationsInput | string
    firstOwned?: NullableIntFieldUpdateOperationsInput | number | null
    cashOutValue?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type RulesetUpdateWithoutProjectInput = {
    rulesetId?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: IntFieldUpdateOperationsInput | number
    queuedAt?: IntFieldUpdateOperationsInput | number
    cycleNumber?: IntFieldUpdateOperationsInput | number
    basedOnId?: BigIntFieldUpdateOperationsInput | bigint | number
    start?: BigIntFieldUpdateOperationsInput | bigint | number
    duration?: BigIntFieldUpdateOperationsInput | bigint | number
    weight?: BigIntFieldUpdateOperationsInput | bigint | number
    weightCutPercent?: IntFieldUpdateOperationsInput | number
    approvalHook?: NullableStringFieldUpdateOperationsInput | string | null
    reservedPercent?: IntFieldUpdateOperationsInput | number
    cashOutTaxRate?: IntFieldUpdateOperationsInput | number
    baseCurrency?: IntFieldUpdateOperationsInput | number
    pausePay?: BoolFieldUpdateOperationsInput | boolean
    pauseCreditTransfers?: BoolFieldUpdateOperationsInput | boolean
    allowOwnerMinting?: BoolFieldUpdateOperationsInput | boolean
    allowSetCustomToken?: BoolFieldUpdateOperationsInput | boolean
    allowTerminalMigration?: BoolFieldUpdateOperationsInput | boolean
    allowSetTerminals?: BoolFieldUpdateOperationsInput | boolean
    allowSetController?: BoolFieldUpdateOperationsInput | boolean
    allowAddAccountingContext?: BoolFieldUpdateOperationsInput | boolean
    allowAddPriceFeed?: BoolFieldUpdateOperationsInput | boolean
    ownerMustSendPayouts?: BoolFieldUpdateOperationsInput | boolean
    holdFees?: BoolFieldUpdateOperationsInput | boolean
    useTotalSurplusForCashOuts?: BoolFieldUpdateOperationsInput | boolean
    useDataHookForPay?: BoolFieldUpdateOperationsInput | boolean
    useDataHookForCashOut?: BoolFieldUpdateOperationsInput | boolean
    dataHook?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: BigIntFieldUpdateOperationsInput | bigint | number
    metadataExtra?: NullableIntFieldUpdateOperationsInput | number | null
    mustStartAtOrAfter?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    caller?: StringFieldUpdateOperationsInput | string
    approvalStatus?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RulesetUncheckedUpdateWithoutProjectInput = {
    rulesetId?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: IntFieldUpdateOperationsInput | number
    queuedAt?: IntFieldUpdateOperationsInput | number
    cycleNumber?: IntFieldUpdateOperationsInput | number
    basedOnId?: BigIntFieldUpdateOperationsInput | bigint | number
    start?: BigIntFieldUpdateOperationsInput | bigint | number
    duration?: BigIntFieldUpdateOperationsInput | bigint | number
    weight?: BigIntFieldUpdateOperationsInput | bigint | number
    weightCutPercent?: IntFieldUpdateOperationsInput | number
    approvalHook?: NullableStringFieldUpdateOperationsInput | string | null
    reservedPercent?: IntFieldUpdateOperationsInput | number
    cashOutTaxRate?: IntFieldUpdateOperationsInput | number
    baseCurrency?: IntFieldUpdateOperationsInput | number
    pausePay?: BoolFieldUpdateOperationsInput | boolean
    pauseCreditTransfers?: BoolFieldUpdateOperationsInput | boolean
    allowOwnerMinting?: BoolFieldUpdateOperationsInput | boolean
    allowSetCustomToken?: BoolFieldUpdateOperationsInput | boolean
    allowTerminalMigration?: BoolFieldUpdateOperationsInput | boolean
    allowSetTerminals?: BoolFieldUpdateOperationsInput | boolean
    allowSetController?: BoolFieldUpdateOperationsInput | boolean
    allowAddAccountingContext?: BoolFieldUpdateOperationsInput | boolean
    allowAddPriceFeed?: BoolFieldUpdateOperationsInput | boolean
    ownerMustSendPayouts?: BoolFieldUpdateOperationsInput | boolean
    holdFees?: BoolFieldUpdateOperationsInput | boolean
    useTotalSurplusForCashOuts?: BoolFieldUpdateOperationsInput | boolean
    useDataHookForPay?: BoolFieldUpdateOperationsInput | boolean
    useDataHookForCashOut?: BoolFieldUpdateOperationsInput | boolean
    dataHook?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: BigIntFieldUpdateOperationsInput | bigint | number
    metadataExtra?: NullableIntFieldUpdateOperationsInput | number | null
    mustStartAtOrAfter?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    caller?: StringFieldUpdateOperationsInput | string
    approvalStatus?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RulesetUncheckedUpdateManyWithoutProjectInput = {
    rulesetId?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: IntFieldUpdateOperationsInput | number
    queuedAt?: IntFieldUpdateOperationsInput | number
    cycleNumber?: IntFieldUpdateOperationsInput | number
    basedOnId?: BigIntFieldUpdateOperationsInput | bigint | number
    start?: BigIntFieldUpdateOperationsInput | bigint | number
    duration?: BigIntFieldUpdateOperationsInput | bigint | number
    weight?: BigIntFieldUpdateOperationsInput | bigint | number
    weightCutPercent?: IntFieldUpdateOperationsInput | number
    approvalHook?: NullableStringFieldUpdateOperationsInput | string | null
    reservedPercent?: IntFieldUpdateOperationsInput | number
    cashOutTaxRate?: IntFieldUpdateOperationsInput | number
    baseCurrency?: IntFieldUpdateOperationsInput | number
    pausePay?: BoolFieldUpdateOperationsInput | boolean
    pauseCreditTransfers?: BoolFieldUpdateOperationsInput | boolean
    allowOwnerMinting?: BoolFieldUpdateOperationsInput | boolean
    allowSetCustomToken?: BoolFieldUpdateOperationsInput | boolean
    allowTerminalMigration?: BoolFieldUpdateOperationsInput | boolean
    allowSetTerminals?: BoolFieldUpdateOperationsInput | boolean
    allowSetController?: BoolFieldUpdateOperationsInput | boolean
    allowAddAccountingContext?: BoolFieldUpdateOperationsInput | boolean
    allowAddPriceFeed?: BoolFieldUpdateOperationsInput | boolean
    ownerMustSendPayouts?: BoolFieldUpdateOperationsInput | boolean
    holdFees?: BoolFieldUpdateOperationsInput | boolean
    useTotalSurplusForCashOuts?: BoolFieldUpdateOperationsInput | boolean
    useDataHookForPay?: BoolFieldUpdateOperationsInput | boolean
    useDataHookForCashOut?: BoolFieldUpdateOperationsInput | boolean
    dataHook?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: BigIntFieldUpdateOperationsInput | bigint | number
    metadataExtra?: NullableIntFieldUpdateOperationsInput | number | null
    mustStartAtOrAfter?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    caller?: StringFieldUpdateOperationsInput | string
    approvalStatus?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}