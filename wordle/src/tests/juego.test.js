import { expect, test } from 'vitest'
import  {estadoDe}  from './juego.js'

test('letra en su sitio', () => {
  expect(estadoDe('P', 0, 'PERRO')).toBe('correcta')
})

test('letra en otra posición', () => {
  expect(estadoDe('O', 0, 'PERRO')).toBe('presente')
})

test('letra inexistente',()=>{
    expect(estadoDe('ARROZ', 0,'PERRO')).toBe('ausente')
})