import test, { describe, it } from "node:test";
import {render} from '@testing-library/react'
import Navbar from '../Navbar'

describe("Navbar", () => {
  test("should render correctly", () => {
    render(<Navbar />)
  })
})