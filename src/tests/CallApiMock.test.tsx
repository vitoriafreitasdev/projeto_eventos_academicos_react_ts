
import { type ReactNode } from "react"
import { Provider } from "react-redux"
import { describe, expect, it, vi } from "vitest"
import { render, screen, waitFor} from "@testing-library/react"

import get_fetch from "../fetch_config/get_fetch"
import Home from "../Routes/Home"
import store from "../redux/store"

// Mock do fetch global
const mockEvents = [
    {
        id: 1,
        title: "Evento 1",
        description: "Descrição 1",
        date: "2024-01-01",
        user_Id: 1
    },
    {
        id: 2,
        title: "Evento 2",
        description: "Descrição 2",
        date: "2024-01-02",
        user_Id: 1
    }
]

// assim
//vi.mock('../fetch_config/get_fetch')

// ou assim
vi.mock('../fetch_config/get_fetch', () => ({
  default: vi.fn()
}))

const wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>
    {children}
  </Provider>
)


describe("Testing the mock API calls ", () => {
    
    
    it("Test the if Events are being display in Home with mock get_fetch", async () => {
      //get_fetch.mockResolvedValue(mockEvents)
      vi.mocked(get_fetch).mockResolvedValue(mockEvents)
      render(<Home/>, { wrapper })

      await waitFor(() => {
        const events = screen.findAllByRole('div-event')
        return events
      }).then((data) => expect(data.length).toBeGreaterThan(0))
        
    })
})