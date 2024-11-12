import React from 'react';
import { Card as CardType } from '../types';
import { Heart, Sparkles, Star, Moon } from 'lucide-react';

interface CardProps {
  card: CardType;
  onCardClick: (card: CardType) => void;
}

const CardBack = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-2 md:p-4 shadow-lg">
      <div className="w-full h-full border-2 border-white/30 rounded-lg flex flex-col items-center justify-center gap-2">
        <div className="grid grid-cols-2 gap-2">
          <Heart className="w-3 h-3 md:w-4 md:h-4 text-white/80" />
          <Star className="w-3 h-3 md:w-4 md:h-4 text-white/80" />
          <Moon className="w-3 h-3 md:w-4 md:h-4 text-white/80" />
          <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-white/80" />
        </div>
        <div className="text-white/90 text-[10px] md:text-xs font-medium mt-1 md:mt-2">Memory</div>
      </div>
    </div>
  );
};

export function Card({ card, onCardClick }: CardProps) {
  return (
    <div className="perspective-1000">
      <div
        onClick={() => !card.isMatched && !card.isFlipped && onCardClick(card)}
        className={`relative w-16 h-24 md:w-24 md:h-32 cursor-pointer transition-transform duration-500 transform-gpu preserve-3d hover:scale-105 ${
          card.isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        <div className="absolute w-full h-full backface-hidden">
          <CardBack />
        </div>
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className={`relative w-full h-full rounded-xl overflow-hidden shadow-lg ${
            card.isMatched ? 'ring-4 ring-green-400' : ''
          }`}>
            <img
              src={card.imageUrl}
              alt={card.name}
              className={`w-full h-full object-cover transition-opacity ${
                card.isMatched ? 'opacity-75' : ''
              }`}
            />
            {card.isMatched && (
              <div className="absolute inset-0 bg-green-400/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}