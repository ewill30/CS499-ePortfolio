export class Trip {
  _id?: string;
  code: string;
  name: string;
  length: string;
  start: string;
  resort: string;
  perPerson: number;
  image: string;
  description: string;

  constructor(
    code: string = '',
    name: string = '',
    length: string = '',
    start: string = '',
    resort: string = '',
    perPerson: number = 0,
    image: string = '',
    description: string = ''
  ) {
    this.code = code;
    this.name = name;
    this.length = length;
    this.start = start;
    this.resort = resort;
    this.perPerson = perPerson;
    this.image = image;
    this.description = description;
  }
}