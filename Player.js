class Player {

  amIHurt(warrior) {
    return warrior.health() < 20
  }

  isSomeOneThere(warrior) {
    return warrior.feel().isEmpty()
  }

  playTurn(warrior) {
    if (this.isSomeoneThere()) {
      warrior.attack()
    else if (this.amIHurt(warrior)) {
      warrior.rest()
    }
  }
}
