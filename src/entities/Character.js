export default class Character {
  constructor({ _id, name, films, imageUrl, url }) {
    this.id = _id;
    this.name = name;
    this.films = films;
    this.image = imageUrl;
    this.url = url;
  }
  toggleBookmark() {
    this.bookmarked = !this.bookmarked;
  }
}
