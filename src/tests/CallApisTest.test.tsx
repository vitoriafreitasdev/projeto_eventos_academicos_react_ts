

import { type ReactNode } from "react"
import { Provider } from "react-redux"
import { describe, expect, it } from "vitest"
import { render, screen, waitFor} from "@testing-library/react"

import Home from "../Routes/Home"
import store from "../redux/store"

// 1. Uma importação? → use vi.mock()
// 2. Uma API global (fetch, json, localStorage)? → use global.fetch = vi.fn()
// 3. Uma função específica? → use vi.spyOn()

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



const wrapper = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>
    {children}
  </Provider>
)


describe("Testing the API calls", () => {
    
    it("Test the if Events are being display in Home with mock data", async () => {
        
      // Mock do fetch global
      global.fetch = vi.fn().mockResolvedValue({
          json: async () => mockEvents,
          ok: true
      })  

      render(<Home/>, { wrapper })

      
      const eventElements = await screen.findAllByRole('div-event')
      
      expect(eventElements.length).toBeGreaterThan(0)
        
    })
    
    it("Test the if Events are being display in Home with API call", async () => {
        
      render(<Home/>, { wrapper })

      await waitFor(() => {
        const events = screen.findAllByRole('div-event')
        return events
      }).then((data) => expect(data.length).toBeGreaterThan(0))
        
    })

   
})