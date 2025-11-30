const TYPE_CARD = {
  SPADE:    'S',
  HEART:    'H',
  DIAMOND:  'D',
  CLUB:     'C',
}

const VALUE_CARD = {
  ACE:    'A',
  TWO:    '2',
  THREE:  '3',
  FOUR:   '4',
  FIVE:   '5',
  SIX:    '6',
  SEVEN:  '7',
  EIGHT:  '8',
  NINE:   '9',
  TEN:    '10',
  JACK:   'J',
  QUEEN:  'Q',
  KING:   'K',
}

const chartValue = {
  'A' : 1,
  'J' : 11,
  'Q' : 12,
  'K' : 13,
}


const cards = []
let score = {
  device: 0,
  player: 0,
}

for (let typeCard of Object.values(TYPE_CARD)) {
  for (let valueCard of Object.values(VALUE_CARD)) {
    cards.push(`./assets/img/${valueCard}${typeCard}`)
  }
}

const game = new Game(cards)

const $btnNewGame = $('.btn-new-game')
const $btnPlayerAdd = $('.btn-player-add-card')
const $btnPlayerReady = $('.btn-player-ready')

const $devicePesktop = $('.device-desktop')
const $playerDesktop = $('.player-desktop')

const $playerScore = $('.player-score span')
const $deviceScore = $('.device-score span')

const $winner = $('.winner')

const clearDesktops = () => {
  $devicePesktop.innerHTML = `
    <div class="rounded-lg bg-slate-600 h-80 w-52 ring -ml-32"></div>
    <div class="rounded-lg bg-slate-600 h-80 w-52 ring -ml-32"></div>
  `
  $playerDesktop.innerHTML = ''
}

const btnsPlayerDisabled = (idDisabled) => {
  $btnPlayerAdd.disabled = idDisabled
  $btnPlayerReady.disabled = idDisabled
}

const winnerAnnouncement = () => {
  $winner.classList.remove('text-blue-300','text-pink-300','text-emerald-300')

  if (score.device > 21 && score.player > 21) {
    $winner.classList.remove('hidden')
    $winner.classList.add('text-blue-300')
    $winner.innerHTML = 'NO WINNER'
    return
  }

  if ((score.player > 21 && score.device <= 21) || (score.device - 21) < (score.player - 21) ) {
    $winner.classList.remove('hidden')
    $winner.classList.add('text-pink-300')
    $winner.innerHTML = 'WIN DEVICE'
    return
  }

  $winner.classList.remove('hidden')
  $winner.classList.add('text-emerald-300')
  $winner.innerHTML = 'WIN PLAYER'
}

const playerDevice = () => {
  btnsPlayerDisabled(true)
  const { device } = game.getAll()
  let deviceHtml = ''
  let total = 0
  
  device.forEach(d => {
    total += getScoreByImg(d)
    deviceHtml += `
      <img src="${d}.png" class="rounded-lg h-80 w-52 -ml-32" alt="${d}">
    `
  })

  if (total < 21 && score.player > 21) {
    do {
      game.gameDevice()
      const { device: list } = game.getAll()
      const lastCard = list[list.length - 1]
      total += getScoreByImg(lastCard)
      deviceHtml += `
        <img src="${lastCard}.png" class="rounded-lg h-80 w-52 -ml-32" alt="${lastCard}">
      `
    } while (total < 21)
  }

  score.device = total

  $deviceScore.innerHTML = score.device
  $devicePesktop.innerHTML = deviceHtml

  winnerAnnouncement()
}

const getScoreByImg = (urlImg) => {
  const img = urlImg.split('/')[3]
  const length = img.length
  const currentString = img.slice(0, length - 1)

  if (Object.getOwnPropertyNames(chartValue).some(a => a === currentString)) {
    return chartValue[currentString]
  }
  return parseInt(currentString)
}

$btnNewGame.addEventListener('click', () => {
  game.newGame()
  clearDesktops()
  $winner.classList.add('hidden')
  btnsPlayerDisabled(false)
  score.device = 0
  score.player = 0

  const resutl = game.getAll()
  console.log(resutl)

  $deviceScore.innerHTML = score.device
  $playerScore.innerHTML = '?'
})

$btnPlayerAdd.addEventListener('click', () => {
  game.gamePlayer()
  const { player } = game.getAll()
  
  
  const lastCard = player[player.length - 1]
  score.player += getScoreByImg(lastCard)
  
  $playerScore.innerHTML = score.player
  $playerDesktop.insertAdjacentHTML('beforeend', `
    <img src="${lastCard}.png" class="rounded-lg h-80 w-52 -ml-32" alt="${lastCard}">
  `)

  if (score.player >= 21) {
    playerDevice()
  }
})

$btnPlayerReady.addEventListener('click', () => {
  playerDevice()
})
