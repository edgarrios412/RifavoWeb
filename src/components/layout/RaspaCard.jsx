"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CoinsIcon as Coin, Star, RefreshCw, EyeIcon } from "lucide-react"
import confetti from "canvas-confetti"

// Prize distribution with probabilities
const PRIZES = [
  { value: "1K", probability: 0.4 },
  { value: "5K", probability: 0.2 },
  { value: "10K", probability: 0.15},
  { value: "100K", probability: 0.1},
  { value: "1M", probability: 0.01 },
  { value: "10M", probability: 0.0001},
]

const prizeValues = {
    "1K": 1000,
    "5K": 5000,
    "10K": 10000,
    "100K": 100000,
    "1M": 1000000,
    "10M": 10000000,
  };

// Get a random prize based on probability
const getRandomPrize = () => {
  const rand = Math.random()
  let cumulativeProbability = 0

  for (const prize of PRIZES) {
    cumulativeProbability += prize.probability
    if (rand < cumulativeProbability) {
      return prize.value
    }
  }

  // Default fallback (should rarely happen)
  return "1K"
}

export default function RaspaCard({nuevoSaldo}) {
  const [cells, setCells] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const [winningPrize, setWinningPrize] = useState(null)

  // Initialize the game
  useEffect(() => {
    // resetGame()
  }, [])

  const resetGame = () => {
    nuevoSaldo(-5000);
    // Create a 3x4 grid of cells
    const newCells = []

    // Decide if this card is a winner (optional)
    const isWinningCard = Math.random() < 0.3 // 30% chance of winning

    if (isWinningCard) {
      // Choose a winning prize
      const winningPrizeValue = getRandomPrize()

      // Count how many of the winning prize we've added
      let winningPrizeCount = 0

      // Generate the grid
      for (let i = 0; i < 3; i++) {
        const row = []
        for (let j = 0; j < 4; j++) {
          // If we need more winning prizes and there's room, add them
          if (winningPrizeCount < 3 && Math.random() < 0.7) {
            row.push({
              value: winningPrizeValue,
              revealed: false,
            })
            winningPrizeCount++
          } else {
            // Add a random non-winning prize
            let randomPrize
            do {
              randomPrize = getRandomPrize()
            } while (randomPrize === winningPrizeValue && winningPrizeCount >= 3)

            row.push({
              value: randomPrize,
              revealed: false,
            })
          }
        }
        newCells.push(row)
      }

      // If we didn't add enough winning prizes, force them in random positions
      while (winningPrizeCount < 3) {
        const row = Math.floor(Math.random() * 3)
        const col = Math.floor(Math.random() * 4)

        if (newCells[row][col].value !== winningPrizeValue) {
          newCells[row][col].value = winningPrizeValue
          winningPrizeCount++
        }
      }
    } else {
      // Create a non-winning card
      // Make sure no prize appears more than twice
      const prizeCounts = {
        "1K": 0,
        "5K": 0,
        "10K": 0,
        "100K": 0,
        "1M": 0,
        "10M": 0,
      }

      for (let i = 0; i < 3; i++) {
        const row = []
        for (let j = 0; j < 4; j++) {
          let prize
          do {
            prize = getRandomPrize()
          } while (prizeCounts[prize] >= 2) // Ensure no prize appears more than twice

          prizeCounts[prize]++
          row.push({
            value: prize,
            revealed: false,
          })
        }
        newCells.push(row)
      }
    }

    setCells(newCells)
    setGameOver(false)
    setWinningPrize(null)
  }

  const revealCell = (rowIndex, colIndex) => {
    if (gameOver) return

    const newCells = [...cells]
    const cell = newCells[rowIndex][colIndex]

    if (!cell.revealed) {
      cell.revealed = true
      newCells[rowIndex][colIndex] = cell

      setCells(newCells)

      // Check if there are 3 matching values
      checkForWin(newCells)

      // Check if game is over (all cells revealed)
      const allRevealed = newCells.every((row) => row.every((cell) => cell.revealed))

      if (allRevealed) {
        setGameOver(true)
      }
    }
  }

  const checkForWin = (cells) => {
    // Count occurrences of each prize value
    const revealedPrizes = {
      "1K": 0,
      "5K": 0,
      "10K": 0,
      "100K": 0,
      "1M": 0,
      "10M": 0,
    }

    // Count revealed prizes
    cells.forEach((row) => {
      row.forEach((cell) => {
        if (cell.revealed) {
          revealedPrizes[cell.value]++
        }
      })
    })

    // Check if any prize appears 3 or more times
    for (const [prize, count] of Object.entries(revealedPrizes)) {
      if (count === 3) { // Only count as a win if exactly 3 prizes are the same
        setWinningPrize(prize)
        nuevoSaldo(prizeValues[prize]);
        setGameOver(true)

        // Trigger confetti effect
        setTimeout(() => {
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
          })
        }, 300)

        break
      }
    }
  }
  const revealAllCells = () => {
    if (gameOver) return
    const newCells = cells.map(row =>
      row.map(cell => ({ ...cell, revealed: true }))
    )
    setCells(newCells)
    checkForWin(newCells)
  }

  // Get prize color based on value
  const getPrizeColor = (prize) => {
    switch (prize) {
      case "1K":
        return "text-green-500"
      case "5K":
        return "text-blue-500"
      case "10K":
        return "text-purple-500"
      case "100K":
        return "text-pink-500"
      case "1M":
        return "text-amber-500"
      case "10M":
        return "text-red-500"
      default:
        return "text-white"
    }
  }

  return (
    <div className="w-full max-w-md mx-auto rounded-xl overflow-hidden shadow-lg">
      {/* Background with gradient */}
      <div className="relative bg-gradient-to-b from-red-600 via-red-500 to-orange-500 p-6 pb-8">
        {/* Coins at the top */}
        <div className="absolute top-2 left-0 right-0 flex justify-center">
          <Coin className="text-yellow-400 w-10 h-10 -rotate-12 drop-shadow-lg" />
          <Coin className="text-yellow-400 w-12 h-12 drop-shadow-lg" />
          <Coin className="text-yellow-400 w-10 h-10 rotate-12 drop-shadow-lg" />
        </div>

        {/* Title */}
        <div className="text-center mt-12 mb-6">
          <h1
            className="text-4xl font-extrabold tracking-tight text-yellow-300 drop-shadow-md"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
          >
            RIFALOTO
          </h1>
          <p className="text-white text-sm mt-1">Raspa 3 premios iguales para ganar</p>
        </div>

        {/* Game grid */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {cells.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => revealCell(rowIndex, colIndex)}
                className={`
                  aspect-square rounded-full flex items-center justify-center text-lg font-bold
                  transition-all duration-300 transform hover:scale-105
                  ${
                    cell.revealed
                      ? "bg-yellow-100 " + (winningPrize === cell.value ? "animate-pulse ring-2 ring-yellow-300" : "")
                      : "bg-yellow-500 hover:bg-yellow-400"
                  }
                `}
                disabled={cell.revealed || gameOver}
              >
                {cell.revealed ? (
                  <span className={`${getPrizeColor(cell.value)} font-bold`}>{cell.value}</span>
                ) : (
                  <Star className="w-6 h-6 text-yellow-300" />
                )}
              </button>
            ))
          )}
        </div>

        {cells.length === 0 && (
          <div className="text-center text-white">GANA HASTA $10,000,000 COP</div>)}

        {/* Game status */}
        {gameOver && (
          <div className="text-center mt-4 mb-4 p-3 bg-yellow-100 bg-opacity-20 rounded-lg">
            {winningPrize ? (
              <div className="text-yellow-300 font-bold text-2xl animate-bounce">¡GANASTE ${winningPrize}!</div>
            ) : (
              <div className="text-white font-bold">¡Inténtalo de nuevo!</div>
            )}
          </div>
        )}

        {/* Reset button */}
        <div className="text-center mt-4">
          <Button onClick={resetGame} className="bg-yellow-500 hover:bg-yellow-400 text-red-700 font-bold">
            <RefreshCw className="mr-2 h-4 w-4" /> Jugar (-$5,000 COP)
          </Button>
        </div>

        {/* Reveal All Button */}
        <div className="text-center mt-4">
          <Button
            onClick={revealAllCells}
            className="bg-red-600 hover:bg-red-700 text-white font-bold gap-2"
            disabled={gameOver}
          >
            <EyeIcon className="text-sm"/>
            <p>Revelar todo</p>
          </Button>
        </div>
      </div>
    </div>
  )
}
