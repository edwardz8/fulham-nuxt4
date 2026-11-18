import { describe, it, expect } from 'vitest'
import { add, subtract } from '../../app/utils/calculator'

describe('calculator', () => {
  describe('add', () => {
    it('adds two positive numbers', () => {
      expect(add(2, 3)).toBe(5)
    })

    it('adds negative numbers', () => {
      expect(add(-1, -4)).toBe(-5)
    })

    it('adds zero', () => {
      expect(add(10, 0)).toBe(10)
    })
  })

    describe('subtract', () => {
    it('subtracts two positive numbers', () => {
      expect(subtract(10, 4)).toBe(6)
    })

    it('handles negative results', () => {
      expect(subtract(3, 8)).toBe(-5)
    })

    it('subtracts zero', () => {
      expect(subtract(7, 0)).toBe(7)
    })
  })
})