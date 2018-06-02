class Player {

  constructor() {
    this.health = 20
  }

  isEnemyInSight(warrior, direction='forward') {
    let view = warrior.look(direction).find(space => !space.isEmpty())
    return view && view.isEnemy()
  }

  amIHurt(warrior) {
    return Boolean(warrior.health() < 20)
  }

  amIReallyHurt(warrior) {
    return warrior.health() < 10
  }

  amITakingDamage(warrior) {
    return this.health > warrior.health()
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
    if (this.isEnemyInSight(warrior, 'backward')) {
      warrior.shoot('backward')
    } else if (this.isEnemyInSight(warrior)) {
      warrior.shoot()
    } else if (!warrior.feel('backward').isEmpty() && !warrior.feel('backward').isWall()) {
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
