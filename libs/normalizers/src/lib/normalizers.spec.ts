import { yyyyMMddhhmmss } from './normalizers'

const acceptableCases: [string, number][] = [
  ['20200317171243', 1584479563000],
]
const unAcceptableCases: [string, number][] = [
  ['20200317T171243', 1584479563000]
]

describe('normalizers', () => {
  it('yyyyMMddhhmmss', () => {
    for (const [ input, expectation ] of acceptableCases) {
      const subject = yyyyMMddhhmmss(input)
      expect(subject).toEqual(expectation)
    }

    for (const [ input, expectation ] of unAcceptableCases) {
      expect(yyyyMMddhhmmss(input)).not.toBe(expectation)
    }

  })
})
