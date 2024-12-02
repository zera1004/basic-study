class Character {
  constructor(name, level, hp, damage) {
    this.name = name;
    this.level = level;
    this.hp = hp;
    this.damage = damage;
  }

  attack() {
    console.log(`${this.name}가 공격을 시도합니다!`);
  }

  heal(amount) {
    this.hp += amount;
    console.log(`${this.name}의 체력이 ${amount}만큼 회복되었습니다.`);
  }

  levelUp() {
    this.level++;
    this.hp += Math.floor(Math.random() * 10);
    this.damage += Math.floor(Math.random() * 5);
  }
}

let characterA = new Character("A", 1, 100, 10);
let characterB = new Character("B", 3, 110, 10);
let characterC = new Character("C", 5, 130, 10);

console.log(characterA);

characterB.attack();

characterC.heal(5);
console.log(characterC.hp)

characterA.levelUp();
console.log(characterA)