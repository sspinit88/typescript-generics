// Import stylesheets
import './style.css';

/* - 0 - */

interface State0<A, B, C, D> {}

type State2<A> = {};

function fu<T>() {}

/* - 1 - */

interface User {
  name: string;
  age: number;
}

interface Message {
  id: number;
  text: string;
}

interface State<T> {
  loading: boolean;
  error: Error | null;
  data: T;
}

type UserState = State2<User>;
type MessageState = State<Message>;

/* - 2 - */

/// !!! пренадлежность типа Т устанавливается в момент передачи аргумента
function identity<T>(arg: T): T {
  return arg;
}

const s: string = 'Hello';
const n: number = 1123;
const u: User = {
  age: 17,
  name: 'Poul',
};

const r1 = identity(n); // function identity<number>(arg: number): number
const r2 = identity(s); // function identity<string>(arg: string): string
const r3 = identity(u); // function identity<User>(arg: User): User

/* - 3 - */

function getRandomElementA(items) {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

function getRandomElementB<G>(items: G[]): G {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

getRandomElementA([1, 2, 3]);
// function getRandomElementA(item: any): any

getRandomElementA([null, 'n', 1, true, 1, '5']);
// function getRandomElementA(items: any): any

getRandomElementB([1, 2, 3]);
// function getRandomElementB<number>(items: number[]): number

getRandomElementB(['s', 'a', 'r']);
// function getRandomElementB<string>(items: string[]): string

getRandomElementB([null, 'n', 1, true, 1, '5']);
// function getRandomElementB<string | number | boolean>(items: (string | number | boolean)[]): string | number | boolean

/* - 4 - */

function merge<U, V>(o1: U, o2: V): U & V {
  return {
    ...o1,
    ...o2,
  };
}

merge({ a: 1 }, { b: '2' });
/*
function merge<{ a: number; }, { b: string; }>
              (o1: { a: number; }, o2: { b: string; }): { a: number; } & { b: string; }
*/

/* - 5 - */

/// Встроенные дженерики, самый популярный - Promise;

async function fakeRequest() {
  return 2;
}
// function fakeRequest(): Promise<number>

const b: Promise<number> = fakeRequest();

/// дженерик для массивов
type Names = Array<string>;
type NamesV2 = string[];

/// для объектов
type Obj = Record<string, number>;
/*
    type Obj = {
        [x: string]: number;
    }
*/

/* - 6 - */

interface Person {
  phone: number;
}

// могут РАСШИРЯТЬ другие типы
// extends значит, что тип должен обладать характеристиками,
// необходимыми для выполнения конкретных операций над этим типом.

function callFriend<T extends Person>(friend: T) {
  return friend.phone;
}

callFriend({ phone: 123456789 }); // есть поле phone того же типа

callFriend({ name: 'User' }); // нет поля phone

/* - 7 - */

type UserA = {
  id: string;
  name: string;
};

type MessageA = {
  id: string;
  text: string;
};

class DataCollection<T extends { id: string }> {
  protected data: T[];

  constructor(data: T[]) {
    this.data = data;
  }

  search(id: string): T | null {
    return this.data.find((d) => d.id == id) || null;
  }
}

/* - 8 - */
/// получаем значения по ключу

function getValue<T extends object, U extends keyof T>(obj: T, prop: U): T[U] {
  return obj[prop];
}

getValue({ name: 'Archer' }, 'age'); /// ошибка, тк нет такого свойства
getValue({ name: 'Archer' }, 'name'); // все хорошо
/*
function getValue<{ name: string; }, "name">
                 (obj: { name: string; }, prop: "name"): string
*/

/* - 9 - */
