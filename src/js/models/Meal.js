export class Meal {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.category = data.category;
    this.area = data.area;
    this.thumbnail = data.thumbnail;
    this.instructions = data.instructions;
    this.ingredients = data.ingredients;
    this.tags = data.tags;
    this.youtube = data.youtube;
    this.source=data.source;
  }
}
