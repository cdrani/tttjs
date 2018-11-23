export default class Player {
  constructor(name, marker) {
    this._name = name
    this._marker = marker
  }

  get name() {
    return this._name
  }

  get marker() {
    return this._marker
  }
}
