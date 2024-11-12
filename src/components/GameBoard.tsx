import React, { useState, useEffect } from 'react';
import { Card as CardType } from '../types';
import { Card } from './Card';
import { Trophy, RefreshCw, Heart, Star } from 'lucide-react';

const initialCards: CardType[] = [
  { id: 1, name: 'White Rabbit', imageUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308', isFlipped: false, isMatched: false },
  { id: 2, name: 'White Rabbit', imageUrl: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308', isFlipped: false, isMatched: false },
  { id: 3, name: 'White Cat', imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba', isFlipped: false, isMatched: false },
  { id: 4, name: 'White Cat', imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba', isFlipped: false, isMatched: false },
  { id: 5, name: 'Black Cat', imageUrl: 'https://images.unsplash.com/photo-1548546738-8509cb246ed3', isFlipped: false, isMatched: false },
  { id: 6, name: 'Black Cat', imageUrl: 'https://images.unsplash.com/photo-1548546738-8509cb246ed3', isFlipped: false, isMatched: false },
  { id: 7, name: 'Horse', imageUrl: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a', isFlipped: false, isMatched: false },
  { id: 8, name: 'Horse', imageUrl: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a', isFlipped: false, isMatched: false },
  { id: 9, name: 'Fox', imageUrl: 'https://images.unsplash.com/photo-1516934024742-b461fba47600', isFlipped: false, isMatched: false },
  { id: 10, name: 'Fox', imageUrl: 'https://images.unsplash.com/photo-1516934024742-b461fba47600', isFlipped: false, isMatched: false },
  { id: 11, name: 'Deer', imageUrl: 'https://images.unsplash.com/photo-1484406566174-9da000fda645', isFlipped: false, isMatched: false },
  { id: 12, name: 'Deer', imageUrl: 'https://images.unsplash.com/photo-1484406566174-9da000fda645', isFlipped: false, isMatched: false },
  { id: 13, name: 'Unicorn', imageUrl: 'https://images.unsplash.com/photo-1525278070609-779c7adb7b71', isFlipped: false, isMatched: false },
  { id: 14, name: 'Unicorn', imageUrl: 'https://images.unsplash.com/photo-1525278070609-779c7adb7b71', isFlipped: false, isMatched: false },
  { id: 15, name: 'Panda', imageUrl: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7', isFlipped: false, isMatched: false },
  { id: 16, name: 'Panda', imageUrl: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7', isFlipped: false, isMatched: false },
  { id: 17, name: 'Puppy', imageUrl: 'https://images.unsplash.com/photo-1591160690555-5debfba289f0', isFlipped: false, isMatched: false },
  { id: 18, name: 'Puppy', imageUrl: 'https://images.unsplash.com/photo-1591160690555-5debfba289f0', isFlipped: false, isMatched: false },
  { id: 19, name: 'Kitten', imageUrl: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91', isFlipped: false, isMatched: false },
  { id: 20, name: 'Kitten', imageUrl: 'https://images.unsplash.com/photo-1595433707802-6b2626ef1c91', isFlipped: false, isMatched: false },
].sort(() => Math.random() - 0.5);

export function GameBoard() {
  const [cards, setCards] = useState<CardType[]>(initialCards);
  const [flippedCards, setFlippedCards] = useState<CardType[]>([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (flippedCards.length === 2 && !isChecking) {
      setIsChecking(true);
      const [first, second] = flippedCards;
      
      if (first.name === second.name) {
        setScore(prevScore => prevScore + 1);
        setCards(prevCards => 
          prevCards.map(card =>
            card.id === first.id || card.id === second.id
              ? { ...card, isMatched: true }
              : card
          )
        );
      }

      setTimeout(() => {
        setCards(prevCards =>
          prevCards.map(card =>
            flippedCards.find(f => f.id === card.id)
              ? { ...card, isFlipped: false }
              : card
          )
        );
        setFlippedCards([]);
        setIsChecking(false);
      }, 1000);
    }
  }, [flippedCards, isChecking]);

  useEffect(() => {
    const allMatched = cards.every(card => card.isMatched);
    if (allMatched && score > 0) {
      setIsWon(true);
    }
  }, [cards, score]);

  const handleCardClick = (clickedCard: CardType) => {
    if (
      !isChecking && 
      flippedCards.length < 2 && 
      !clickedCard.isFlipped && 
      !clickedCard.isMatched &&
      !flippedCards.find(card => card.id === clickedCard.id)
    ) {
      setMoves(prevMoves => prevMoves + 1);
      setCards(prevCards =>
        prevCards.map(card =>
          card.id === clickedCard.id
            ? { ...card, isFlipped: true }
            : card
        )
      );
      setFlippedCards(prevFlipped => [...prevFlipped, clickedCard]);
    }
  };

  const resetGame = () => {
    setCards(initialCards.sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setMoves(0);
    setScore(0);
    setIsWon(false);
    setIsChecking(false);
  };

  const startNewGame = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center gap-8 p-4 md:p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-purple-600 mb-4 flex items-center justify-center gap-3">
          Memory per Vera
          <Heart className="w-8 h-8 text-pink-500" />
        </h1>
        <div className="flex items-center justify-center gap-6 mb-2">
          <p className="text-gray-600 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Punteggio: {score}
          </p>
          <p className="text-gray-600">Mosse: {moves}</p>
          <button
            onClick={startNewGame}
            className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Nuova Partita
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 md:grid-cols-5 gap-2 md:gap-4 max-w-4xl mx-auto">
        {cards.map(card => (
          <Card key={card.id} card={card} onCardClick={handleCardClick} />
        ))}
      </div>

      {isWon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-8 rounded-xl text-center shadow-2xl">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Congratulazioni!</h2>
            <p className="text-gray-600 mb-4">
              Hai vinto con {score} punti in {moves} mosse!
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={resetGame}
                className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
              >
                Gioca Ancora
              </button>
              <button
                onClick={startNewGame}
                className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Nuova Partita
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}