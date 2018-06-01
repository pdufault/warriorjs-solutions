class Player {

  constructor() {
    this.health = 20
  }

  amIHurt(warrior) {
    return warrior.health() < 20
  }

  isSomeOneThere(warrior) {
    return warrior.feel().isEmpty()
  }

  amITakingDamage(warrior) {
    return this.health > warrior.health()
  }

  playTurn(warrior) {
    if (!this.isSomeOneThere(warrior)) {
      if (warrior.feel().isCaptive()) { 
        warrior.rescue()
      } else {
        warrior.attack()
      }
    } else if (this.amITakingDamage(warrior)) {
      warrior.walk()
    } else if (this.amIHurt(warrior)) {
      warrior.rest()
    } else {
      warrior.walk()
    }
    this.health = warrior.health()
  }
}
