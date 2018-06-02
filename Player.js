class Player {

  constructor() {
    this.health = 20
  }

  amIHurt(warrior) {
    return Boolean(warrior.health() < 20)
  }

  amITakingDamage(warrior) {
    return this.health > warrior.health()
  }

  amIReallyHurt(warrior) {
    return warrior.health() < 10
  }

  rescueAndAttack(warrior, direction='forward') {
    if (!warrior.feel(direction).isEmpty()) {
      if (warrior.feel(direction).isCaptive()) { 
        warrior.rescue(direction)
      } else {
        warrior.attack(direction)
      }
    }
  }

  playTurn(warrior) {
    if (!warrior.feel('backward').isEmpty() && !warrior.feel('backward').isWall()) {
      this.rescueAndAttack(warrior, 'backward')
    } else if (!warrior.feel().isEmpty() && !warrior.feel().isWall()) {
      this.rescueAndAttack(warrior)
    } else if (this.amITakingDamage(warrior)) {
      if (this.amIReallyHurt(warrior)) {
        warrior.walk('backward')
      } else {
        warrior.walk()
      }
    } else if (this.amIHurt(warrior)) {
      warrior.rest()
    } else if (warrior.feel().isWall()) {
      warrior.pivot()
    } else {
      warrior.walk()
    }
    this.health = warrior.health()
  }
}
