class Game {
  device = []
  player = []
  cards = []
  cardsStore = []

  constructor(cards) {
    this.cardsStore = [...cards]
    this.cards = [...cards]
    this.device = []
    this.player = []

    this.gameDevice()
    this.gameDevice()
  }

  newGame () {
    this.cards = [...this.cardsStore]
    this.device = []
    this.player = []

    this.gameDevice()
    this.gameDevice()
  }

  getRandonInt(max) {
    return Math.floor(Math.random() * max)
  }

  gameDevice () {
    const card = this.getCard()
    this.device.push(card)
  }

  gamePlayer () {
    const card = this.getCard()
    this.player.push(card)
  }

  getCard () {
    const length = this.cards.length
    const index = this.getRandonInt(length - 1)
    const card = this.cards[index]
    
    this.cards.splice(index, 1)

    return card
  }

  getAll () {
    return {
      cards: this.cards,
      player: this.player,
      device: this.device,
      cardsStore: this.cardsStore,
    }
  }
}